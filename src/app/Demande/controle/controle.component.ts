import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {
  eligibiliteForm: FormGroup;
  
  // Les types de cultures définis dans la base de données
  typesDeCulture: string[] = ['vivriere', 'rente', 'horticole', 'industrielle', 'perenne'];

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialisation du formulaire réactif
    this.eligibiliteForm = this.fb.group({
      numero_parcelle: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      hectare: ['', [Validators.required, Validators.min(0), Validators.max(9999.99)]],
      culture: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.eligibiliteForm.valid) {
      const eligibiliteData = {
        numero_parcelle: this.eligibiliteForm.value.numero_parcelle,
        hectare: this.eligibiliteForm.value.hectare,
        culture: this.eligibiliteForm.value.culture,
      };

      console.log('Données du formulaire d\'éligibilité:', eligibiliteData);

      // Si le formulaire est valide, vous pouvez soumettre les données à l'API
      // Par exemple :
      // this.someService.submitEligibilite(eligibiliteData).subscribe(response => {
      //   console.log('Réponse du serveur:', response);
      //   this.router.navigate(['/suivant']);
      // });
    } else {
      console.error('Le formulaire contient des erreurs.');
    }
  }
}
