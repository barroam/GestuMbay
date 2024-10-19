import { Component, OnInit } from '@angular/core';
import { PartageServicesService } from '../../../Services/partageServices/partage-services.service';
import { ProjetsService } from '../../../Services/Projets/projets.service';
import { AvisService } from '../../../Services/Avis/avis.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../Services/Storage/storage.service';
import { UsersService } from '../../../Services/Users/users.service';

@Component({
  selector: 'app-agriculteurs-projets',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './agriculteurs-projets.component.html',
  styleUrl: './agriculteurs-projets.component.css'
})
export class AgriculteursProjetsComponent implements OnInit {
  projetId: number | null = null;
  projet: any;
  avisList: any[] = [];
  currentAvis: any = { titre: '', description: '', user_id: null, projet_id: null };
  editingAvis: boolean = false;
  errorMessage: string = '';
  userId: number | null = null;
  userName: string = '';
  contrat: any; // Variable pour stocker le contrat
  user: any; // Stocker les informations utilisateur
 
  constructor(
    private projetsService: ProjetsService,
    private avisService: AvisService,
    private router: Router,
    private storageService: StorageService,
    private userService: UsersService // Injection du service utilisateur
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const user = this.storageService.getLocalItem('user');
    if (user) {
      const userData = user;
      if (userData.id && typeof userData.id === 'number') {
        this.userId = userData.id;
        this.userName = userData.name;
        this.currentAvis.user_id = this.userId;

        // Récupérer les contrats de l'utilisateur
        this.loadContrats(this.userId); // Passer userId ici
      } else {
        this.errorMessage = 'Données utilisateur non valides. Veuillez vous reconnecter.';
      }
    } else {
      this.errorMessage = 'Utilisateur non connecté. Veuillez vous connecter pour ajouter un avis.';
    }
  }

  loadContrats(userId: number | null): void {
    if (userId !== null) {
      this.userService.getContrat(userId).subscribe({
        next: (response) => {
          if (response && Array.isArray(response.contrats)) {
            const contrats = response.contrats;
            if (contrats.length > 0) {
              // Récupérer le dernier contrat
              this.contrat = contrats[contrats.length - 1];
              this.projetId = this.contrat.projet_id;

              // Assurez-vous que projetId est un nombre avant de l'utiliser
              if (this.projetId !== null) {
                this.loadProjet(this.projetId);
              } else {
                console.error('projetId est nul. Impossible de charger le projet.');
              }
            }
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des contrats:', error);
        },
      });
    } else {
      console.error('User ID est nul. Impossible de charger les contrats.');
    }
  }

  loadProjet(id: number): void {
    if (id !== null) {
      this.projetsService.getProjetById(id).subscribe(
        (response: any) => {
          this.projet = response.data;
          this.currentAvis.projet_id = this.projet.id;
          this.loadAvis(this.projet.id); // Appeler loadAvis après avoir chargé le projet
        },
        (error) => {
          console.error('Erreur lors du chargement du projet:', error);
          this.errorMessage = 'Erreur lors du chargement du projet.';
        }
      );
    } else {
      console.error('ID du projet est nul. Impossible de charger le projet.');
    }
  }

  loadAvis(projetId: number): void {
    this.avisService.getAvis().subscribe(
      (response: any) => {
        this.avisList = response.data.filter((avis: any) => avis.projet_id === projetId);
      },
      (error) => {
        console.error('Erreur lors du chargement des avis:', error);
        this.errorMessage = 'Erreur lors du chargement des avis.';
      }
    );
  }

  onSubmitAvis(): void {
    if (!this.userId) {
      this.errorMessage = 'Vous devez être connecté pour ajouter un avis.';
      return;
    }
    if (this.editingAvis) {
      this.updateAvis();
    } else {
      this.createAvis();
    }
  }

  createAvis(): void {
    this.avisService.createAvis(this.currentAvis).subscribe(
      () => {
        this.loadAvis(this.projet.id);
        this.resetAvisForm();
      },
      (error) => {
        console.error('Erreur lors de la création de l\'avis:', error);
        this.errorMessage = 'Erreur lors de la création de l\'avis. Veuillez réessayer.';
      }
    );
  }

  updateAvis(): void {
    this.avisService.updateAvis(this.currentAvis.id, this.currentAvis).subscribe(
      () => {
        this.loadAvis(this.projet.id);
        this.resetAvisForm();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
        this.errorMessage = 'Erreur lors de la mise à jour de l\'avis.';
      }
    );
  }

  editAvis(avis: any): void {
    this.currentAvis = { ...avis };
    this.editingAvis = true;
  }

  deleteAvis(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      this.avisService.deleteAvis(id).subscribe(
        () => this.loadAvis(this.projet.id),
        (error) => {
          console.error('Erreur lors de la suppression de l\'avis:', error);
          this.errorMessage = 'Erreur lors de la suppression de l\'avis.';
        }
      );
    }
  }

  resetAvisForm(): void {
    this.currentAvis = { titre: '', description: '', user_id: null, projet_id: null };
    this.editingAvis = false;
  }
}