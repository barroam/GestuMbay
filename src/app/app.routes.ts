import { Routes } from '@angular/router';
import { AccueilComponent } from './Components/Public/accueil/accueil.component';
import { ConnexionComponent } from './Components/Public/connexion/connexion.component';
import { AuthPrincipalComponent } from './Components/Public/auth-principal/auth-principal.component';

export const routes: Routes = [

{path: 'accueil',component:AccueilComponent},

{path:'auth',component:AuthPrincipalComponent}
];
