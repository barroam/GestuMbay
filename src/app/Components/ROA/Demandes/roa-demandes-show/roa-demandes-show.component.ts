import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { Demandes } from '../../../../Models/demandes';
import { InfoDemande } from '../../../../Models/info-demande';
import { ControleDemande } from '../../../../Models/controle-demande';
import { Equipements } from '../../../../Models/equipements';
import { ActivatedRoute } from '@angular/router';
import { DemandesService } from '../../../../Services/Demandes/demandes.service';
import { RessourcesService } from '../../../../Services/Ressources/ressources.service';


@Component({
  selector: 'app-roa-demandes-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roa-demandes-show.component.html',
  styleUrl: './roa-demandes-show.component.css'
})
export class ROADemandesShowComponent implements OnInit {
  demande: Demandes | null = null;
  infoDemande: InfoDemande | null = null;
  controleDemande: ControleDemande | null = null;
  semences: any[] = [];
  engrais: any[] = [];
  equipements: Equipements[] = [];
  user: any = {}; // Ajout de l'utilisateur
  today: Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private demandesService: DemandesService,
    private ressourcesService: RessourcesService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chargerDetailsDemande(+id);
    }
  }

  chargerDetailsDemande(id: number) {
    this.demandesService.getDemande(id).subscribe(
      (data: any) => {
        this.demande = data;
        this.infoDemande = data.info_demande;
        this.controleDemande = data.controle_demande;
        this.user = data.user; // Charger les détails de l'utilisateur

        if (data.ressource && data.ressource.id) {
          this.chargerDetailsRessource(data.ressource.id);
        }
        
        console.log('Demande:', this.demande);
        console.log('Info Demande:', this.infoDemande);
        console.log('Contrôle Demande:', this.controleDemande);
        console.log('Utilisateur:', this.user); // Afficher les détails de l'utilisateur
      },
      error => {
        console.error('Erreur lors du chargement des détails de la demande:', error);
      }
    );
  }

  chargerDetailsRessource(ressourceId: number) {
    this.ressourcesService.getRessourceById(ressourceId).subscribe(
      (data: any) => {
        this.semences = data.semences?.map((s: any) => ({
          ...s,
          variete: s.pivot.variete,
          quantite: s.pivot.quantite
        })) || [];

        this.engrais = data.engrais?.map((e: any) => ({
          ...e,
          variete: e.pivot.variete,
          quantite: e.pivot.quantite
        })) || [];

        this.equipements = data.equipements || [];
        
        console.log('Semences:', this.semences);
        console.log('Engrais:', this.engrais);
        console.log('Equipements:', this.equipements);
      },
      error => {
        console.error('Erreur lors du chargement des détails de la ressource:', error);
      }
    );
  }

  downloadPDF() {
    const element = document.getElementById('demande-content');

    if (!element) {
      console.error('Élément non trouvé');
      return;
    }

    const waitForImages = (): Promise<void> => {
      return new Promise<void>((resolve) => {
        const images = Array.from(element.getElementsByTagName('img')); // Convertir en tableau
        let loadedImagesCount = 0;

        if (images.length === 0) {
          resolve(); // Pas d'images à attendre
        }

        images.forEach((img) => {
          if (img.complete) {
            loadedImagesCount++;
          } else {
            img.onload = () => {
              loadedImagesCount++;
              if (loadedImagesCount === images.length) {
                resolve();
              }
            };
            img.onerror = () => {
              console.error('Erreur de chargement de l\'image:', img.src);
              loadedImagesCount++;
              if (loadedImagesCount === images.length) {
                resolve();
              }
            };
          }
        });

        // Si toutes les images étaient déjà chargées
        if (loadedImagesCount === images.length) {
          resolve();
        }
      });
    };

    waitForImages().then(() => {
      html2canvas(element, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Largeur A4 en mm
        const pageHeight = 297; // Hauteur A4 en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('demande_de_ressource.pdf');
      }).catch(error => {
        console.error('Erreur lors de la génération du PDF:', error);
      });
    }).catch(error => {
      console.error('Erreur lors de l\'attente des images:', error);
    });
  }

  confirmDemandeStatusUpdate(id: number | undefined, newStatus: 'en_attente' | 'approuvee' | 'refusee'): void {
    if (id === undefined) {
      console.error('ID de la demande non défini');
      return;
    }
  
    if (confirm(`Êtes-vous sûr de vouloir ${newStatus === 'approuvee' ? 'approuver' : 'refuser'} cette demande ?`)) {
      this.demandesService.updateDemandeStatus(id, newStatus).subscribe(
        response => {
          console.log('Statut mis à jour avec succès:', response);
          alert(`La demande a été ${newStatus === 'approuvee' ? 'approuvée' : 'refusée'} avec succès.`);
          
          // Vérifiez que this.demande n'est pas null avant de l'utiliser
          if (this.demande) {
            this.demande.statut = newStatus; // Mise à jour du statut local
          }
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          alert('Une erreur est survenue lors de la mise à jour du statut.');
        }
      );
    }
  }
  
  
}

