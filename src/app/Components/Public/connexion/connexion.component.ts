import { Component } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../../Models/role';
import { Users } from '../../../Models/users';

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
  roles: Role[] = []; // Déclaration du tableau pour stocker les rôles
  user: Users | null = null; // Déclaration de l'utilisateur

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
        this.authService.setToken(response.token);
        this.user = response.user; // Assurez-vous que cela correspond bien au type Users
        localStorage.setItem('user', JSON.stringify(this.user));
  
        if (this.user) {
          this.roles = this.user.roles || []; // Récupérez les rôles et les stockez dans le tableau
          console.log('Utilisateur:', this.user);
          console.log('Rôles:', this.roles);
  
          // Redirection en fonction du rôle
          if (this.roles.length > 0) {
            const role: Role = this.roles[0]; // Supposez que l'utilisateur a au moins un rôle
            
            // Vérifiez le nom du rôle
            if (typeof role === 'string') {
              // Si le rôle est une chaîne de caractères
              switch (role) {
                case 'admin':
                  this.router.navigate(['/Dashbord-Admin-Accueil']);
                  break;
                case 'agriculteur':
                  this.router.navigate(['/Dashbord-Agriculteur-Accueil']);
                  break;
                default:
                  this.router.navigate(['/']); // Redirection par défaut
              }
            } else if (role.name) {
              // Si le rôle est un objet avec un nom
              switch (role.name) {
                case 'admin':
                  this.router.navigate(['/Dashbord-Admin-Accueil']);
                  break;
                case 'agriculteur':
                  this.router.navigate(['/accueil']);
                  break;
                default:
                  this.router.navigate(['/accueil']); // Redirection par défaut
              }
            }
          } else {
            this.router.navigate(['/accueil']); // Redirection par défaut
          }
        } else {
          console.error('Utilisateur non trouvé dans la réponse');
        }
  
        console.log('Connexion réussie', response);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de la connexion';
        console.error('Erreur de connexion', this.errorMessage);
      }
    });
  }
  
}

