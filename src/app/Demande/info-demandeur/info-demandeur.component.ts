import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InfoDemandesService } from '../../Services/Info-demandes/info-demandes.service';
import { Router } from '@angular/router';
import { InfoDemande } from '../../Models/info-demande';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-info-demandeur',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './info-demandeur.component.html',
  styleUrl: './info-demandeur.component.css'
})

export class InfoDemandeurComponent implements OnInit {
  infoDemandeForm: FormGroup;
  demandeId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private demandeService: InfoDemandesService, 
    private router: Router
  ) {
    this.infoDemandeForm = this.fb.group({
      demandeur: ['', Validators.required],
      nom_demandeur: ['', [Validators.required, Validators.maxLength(255)]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      cin_ninea: ['', [Validators.required, Validators.pattern(/^\d{12}$|^\d{14}-D\d{3}$/)]],
      contact: ['', [Validators.required, Validators.pattern(/^7[0-9]{8}$/)]]
    });
  }

  ngOnInit(): void {
    // Utilisation de sessionStorage pour récupérer l'ID de la demande
    this.demandeId = sessionStorage.getItem('demandeId');
    if (this.demandeId) {
      this.demandeService.getInfoDemandeById(Number(this.demandeId)).subscribe(
        (infoDemande: InfoDemande) => {
          if (infoDemande) {
            this.infoDemandeForm.patchValue(infoDemande);
          } else {
            console.error('Aucune donnée disponible pour cette demande.');
          }
        },
        error => {
          console.error('Erreur lors de la récupération des informations de la demande:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.infoDemandeForm.valid) {
      const infoDemande: InfoDemande = this.infoDemandeForm.value;
      console.log('Données soumises :', infoDemande);
  
      if (this.demandeId) {
        // Mettre à jour la demande existante
        this.demandeService.updateInfoDemande(Number(this.demandeId), infoDemande).subscribe(
          (response: InfoDemande) => {
            console.log('Demande mise à jour avec succès:', response);
            this.router.navigate(['/demande-controle-eligibilite']);
          },
          error => {
            console.error('Erreur lors de la mise à jour de la demande:', error);
          }
        ); 
      } else {
        // Création d'une nouvelle demande
        this.demandeService.createInfoDemande(infoDemande).subscribe(
          (response: InfoDemande) => {
            console.log('Demande ajoutée avec succès:', response);
            if (response && response.id) {
              // Stocker l'ID de la demande dans sessionStorage
              sessionStorage.setItem('demandeId', response.id.toString());
              
              this.router.navigate(['/demande-controle-eligibilite']);
            } else {
              console.error('L\'ID de la demande n\'est pas défini dans la réponse.', response);
            }
          },
          error => {
            console.error('Erreur lors de l\'ajout de la demande:', error);
          }
        );
      }
    } else {
      console.error('Formulaire invalide:', this.infoDemandeForm.errors);
    }
  }}