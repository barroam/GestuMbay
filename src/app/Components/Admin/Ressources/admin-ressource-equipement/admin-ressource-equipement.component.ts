import { Component, OnInit } from '@angular/core';
import { Equipements } from '../../../../Models/equipements';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipementsService } from '../../../../Services/Equipements/equipements.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-ressource-equipement',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-ressource-equipement.component.html',
  styleUrl: './admin-ressource-equipement.component.css'
})
export class AdminRessourceEquipementComponent  implements OnInit {
  equipements: Equipements[] = [];
  equipementForm!: FormGroup;
  showPopup: boolean = false;
  editingEquipement: Equipements | null = null;

  constructor(private equipementService: EquipementsService, private fb: FormBuilder) {
    this.equipementForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.loadEquipements();
  }

  // Charger la liste des équipements
  loadEquipements() {
    this.equipementService.getEquipements().subscribe(
      (data) => {
        this.equipements = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des équipements:', error);
      }
    );
  }

  trackByFn(index: number, equipement: Equipements): number {
    return equipement.id; // Identifier chaque élément par son ID
  }

  // Ouvrir la popup pour ajouter ou éditer un équipement
  openPopup(equipement?: Equipements) {
    this.showPopup = true;
    if (equipement) {
      this.editingEquipement = equipement;
      this.equipementForm.patchValue(equipement);
    } else {
      this.editingEquipement = null;
      this.equipementForm.reset();
    }
  }

  // Fermer la popup
  closePopup() {
    this.showPopup = false;
    this.editingEquipement = null;
  }

  // Sauvegarder l'équipement (ajout ou modification)
  saveEquipement() {
    if (this.equipementForm.valid) {
      const equipementData: Equipements = { ...this.equipementForm.value, id: this.editingEquipement?.id || 0 };
      if (this.editingEquipement) {
        // Modifier l'équipement existant
        this.equipementService.updateEquipement(this.editingEquipement.id, equipementData).subscribe(
          () => {
            this.loadEquipements();
            this.closePopup();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'équipement:', error);
          }
        );
      } else {
        // Ajouter un nouvel équipement
        this.equipementService.createEquipement(equipementData).subscribe(
          () => {
            this.loadEquipements();
            this.closePopup();
          },
          (error) => {
            console.error('Erreur lors de la création de l\'équipement:', error);
          }
        );
      }
    }
  }

  // Supprimer un équipement
  deleteEquipement(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      this.equipementService.deleteEquipement(id).subscribe(
        () => {
          this.loadEquipements();
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'équipement:', error);
        }
      );
    }
  }
}