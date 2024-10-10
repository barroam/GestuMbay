import { Component, OnInit } from '@angular/core';
import { Projets } from '../../../../Models/projets';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjetsService } from '../../../../Services/Projets/projets.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Avis } from '../../../../Models/avis';
import { AvisService } from '../../../../Services/Avis/avis.service';

@Component({
  selector: 'app-admin-projet-show',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './admin-projet-show.component.html',
  styleUrl: './admin-projet-show.component.css'
})
export class AdminProjetShowComponent  implements OnInit {
  projet: Projets | null = null;
  avisList: Avis[] = [];
  currentAvis: Avis = { titre: '', description: '', user_id: 0, projet_id: 0 };
  editingAvis: boolean = false;
  errorMessage: string = '';
  userId: number | null = null;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetsService: ProjetsService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjet(+id);
      this.loadAvis(+id);
    }
    this.getUserData();
  }

  getUserData(): void {
    const user = localStorage.getItem('user');
    
    if (user) {
      const userData = JSON.parse(user);
      
      if (userData.id !== null && typeof userData.id === 'number') {
        this.userId = userData.id;
        this.userName = userData.name;
        this.currentAvis.user_id = this.userId!;  // user_id ne sera pas null
      } else {
        this.errorMessage = 'Données utilisateur non valides. Veuillez vous reconnecter.';
      }
    } else {
      this.errorMessage = 'Utilisateur non connecté. Veuillez vous connecter pour ajouter un avis.';
    }
  }
  

  loadProjet(id: number): void {
    this.projetsService.getProjetById(id).subscribe(
      (reponse: any) => {
        this.projet = reponse.data;
        this.currentAvis.projet_id = this.projet!.id!;
      },
      (error) => {
        console.error('Erreur lors du chargement du projet:', error);
        this.errorMessage = 'Erreur lors du chargement du projet.';
      }
    );
  }

  deleteProjet(): void {
    if (this.projet && confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetsService.deleteProjet(this.projet.id!).subscribe(
        () => {
          this.router.navigate(['/projets']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du projet:', error);
          this.errorMessage = 'Erreur lors de la suppression du projet.';
        }
      );
    }
  }

  loadAvis(projetId: number): void {
    this.avisService.getAvis().subscribe(
      (reponse: any) => {

        this.avisList = reponse.data.filter((avis:any) => avis.projet_id === projetId);
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
        this.loadAvis(this.projet!.id!);
        this.resetAvisForm();
      },
      error => {
        console.error('Erreur lors de la création de l\'avis:', error);
        this.errorMessage = 'Erreur lors de la création de l\'avis. Veuillez réessayer.';
      }
    );
  }

  updateAvis(): void {
    this.avisService.updateAvis(this.currentAvis.id!, this.currentAvis).subscribe(
      () => {
        this.loadAvis(this.projet!.id!);
        this.resetAvisForm();
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
        this.errorMessage = 'Erreur lors de la mise à jour de l\'avis.';
      }
    );
  }

  editAvis(avis: Avis): void {
    this.currentAvis = { ...avis };
    this.editingAvis = true;
  }

  deleteAvis(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      this.avisService.deleteAvis(id).subscribe(
        () => this.loadAvis(this.projet!.id!),
        error => {
          console.error('Erreur lors de la suppression de l\'avis:', error);
          this.errorMessage = 'Erreur lors de la suppression de l\'avis.';
        }
      );
    }
  }

  resetAvisForm(): void {
    this.currentAvis = { titre: '', description: '', user_id: this.userId!, projet_id: this.projet!.id! };
    this.editingAvis = false;
    this.errorMessage = '';
  }
}
