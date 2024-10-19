import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemandesService } from '../../Services/Demandes/demandes.service';
import { Demandes } from '../../Models/demandes';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../layout/header/header.component";
import { StorageService } from '../../Services/Storage/storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-finir-demande',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent,RouterLink],
  templateUrl: './finir-demande.component.html',
  styleUrl: './finir-demande.component.css'
})
export class FinirDemandeComponent implements OnInit {
  demandeForm: FormGroup;
  isProcessing: boolean = false;
  noIds: boolean = false;

  constructor(private fb: FormBuilder, private demandesService: DemandesService, private storageService: StorageService) { // Ajout du service de stockage
    // Initialisation du formulaire
    this.demandeForm = this.fb.group({
      titre: ['', Validators.required] // Champ requis pour le titre
    });
  }

  ngOnInit() {
    // Vérifiez si les IDs nécessaires sont présents dans le service de stockage

    const controleDemandeId = this.storageService.getSessionItem('controleId');
    const infoDemandeId = this.storageService.getSessionItem('demandeId');
    const ressourceDemandeId = this.storageService.getSessionItem('ressourceId');

    // Si l'une des valeurs est manquante, on affiche un message d'erreur
    if (!controleDemandeId || !infoDemandeId || !ressourceDemandeId) {
      this.noIds = true;
    }
  }

  onSubmit() {
    // Validation du formulaire avant la soumission
    if (this.demandeForm.valid && !this.noIds) {
      // Récupération des identifiants dans le service de stockage
      const controleDemandeId = this.storageService.getSessionItem('controleId');
      const infoDemandeId = this.storageService.getSessionItem('demandeId');
      const ressourceDemandeId = this.storageService.getSessionItem('ressourceId');

      // Récupération des informations utilisateur depuis le service de stockage
      const user = this.storageService.getLocalItem('user');
      if (user) {
        const userData = user;
        const userId = userData.id;

        // Vérifiez que toutes les valeurs sont présentes et correctes
        if (userId) {
          // Créer l'objet de demande avec le statut par défaut 'en_attente'
          const demande: Demandes = {
            controle_demande_id: Number(controleDemandeId),
            info_demande_id: Number(infoDemandeId),
            ressource_id: Number(ressourceDemandeId),
            user_id: Number(userId),
            titre: this.demandeForm.get('titre')?.value,
            statut: 'en_attente', // Valeur par défaut pour le statut
          };

          // Soumission de la demande via le service
          this.demandesService.createDemande(demande).subscribe(
            (response: Demandes) => {
              this.isProcessing = true; // Passage à l'état de traitement
              console.log('Réponse de l\'API:', response); // Afficher la réponse de l'API
             // Supprimer les identifiants du sessionStorage
             this.storageService.removeSessionItem('controleId');
             this.storageService.removeSessionItem('demandeId');
             this.storageService.removeSessionItem('ressourceId');
              // Simuler une semaine (604 800 000 ms)
              setTimeout(() => {
                this.isProcessing = false; // Fin de l'état de traitement après une semaine
                console.log('Traitement terminé après une semaine.');
              }, 604800000); // 1 semaine en millisecondes
            },
            (error) => {
              console.error('Erreur lors de la création de la demande:', error);
              // Gérer l'erreur ici
            }
          );
        } else {
          this.noIds = true;
        }
      } else {
        console.error("Utilisateur non trouvé dans le localStorage");
        this.noIds = true;
      }
    }
  }
}