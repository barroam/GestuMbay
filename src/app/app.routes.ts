import { Routes } from '@angular/router';
import { AccueilComponent } from './Components/Public/accueil/accueil.component';
import { AuthPrincipalComponent } from './Components/Public/auth-principal/auth-principal.component';
import { DashbordComponent } from './Components/Admin/dashbord/dashbord.component';
import { AdminUserListComponent } from './Components/Admin/Users/admin-user-list/admin-user-list.component';
import { AdminProjetListComponent } from './Components/Admin/Projets/admin-projet-list/admin-projet-list.component';
import { AdminContratListComponent } from './Components/Admin/Contrats/admin-contrat-list/admin-contrat-list.component';
import { AdminRessourceListComponent } from './Components/Admin/Ressources/admin-ressource-list/admin-ressource-list.component';
import { DashbordAdminComponent } from './layout/dashbord-admin/dashbord-admin.component';
import { InfoDemandeurComponent } from './Demande/info-demandeur/info-demandeur.component';
import { ControleComponent } from './Demande/controle/controle.component';
import { AdminRessourceSemencesComponent } from './Components/Admin/Ressources/admin-ressource-semences/admin-ressource-semences.component';
import path from 'path';
import { AdminRessourceEquipementComponent } from './Components/Admin/Ressources/admin-ressource-equipement/admin-ressource-equipement.component';
import { AdminRessourceEngraisComponent } from './Components/Admin/Ressources/admin-ressource-engrais/admin-ressource-engrais.component';

import { DemandeRessourcesComponent } from './Demande/Ressource/demande-ressources/demande-ressources.component';
import { FinirDemandeComponent } from './Demande/finir-demande/finir-demande.component';
import { AdminContratShowComponent } from './Components/Admin/Contrats/admin-contrat-show/admin-contrat-show.component';
import { AdminContratAddOrUpdateComponent } from './Components/Admin/Contrats/admin-contrat-add-or-update/admin-contrat-add-or-update.component';
import { AdminContratComponent } from './Components/Admin/Contrats/admin-contrat/admin-contrat.component';


export const routes: Routes = [

    //Les ROUTES PRINCIPALES
{path: '',component:AccueilComponent},
{path:'auth',component:AuthPrincipalComponent},
{path:'demande-info-demandeur',component:InfoDemandeurComponent},
{path:'demande-controle-eligibilite',component:ControleComponent},
{path:'demande-ressource',component:DemandeRessourcesComponent},
{path:'demande-titre',component:FinirDemandeComponent},


//LES ROUTES ADMIN
{
    path: '',
    component: DashbordAdminComponent,
    children: [
        {path: '', redirectTo: 'Dashbord-Admin-Accueil', pathMatch: 'full'},
        {path: 'Dashbord-Admin-Accueil', component: DashbordComponent},
        {path: 'Dashbord-Admin-Utilisateurs', component: AdminUserListComponent},
        {path: 'Dashbord-Admin-Projets', component: AdminProjetListComponent},
        {
            path: 'Dashbord-Admin-Contrats',
            component: AdminContratComponent,
            children: [
                {path: '', redirectTo: 'liste', pathMatch: 'full'},
                {path: 'liste', component: AdminContratListComponent},
                {path: 'show/:id', component: AdminContratShowComponent}, // Enlever l'espace
                {path: 'add-or-update', component: AdminContratAddOrUpdateComponent}, // Enlever l'espace
                {path: 'add-or-update/:id', component: AdminContratAddOrUpdateComponent}, // Enlever l'espace
            ]
        },
        {
            path: 'Dashbord-Admin-Ressources',
            component: AdminRessourceListComponent,
            children: [
                {path: '', redirectTo: 'Semences', pathMatch: 'full'},
                {path: 'Semences', component: AdminRessourceSemencesComponent},
                {path: 'Equipement', component: AdminRessourceEquipementComponent},
                {path: 'Engrais', component: AdminRessourceEngraisComponent},
            ]
        }
    ]
},

// Redirection par défaut
{path: '**', redirectTo: 'Dashbord-Admin-Accueil', pathMatch: 'full'},
];


 


