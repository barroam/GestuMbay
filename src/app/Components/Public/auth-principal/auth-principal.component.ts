import { Component } from '@angular/core';
import { InscriptionComponent } from "../inscription/inscription.component";
import { ConnexionComponent } from "../connexion/connexion.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../layout/header/header.component";
import { RouterLink } from '@angular/router';
import { link } from 'fs';

@Component({
  selector: 'app-auth-principal',
  standalone: true,
  imports: [InscriptionComponent, ConnexionComponent, CommonModule, HeaderComponent,RouterLink],
  templateUrl: './auth-principal.component.html',
  styleUrl: './auth-principal.component.css'
})
export class AuthPrincipalComponent {

  isLogin = true;
  isSignup = false;

  showLogin() {
    this.isLogin = true;
    this.isSignup = false;
  }

  showSignup() {
    this.isLogin = false;
    this.isSignup = true;
  }
}
