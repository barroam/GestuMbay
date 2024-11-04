import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../layout/header/header.component';
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../Services/Users/users.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent,RouterOutlet,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitting = false;
  showModal = false;
  showSuccessModal = false;  // Pour afficher la modale de succès
  showErrorModal = false;    // Pour afficher la modale d'erreur
  username = '';  // Variable pour stocker le nom de l'utilisateur

  constructor(
    private fb: FormBuilder,
    private profileService: UsersService,
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    // Récupérer les informations de l'utilisateur depuis AuthService
    this.profileService.getUserInfo().subscribe((userInfo) => {
      if (userInfo && userInfo.name) {
        this.username = userInfo.name;  // Stocker le nom dans username
        this.profileForm.patchValue({
          name: userInfo.name,
          email: userInfo.email
        });
      }
    });
  }

  get passwordMismatch() {
    const form = this.profileForm;
    return form.get('password')?.value !== form.get('password_confirmation')?.value;
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  showConfirmation() {
    if (this.profileForm.valid && !this.passwordMismatch) {
      this.showModal = true;
    }
  }

  hideModal() {
    this.showModal = false;
  }

  // Méthode pour fermer les modales de succès et d'erreur
  hideMessageModals() {
    this.showSuccessModal = false;
    this.showErrorModal = false;
  }

  onSubmit() {
    if (this.profileForm.valid && !this.passwordMismatch) {
      this.isSubmitting = true;
      this.showModal = false;

      this.profileService.updateProfile(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Profil mis à jour avec succès:', response);
          this.isSubmitting = false;
          this.showSuccessModal = true;  // Affiche la modale de succès
          // Réinitialiser les champs de mot de passe
          this.profileForm.patchValue({
            password: '',
            password_confirmation: ''
          });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.isSubmitting = false;
          this.showErrorModal = true;  // Affiche la modale d'erreur
        }
      });
    }
  }
}
