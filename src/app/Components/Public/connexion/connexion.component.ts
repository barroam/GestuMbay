import { Component } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  connexionForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.connexionForm.invalid) {
      return;
    }

    this.authService.login(this.connexionForm.value).subscribe({
      next: (response) => {
        // Enregistrez le token dans le localStorage
        this.authService.setToken(response.token); // Assurez-vous que votre API renvoie le token sous la clé 'token'
        console.log('Connexion réussie', response);
      },
      error: (error) => {
        this.errorMessage = error.error.message ? error.error.message : 'Erreur lors de la connexion';
        console.error('Erreur de connexion', this.errorMessage);
      }
    });
  }
}

