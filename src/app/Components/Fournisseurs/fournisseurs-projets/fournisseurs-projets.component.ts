import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PartageServicesService } from '../../../Services/partageServices/partage-services.service';
import { ProjetsService } from '../../../Services/Projets/projets.service';
import { AvisService } from '../../../Services/Avis/avis.service';
import { Router } from 'express';

@Component({
  selector: 'app-fournisseurs-projets',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './fournisseurs-projets.component.html',
  styleUrl: './fournisseurs-projets.component.css'
})
export class FournisseursProjetsComponent implements OnInit {
  projetId: number | null = null;
  projet: any;
  avisList: any[] = [];
  currentAvis: any = { titre: '', description: '', user_id: null, projet_id: null };
  editingAvis: boolean = false;
  errorMessage: string = '';
  userId: number | null = null; // Assurez-vous d'initialiser cet ID utilisateur
  userName: string = '';

  constructor(
    private partageService: PartageServicesService,
    private projetsService: ProjetsService,
    private avisService: AvisService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Récupérer les données de l'utilisateur
    this.getUserData();
    
    // S'abonner pour recevoir les mises à jour de l'ID du projet
    this.partageService.projetId$.subscribe(id => {
      if (id !== null) {
        this.projetId = id;
        this.loadProjet(this.projetId);
        this.loadAvis(this.projetId);
      }
    });
  }

  getUserData(): void {
    const user = localStorage.getItem('user');
    
    if (user) {
      const userData = JSON.parse(user);
      
      if (userData.id && typeof userData.id === 'number') {
        this.userId = userData.id;
        this.userName = userData.name;
        this.currentAvis.user_id = this.userId;  // user_id ne sera pas null
      } else {
        this.errorMessage = 'Données utilisateur non valides. Veuillez vous reconnecter.';
      }
    } else {
      this.errorMessage = 'Utilisateur non connecté. Veuillez vous connecter pour ajouter un avis.';
    }
  }

  loadProjet(id: number): void {
    this.projetsService.getProjetById(id).subscribe(
      (response: any) => {
        this.projet = response.data;
        this.currentAvis.projet_id = this.projet.id; // Utilisation de `id` sans `!`
      },
      (error) => {
        console.error('Erreur lors du chargement du projet:', error);
        this.errorMessage = 'Erreur lors du chargement du projet.';
      }
    );
  }

  loadAvis(projetId: number): void {
    this.avisService.getAvis().subscribe(
      (response: any) => {
        this.avisList = response.data.filter((avis: any) => avis.projet_id === projetId);
      },
      error => {
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
        this.loadAvis(this.projet.id); // Utilisation de `id` sans `!`
        this.resetAvisForm();
      },
      error => {
        console.error('Erreur lors de la création de l\'avis:', error);
        this.errorMessage = 'Erreur lors de la création de l\'avis. Veuillez réessayer.';
      }
    );
  }

  updateAvis(): void {
    this.avisService.updateAvis(this.currentAvis.id, this.currentAvis).subscribe(
      () => {
        this.loadAvis(this.projet.id); // Utilisation de `id` sans `!`
        this.resetAvisForm();
      },
      error => {
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
        () => this.loadAvis(this.projet.id), // Utilisation de `id` sans `!`
        error => {
          console.error('Erreur lors de la suppression de l\'avis:', error);
          this.errorMessage = 'Erreur lors de la suppression de l\'avis.';
        }
      );
    }
  }

  resetAvisForm(): void {
    this.currentAvis = { titre: '', description: '', user_id: this.userId, projet_id: this.projet.id }; // Utilisation de `id` sans `!`
    this.editingAvis = false;
    this.errorMessage = '';
  }
}
