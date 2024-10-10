import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjetsService } from '../../../../Services/Projets/projets.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Projets } from '../../../../Models/projets';

@Component({
  selector: 'app-admin-projet-add-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './admin-projet-add-update.component.html',
  styleUrl: './admin-projet-add-update.component.css'
})
export class AdminProjetAddUpdateComponent implements OnInit {
  projetForm: FormGroup;
  isEditMode = false;
  projetId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projetsService: ProjetsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projetForm = this.fb.group({
      type_activite: ['', Validators.required],
      etat: ['en_cours', Validators.required],
      date: ['', Validators.required],
      attentes: ['', Validators.required],
      obstacles: ['', Validators.required],
      solutions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.projetId = +params['id'];
        this.loadProjetDetails(this.projetId); // Chargement des données du projet existant
      }
    });
  }

  loadProjetDetails(id: number): void {
    this.projetsService.getProjetById(id).subscribe(
      (response: any) => {
        const projet = response.data; // Accès aux données dans response.data
        this.projetForm.patchValue(projet);
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du projet:', error);
      }
    );
  }


  onSubmit(): void {
    if (this.projetForm.valid) {
      const projetData: Projets = this.projetForm.value;

      if (this.isEditMode && this.projetId) {
        // Mode de modification
        this.projetsService.updateProjet(this.projetId, projetData).subscribe(
          () => {
            this.router.navigate(['/Dashbord-Admin-Projets/liste']);  // Redirection après modification
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du projet:', error);
          }
        );
      } else {
        // Mode d'ajout
        this.projetsService.createProjet(projetData).subscribe(
          () => {
            this.router.navigate(['/Dashbord-Admin-Projets/liste']);  // Redirection après ajout
          },
          (error) => {
            console.error('Erreur lors de la création du projet:', error);
          }
        );
      }
    }
  }
}