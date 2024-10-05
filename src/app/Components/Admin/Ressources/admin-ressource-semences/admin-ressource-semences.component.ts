import { Component, OnInit } from '@angular/core';
import { Semences } from '../../../../Models/semences';
import { SemencesService } from '../../../../Services/Semences/semences.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-ressource-semences',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './admin-ressource-semences.component.html',
  styleUrl: './admin-ressource-semences.component.css'
})
export class AdminRessourceSemencesComponent implements OnInit {
  semences: Semences[] = [];
  semenceForm!: FormGroup;
  showPopup: boolean = false;
  editingSemence: Semences | null = null; // Pour stocker la semence en cours d'édition

  constructor(private semencesService: SemencesService, private fb: FormBuilder) {
    this.semenceForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]], // Validation d'URL simple
    });
  }

  ngOnInit(): void {
    this.loadSemences();
  }

  loadSemences() {
    this.semencesService.getSemences().subscribe(
      (data) => {
        console.log('Données récupérées:', data); // Log pour voir les données récupérées
        this.semences = data; // Assurez-vous que data est bien un tableau
        console.log('Longueur des semences:', this.semences.length); // Vérifier la longueur des données
      },
      (error) => {
        console.error('Erreur lors du chargement des semences:', error);
        alert('Erreur lors du chargement des semences. Vérifiez la console pour plus de détails.'); // Alerte utilisateur
      }
    );
  }
  

  openPopup(semence?: Semences) {
    this.showPopup = true;
    if (semence) {
      this.editingSemence = semence;
      this.semenceForm.patchValue(semence);
    } else {
      this.editingSemence = null;
      this.semenceForm.reset();
    }
  }

  closePopup() {
    this.showPopup = false;
    this.editingSemence = null;
  }

  saveSemence() {
    if (this.semenceForm.valid) {
      const semenceData: Semences = { ...this.semenceForm.value, id: this.editingSemence?.id || 0 };
      if (this.editingSemence) {
        // Mettre à jour une semence existante
        this.semencesService.updateSemence(this.editingSemence.id, semenceData).subscribe(
          () => {
            this.loadSemences();
            this.closePopup();
          },
          (error) => console.error('Erreur lors de la mise à jour de la semence:', error)
        );
      } else {
        // Ajouter une nouvelle semence
        this.semencesService.createSemence(semenceData).subscribe(
          () => {
            this.loadSemences();
            this.closePopup();
          },
          (error) => console.error('Erreur lors de la création de la semence:', error)
        );
      }
    }
  }

  // Méthode trackByFn
  trackByFn(index: number, semence: Semences): number {
    return semence.id; // Remplacez par l'identifiant unique de votre semence
  }

  deleteSemence(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette semence ?')) {
      this.semencesService.deleteSemence(id).subscribe(
        () => this.loadSemences(),
        (error) => console.error('Erreur lors de la suppression de la semence:', error)
      );
    }
  }
}