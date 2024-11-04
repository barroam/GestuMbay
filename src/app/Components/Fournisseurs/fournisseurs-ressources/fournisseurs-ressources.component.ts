
import { Component, OnInit } from '@angular/core';
import { RessourcesService } from '../../../Services/Ressources/ressources.service';

import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../Services/Users/users.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../Services/Storage/storage.service';
import { DemandesService } from '../../../Services/Demandes/demandes.service';
import { Demandes } from '../../../Models/demandes';
import { InfoDemande } from '../../../Models/info-demande';
import { ControleDemande } from '../../../Models/controle-demande';
import { Equipements } from '../../../Models/equipements';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-fournisseurs-ressources',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './fournisseurs-ressources.component.html',
  styleUrl: './fournisseurs-ressources.component.css'
})
export class FournisseursRessourcesComponent  implements OnInit {
  demande: Demandes | null = null;
  infoDemande: InfoDemande | null = null;
  controleDemande: ControleDemande | null = null;
  semences: any[] = [];
  engrais: any[] = [];
  equipements: Equipements[] = [];
  user: any = {}; // Utilisateur connecté
  today: Date = new Date();
  userId: number | undefined; // ID de l'utilisateur
  userName: string | undefined; // Nom de l'utilisateur
  errorMessage: string | null = null; // Message d'erreur
  idressource: number | null = null;
  loading= true;

  constructor(
    private route: ActivatedRoute,
    private demandesService: DemandesService,
    private ressourcesService: RessourcesService,
    private usersService: UsersService,
    private storageService: StorageService // Ajout du service de stockage
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData(): void {
    const userStr = this.storageService.getLocalItem('user');
    if (userStr) {
      try {
        const userData = userStr;
        if (userData && userData.id && typeof userData.id === 'number') {
          this.userId = userData.id;
          this.chargerDemandesParUtilisateur();
        } else {
          this.errorMessage = 'Données utilisateur non valides.';
          this.loading = false;
        }
      } catch (e) {
        this.errorMessage = 'Erreur de parsing des données utilisateur.';
        this.loading = false;
      }
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
      this.loading = false;
    }
  }

  chargerDemandesParUtilisateur(): void {
    if (!this.userId) {
      this.errorMessage = 'ID utilisateur non disponible';
      this.loading = false;
      return;
    }

    this.demandesService.getDemandesByUser(this.userId).subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          const demande = data[0];
          this.demande = demande;
          this.infoDemande = demande.info_demande;
          this.controleDemande = demande.controle_demande;
          this.user = demande.user || {};

          if (demande.ressource?.id) {
            this.chargerDetailsRessource(demande.ressource.id);
          }
        } else {
          this.errorMessage = 'Aucune demande trouvée.';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des demandes:', error);
        this.errorMessage = 'Erreur lors du chargement des données.';
        this.loading = false;
      }
    });
  }

  chargerDetailsRessource(ressourceId: number): void {
    this.ressourcesService.getRessourceById(ressourceId).subscribe({
      next: (data: any) => {
        if (data) {
          this.semences = data.semences?.map((s: any) => ({
            nom: s.nom,
            variete: s.pivot?.variete || '',
            quantite: s.pivot?.quantite || 0
          })) || [];

          this.engrais = data.engrais?.map((e: any) => ({
            nom: e.nom,
            variete: e.pivot?.variete || '',
            quantite: e.pivot?.quantite || 0
          })) || [];

          this.equipements = data.equipements || [];
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des ressources:', error);
        this.errorMessage = 'Erreur lors du chargement des ressources.';
      }
    });
  }

  downloadPDF(): void {
    const element = document.getElementById('demande-content');
    if (!element) {
      console.error('Élément non trouvé');
      return;
    }

    html2canvas(element, { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
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
    });
  }
}
