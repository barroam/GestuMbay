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
import { AdminProjetComponent } from './Components/Admin/Projets/admin-projet/admin-projet.component';
import { AdminProjetAddUpdateComponent } from './Components/Admin/Projets/admin-projet-add-update/admin-projet-add-update.component';
import { AdminProjetShowComponent } from './Components/Admin/Projets/admin-projet-show/admin-projet-show.component';
import { AdminProjetHistoriquesComponent } from './Components/Admin/Projets/admin-projet-historiques/admin-projet-historiques.component';
import { AdminDemandesComponent } from './Components/Admin/Demandes/admin-demandes/admin-demandes.component';
import { AdminDemandesAddUpdateComponent } from './Components/Admin/Demandes/admin-demandes-add-update/admin-demandes-add-update.component';
import { AdminDemandesShowComponent } from './Components/Admin/Demandes/admin-demandes-show/admin-demandes-show.component';
import { AdminDemandesListComponent } from './Components/Admin/Demandes/admin-demandes-list/admin-demandes-list.component';
import { AdminUsersComponent } from './Components/Admin/Users/admin-users/admin-users.component';
import { AdminInscriptionComponent } from './Components/Admin/Users/admin-inscription/admin-inscription.component';
import { DashbordRoaComponent } from './layout/Roa/dashbord-roa/dashbord-roa.component';
import { ROADashbordComponent } from './Components/ROA/roa-dashbord/roa-dashbord.component';
import { ROADemandesListeComponent } from './Components/ROA/Demandes/roa-demandes-liste/roa-demandes-liste.component';
import { ROADemandesComponent } from './Components/ROA/Demandes/roa-demandes/roa-demandes.component';
import { ROAContratsComponent } from './Components/ROA/Contrats/roa-contrats/roa-contrats.component';
import { ROAProjetsComponent } from './Components/ROA/Projets/roa-projets/roa-projets.component';
import { RoaRessourceListeComponent } from './Components/ROA/Ressource/roa-ressource-liste/roa-ressource-liste.component';
import { ROADemandesShowComponent } from './Components/ROA/Demandes/roa-demandes-show/roa-demandes-show.component';
import { ROADemandesAddUpdateComponent } from './Components/ROA/Demandes/roa-demandes-add-update/roa-demandes-add-update.component';
import { ROAContratsListeComponent } from './Components/ROA/Contrats/roa-contrats-liste/roa-contrats-liste.component';
import { ROAContratsShowComponent } from './Components/ROA/Contrats/roa-contrats-show/roa-contrats-show.component';
import { ROAContratsAddUpdateComponent } from './Components/ROA/Contrats/roa-contrats-add-update/roa-contrats-add-update.component';
import { ROAProjetsListComponent } from './Components/ROA/Projets/roa-projets-list/roa-projets-list.component';
import { ROAProjetsShowComponent } from './Components/ROA/Projets/roa-projets-show/roa-projets-show.component';
import { ROAProjetsAddUpdateComponent } from './Components/ROA/Projets/roa-projets-add-update/roa-projets-add-update.component';
import { RoaRessourceSemencesComponent } from './Components/ROA/Ressource/roa-ressource-semences/roa-ressource-semences.component';
import { RoaRessourceEquipementComponent } from './Components/ROA/Ressource/roa-ressource-equipement/roa-ressource-equipement.component';
import { RoaRessourceEngraisComponent } from './Components/ROA/Ressource/roa-ressource-engrais/roa-ressource-engrais.component';


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
        {path: 'Dashbord-Admin-Utilisateurs',
         component: AdminUsersComponent,
            children: [
                {path: '', redirectTo: 'liste', pathMatch: 'full'},
                {path: 'liste', component: AdminUserListComponent},
                {path: 'inscription', component: AdminInscriptionComponent}, 
            ]
        },{
            path: 'Dashbord-Admin-Demandes', component: AdminDemandesComponent,
            children: [
                {path: '', redirectTo: 'liste', pathMatch: 'full'},
                {path: 'liste', component: AdminDemandesListComponent},
                {path: 'show/:id', component: AdminDemandesShowComponent}, 
                {path: 'add-or-update', component: AdminDemandesAddUpdateComponent}, 
                {path: 'add-or-update/:id', component: AdminDemandesAddUpdateComponent}, 
            ]
        },
        {
            path: 'Dashbord-Admin-Projets',
            component: AdminProjetComponent,
            children: [
                {path: '', redirectTo: 'liste', pathMatch: 'full'},
                {path: 'liste', component: AdminProjetListComponent},
                {path: 'show/:id', component: AdminProjetShowComponent}, 
                {path: 'add-or-update', component: AdminProjetAddUpdateComponent}, 
                {path: 'add-or-update/:id', component: AdminProjetAddUpdateComponent}, 
                { path: 'historique/:id', component: AdminProjetHistoriquesComponent }
            ]
        },
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

{
    path: '',
    component: DashbordRoaComponent,
    children: [
        {path: '', redirectTo: 'Dashbord-ROA-Accueil', pathMatch: 'full'},
        {path: 'Dashbord-ROA-Accueil', component: ROADashbordComponent },
        {path: 'Dashbord-ROA-Demandes',
         component:ROADemandesComponent ,
          children: [
            {path: '', redirectTo: 'liste',pathMatch:'full'},
            {path: 'liste', component: ROADemandesListeComponent},
            {path:'show/:id', component:ROADemandesShowComponent},
            {path:'add-or-update',component:ROADemandesAddUpdateComponent},
            {path:'add-or-update/:id',component:ROADemandesAddUpdateComponent}
         ]

        },
        {path: 'Dashbord-ROA-Contrats', 
            component: ROAContratsComponent , children: [
                {path: '', redirectTo: 'liste',pathMatch:'full'},
                {path: 'liste', component:ROAContratsListeComponent },
                {path: 'show/:id', component:ROAContratsShowComponent },
                {path: 'add-or-update', component:ROAContratsAddUpdateComponent },
                {path: 'add-or-update/:id', component:ROAContratsAddUpdateComponent },
            ]
        },
        {path: 'Dashbord-ROA-Projets',
         component: ROAProjetsComponent , children: [
            {path: '', redirectTo: 'liste',pathMatch:'full'},
            {path: 'liste', component:ROAProjetsListComponent },
            {path: 'show/:id', component:ROAProjetsShowComponent},
            {path: 'add-or-update', component:ROAProjetsAddUpdateComponent },
            {path: 'add-or-update/:id', component:ROAProjetsAddUpdateComponent },
         ]
        },
        {path: 'Dashbord-ROA-Ressources', component: RoaRessourceListeComponent,
            children: [
                {path: '', redirectTo: 'Semences', pathMatch: 'full'},
                {path: 'Semences', component:RoaRessourceSemencesComponent},
                {path: 'Equipement', component:RoaRessourceEquipementComponent},
                {path: 'Engrais', component:RoaRessourceEngraisComponent},
            ]
        },
    
    
    ]
},












// Redirection par défaut
{path: '**', redirectTo: '', pathMatch: 'full'},
];


 


