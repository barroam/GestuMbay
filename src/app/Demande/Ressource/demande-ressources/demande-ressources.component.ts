import { Component, OnInit } from '@angular/core';

import { SemencesService } from '../../../Services/Semences/semences.service';
import { EngraisService } from '../../../Services/Engrais/engrais.service';
import { EquipementsService } from '../../../Services/Equipements/equipements.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RessourceComponent } from "../../../Components/Agriculteur/ressource/ressource.component";
import { Engrais } from '../../../Models/engrais';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  Resource,  } from '../../../Models/ressources';
import { RessourcesService } from '../../../Services/Ressources/ressources.service';

import { Equipements } from '../../../Models/equipements';
import { Semences } from '../../../Models/semences';

declare var bootstrap: any;

@Component({
  selector: 'app-demande-ressources',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './demande-ressources.component.html',
  styleUrl: './demande-ressources.component.css'
})
export class DemandeRessourcesComponent implements OnInit { 
semences: Semences[] = [];
  engrais: Engrais[] = [];
  equipements: Equipements[] = [];
  currentResource: string = '';
  resources: Resource = { semences: [], engrais: [], equipements: [] };
  selectedResource: any = null;
  variete: string = '';
  quantite: number = 0;

  demandeId: string | null = null;
  constructor(
    private semencesService: SemencesService,
    private engraisService: EngraisService,
    private equipementsService: EquipementsService,
    private ressourcesService: RessourcesService,

    private router :Router,

  ) {}
 
  
  ngOnInit() {
    this.chargerToutesLesRessources();
  }
 
  chargerToutesLesRessources() {
    this.semencesService.getSemences().subscribe(data => this.resources.semences = data);
    this.engraisService.getEngrais().subscribe(data => this.resources.engrais = data);
    this.equipementsService.getEquipements().subscribe(data => this.resources.equipements = data);
  }
 
  ouvrirModal(typeRessource: string) {
    this.currentResource = typeRessource;
    this.selectedResource = null;
    this.variete = '';
    this.quantite = 0;
    const modal = new bootstrap.Modal(document.getElementById('resourceModal'));
    modal.show();
  }

  ajouterRessource() {
  
  
    if (this.selectedResource ) {
      const nouvelleRessource = {
        ...this.selectedResource,
        variete: this.currentResource !== 'equipements' ? this.variete : null,
        quantite: this.currentResource !== 'equipements' ? this.quantite : null
      };
  
     /* if (!this.variete || this.variete.length > 2 ) {
        alert('La variété doit contenir 1 ou 2 lettres.');
        return;
      }
      if (this.quantite <= 0) {
        alert('La quantité doit être supérieure à 0.');
        return;
      } */

      switch (this.currentResource) {
        case 'semences':
          this.semences.push(nouvelleRessource);
          break;
        case 'engrais':
          this.engrais.push(nouvelleRessource);
          break;
        case 'equipements':
          this.equipements.push(nouvelleRessource);
          break;
      }
  
      this.fermerModal();
    }
  }
 
  supprimerRessource(type: string, index: number) {
    switch (type) {
      case 'semences':
        this.semences.splice(index, 1);
        break;
      case 'engrais':
        this.engrais.splice(index, 1);
        break;
      case 'equipements':
        this.equipements.splice(index, 1);
        break;
    }
  }
 
  fermerModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('resourceModal'));
    if (modal) {
      modal.hide();
    }
  }
 
  ouvrirModalConfirmation() {
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
  }

  envoyerDemande() {
    const demande = {
      semences: this.semences.map(s => ({ id: s.id, variete: s.variete, quantite: s.quantite })),
      engrais: this.engrais.map(e => ({ id: e.id, variete: e.variete, quantite: e.quantite })),
      equipements: this.equipements.map(eq => ({ id: eq.id }))
    };

    this.ressourcesService.createRessource(demande).subscribe(
      (response: any) => {
        console.log('Demande envoyée avec succès', response);
        this.demandeId = response.id;
        
        // Stocker la réponse complète dans le sessionStorage
        sessionStorage.setItem('ressourceId', JSON.stringify(response.data.id));
        
        this.semences = [];
        this.engrais = [];
        this.equipements = [];
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
        if (modal) {
          modal.hide();
        }
        // Vous pouvez ajouter une notification de succès ici si nécessaire
      },
      (error: any) => {
        console.error('Erreur lors de l\'envoi de la demande', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    );
  }

  peutEnvoyerDemande(): boolean {
    return this.semences.length > 0 && this.engrais.length > 0 && this.equipements.length > 0;
  }

  retourner() {
    this.router.navigate(['/demande-controle-eligibilite']); // Remplacer par la route réelle
  }
}