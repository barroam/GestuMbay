import { Component } from '@angular/core';
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
export class InfoDemandeurComponent {
  infoDemandeForm: FormGroup;
  constructor(private fb: FormBuilder, private demandeService: InfoDemandesService, private router: Router) {
    // Initialisation du formulaire réactif
    this.infoDemandeForm = this.fb.group({
      demandeur: ['', Validators.required],
      nom_demandeur: ['', [Validators.required, Validators.maxLength(255)]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      cin_ninea: ['', [
        Validators.required,
        Validators.pattern(/^\d{12}$|^\d{14}-D\d{3}$/)
      ]],
      contact: ['', [
        Validators.required,
        Validators.pattern(/^7[0-9]{8}$/)
      ]],
      status: ['indi'] // Statut par défaut
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.infoDemandeForm.valid) {
      const infoDemande = {
        demandeur: this.infoDemandeForm.value.demandeur,
        nom_demandeur: this.infoDemandeForm.value.nom_demandeur,
        adresse: this.infoDemandeForm.value.adresse,
        cin_ninea: this.infoDemandeForm.value.cin_ninea,
        contact: this.infoDemandeForm.value.contact,
        status: this.infoDemandeForm.value.status,
      };

      this.demandeService.createInfoDemande(infoDemande).subscribe(
        (response: InfoDemande) => { // Pas besoin de vérifier response.data
          console.log('Demande ajoutée avec succès:', response);
      
          // Vérifiez si l'id existe
          if (response && response.id) {
            // Stockez l'ID de la demande dans le localStorage
            localStorage.setItem('demandeId', response.id.toString());
      
            // Affichez les informations du demandeur dans la console
            console.log('Informations du demandeur:', {
              demandeur: infoDemande.demandeur,
              nom_demandeur: infoDemande.nom_demandeur,
              adresse: infoDemande.adresse,
              cin_ninea: infoDemande.cin_ninea,
              contact: infoDemande.contact,
              status: infoDemande.status,
            });
      
            // Redirection après ajout
            this.router.navigate(['/demande-controle-eligibilite']); // Assurez-vous que cette route existe
          } else {
            console.error('L\'ID de la demande n\'est pas disponible dans la réponse.', response);
          }
        },
        error => {
          console.error('Erreur lors de l\'ajout de la demande:', error);
        }
      );
    }}      
}