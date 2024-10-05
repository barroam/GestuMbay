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
import { DemandeRessourceComponent } from './Demande/Ressource/demande-ressource/demande-ressource.component';
import { AdminRessourceSemencesComponent } from './Components/Admin/Ressources/admin-ressource-semences/admin-ressource-semences.component';
import path from 'path';
import { AdminRessourceEquipementComponent } from './Components/Admin/Ressources/admin-ressource-equipement/admin-ressource-equipement.component';
import { AdminRessourceEngraisComponent } from './Components/Admin/Ressources/admin-ressource-engrais/admin-ressource-engrais.component';

export const routes: Routes = [

    //Les ROUTES PRINCIPALES
{path: 'accueil',component:AccueilComponent},
{path:'auth',component:AuthPrincipalComponent},
{path:'demande-info-demandeur',component:InfoDemandeurComponent},
{path:'demande-controle-eligibilite',component:ControleComponent},
{path:'demande-ressource',component:DemandeRessourceComponent},


//LES ROUTES ADMIN
{path:'',component:DashbordAdminComponent, children:[
    {path:'',redirectTo:'Dashbord-Admin-Accueil',pathMatch:'full'},
    {path:'Dashbord-Admin-Accueil',component:DashbordComponent},
    {path:'Dashbord-Admin-Utilisateurs',component:AdminUserListComponent},
    {path:'Dashbord-Admin-Projets',component:AdminProjetListComponent},
    {path:'Dashbord-Admin-Contrats',component:AdminContratListComponent},
    {path:'Dashbord-Admin-Ressources',component:AdminRessourceListComponent,
        children:[
            {path:'',redirectTo:'Semences',pathMatch:'full'},
    {path:'Semences',component:AdminRessourceSemencesComponent},
    {path:'Equipement',component:AdminRessourceEquipementComponent},
    {path:'Engrais',component:AdminRessourceEngraisComponent},
    ]}]},  
     { path: '', redirectTo: '/Dashbord-Admin-Accueil', pathMatch: 'full' }, 



 

];
