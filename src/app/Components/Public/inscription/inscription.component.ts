import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  inscriptionForm: FormGroup;
  errorMessage: string | null = null;

  
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.inscriptionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      role: ['agriculteur', Validators.required] // Rôle fixé à 'agriculteur'
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('password_confirmation')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.inscriptionForm.invalid) {
      return;
    }

    this.authService.register(this.inscriptionForm.value).subscribe({
      next: (response) => {
        // Traitement après une inscription réussie
        console.log('Inscription réussie', response);
      },
      error: (error) => {
        this.errorMessage = error.error.errors ? error.error.errors : 'Erreur lors de l\'inscription';
        console.error('Erreur d\'inscription', this.errorMessage);
      }
    });
  }

  }




