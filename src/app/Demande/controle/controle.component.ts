import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ControleDemande } from '../../Models/controle-demande';
import { ControleDemandesService } from '../../Services/Controle-demandes/controle-demandes.service';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent implements OnInit {
  eligibiliteForm: FormGroup;
  controleId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controleService: ControleDemandesService,
   
  ) {
    // Initialisation du formulaire
    this.eligibiliteForm = this.fb.group({
      numero_parcelle: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      hectare: ['', [Validators.required, Validators.min(0), Validators.max(9999.99)]],
      culture: ['', [Validators.required]]
    });
  }

  typesDeCulture: Array<'vivriere' | 'rente' | 'horticole' | 'industrielle' | 'perenne'> = [
    'vivriere', 'rente', 'horticole', 'industrielle', 'perenne'
  ];

  ngOnInit(): void {
    // Récupérer l'ID de la demande stockée dans localStorage
    const controleIdStr = sessionStorage.getItem('controleId');
    const controleId = Number(controleIdStr);

    if (controleId !== null && !isNaN(Number(controleId))) {
      this.controleId = Number(controleIdStr);
      this.loadControleDemande(this.controleId); // Charger les données si l'ID est valide
    } else {
      this.controleId = null;
      console.error('Aucun ID valide récupéré.');
    }
  }

  loadControleDemande(id: number) {
    console.log('Chargement de la demande avec ID :', id);
  
    this.controleService.getControleDemandeById(id).subscribe(
      (controleDemande: ControleDemande | undefined) => {
        console.log('Données récupérées après le mapping:', controleDemande); // Loguer la donnée après le mapping

        if (controleDemande) {
          // Mise à jour du formulaire avec les données récupérées
          this.eligibiliteForm.patchValue({
            numero_parcelle: controleDemande.numero_parcelle,
            hectare: parseFloat(controleDemande.hectare),  // Conversion si nécessaire
            culture: controleDemande.culture
          });
        } else {
          console.error('Aucune donnée trouvée après le mapping.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la demande de contrôle :', error);
      }
    );
  }

  // Méthode de soumission du formulaire
  onSubmit() {
    if (this.eligibiliteForm.valid) {
      const eligibiliteData: ControleDemande = this.eligibiliteForm.value;

      if (this.controleId) {
        // Si un ID est présent, mettre à jour la demande existante
        this.controleService.updateControleDemande(this.controleId, eligibiliteData).subscribe(
          (response: ControleDemande) => {
            console.log('Demande mise à jour avec succès :', response);
            this.router.navigate(['/demande-ressource']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour :', error);
          }
        );
      } else {
        // Sinon, créer une nouvelle demande
        this.controleService.createControleDemande(eligibiliteData).subscribe(
          (response: any) => {
            if (response && response.data.id) {
              console.log('Nouvelle demande créée avec succès :', response);
              sessionStorage.setItem('controleId', response.data.id.toString()); // Stocker l'ID
              this.router.navigate(['/demande-ressource']);
            } else {
              console.error('Problème avec l\'ID de la demande dans la réponse :', response);
            }
          },
          (error) => {
            console.error('Erreur lors de la création de la demande :', error);
          }
        );
      }
    } else {
      console.error('Formulaire invalide :', this.eligibiliteForm.errors);
    }
  }

  goBack() {
    this.router.navigate(['/demande-info-demandeur']);
  }

}