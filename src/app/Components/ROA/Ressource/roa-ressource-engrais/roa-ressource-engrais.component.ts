import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Engrais } from '../../../../Models/engrais';
import { EngraisService } from '../../../../Services/Engrais/engrais.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roa-ressource-engrais',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './roa-ressource-engrais.component.html',
  styleUrl: './roa-ressource-engrais.component.css'
})
export class RoaRessourceEngraisComponent {
  engrais: Engrais[] = [];
  engraisForm!: FormGroup;
  showPopup: boolean = false;
  editingEngrais: Engrais | null = null; // Pour stocker l'engrais en cours d'édition

  constructor(private engraisService: EngraisService, private fb: FormBuilder) {
    this.engraisForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]], // Validation d'URL simple
    });
  }

  ngOnInit(): void {
    this.loadEngrais();
  }

  loadEngrais() {
    this.engraisService.getEngrais().subscribe(
      (data) => {
        console.log('Données récupérées:', data);
        this.engrais = data;
        console.log('Longueur des engrais:', this.engrais.length);
      },
      (error) => {
        console.error('Erreur lors du chargement des engrais:', error);
        alert('Erreur lors du chargement des engrais. Vérifiez la console pour plus de détails.');
      }
    );
  }

  openPopup(engrais?: Engrais) {
    this.showPopup = true;
    if (engrais) {
      this.editingEngrais = engrais;
      this.engraisForm.patchValue(engrais);
    } else {
      this.editingEngrais = null;
      this.engraisForm.reset();
    }
  }

  closePopup() {
    this.showPopup = false;
    this.editingEngrais = null;
  }

  saveEngrais() {
    if (this.engraisForm.valid) {
      const engraisData: Engrais = { ...this.engraisForm.value, id: this.editingEngrais?.id || 0 };
      if (this.editingEngrais) {
        this.engraisService.updateEngrais(this.editingEngrais.id, engraisData).subscribe(
          () => {
            this.loadEngrais();
            this.closePopup();
          },
          (error) => console.error('Erreur lors de la mise à jour de l\'engrais:', error)
        );
      } else {
        this.engraisService.createEngrais(engraisData).subscribe(
          () => {
            this.loadEngrais();
            this.closePopup();
          },
          (error) => console.error('Erreur lors de la création de l\'engrais:', error)
        );
      }
    }
  }

  trackByFn(index: number, engrais: Engrais): number {
    return engrais.id;
  }

  deleteEngrais(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet engrais ?')) {
      this.engraisService.deleteEngrais(id).subscribe(
        () => this.loadEngrais(),
        (error) => console.error('Erreur lors de la suppression de l\'engrais:', error)
      );
    }
  }
}