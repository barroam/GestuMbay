import { Component } from '@angular/core';
import { UsersService } from '../../../../Services/Users/users.service';
import { AuthService } from '../../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-inscription',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './admin-inscription.component.html',
  styleUrl: './admin-inscription.component.css'
})
export class AdminInscriptionComponent {
  inscriptionForm: FormGroup;
  errorMessage: string | null = null;
 
  
  roles = ['admin', 'agriculteur', 'fournisseur', 'ROA'];
  
  constructor(private fb: FormBuilder,
     private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inscriptionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      role: ['', [Validators.required, Validators.pattern('^(admin|agriculteur|fournisseur|ROA)$')]]
    }, { validators: this.passwordMatchValidator });
  }
  
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const passwordConfirmation = form.get('password_confirmation');

    if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
      passwordConfirmation.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      passwordConfirmation?.setErrors(null);
      return null;
    }
  }
  
  onSubmit() {
    if (this.inscriptionForm.invalid) {
      Object.values(this.inscriptionForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    const formData = this.inscriptionForm.value;
    
    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.inscriptionForm.reset();
        this.errorMessage = null;
        this.router.navigate(['/Dashbord-Admin-Utilisateurs/liste']); 
      },
      error: (error) => {
        if (error.error && error.error.errors) {
          this.errorMessage = Object.values(error.error.errors).flat().join(', ');
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
        }
        console.error('Erreur d\'inscription', error);
      }
    });
  }
}