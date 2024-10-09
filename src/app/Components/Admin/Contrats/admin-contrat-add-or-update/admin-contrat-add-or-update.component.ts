import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { Users } from '../../../../Models/users';
import { ContratsService } from '../../../../Services/Contrats/contrats.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../Services/Users/users.service';
import { ProjetsService } from '../../../../Services/Projets/projets.service';
import { Projets } from '../../../../Models/projets';

@Component({
  selector: 'app-admin-contrat-add-or-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './admin-contrat-add-or-update.component.html',
  styleUrl: './admin-contrat-add-or-update.component.css'
})
export class AdminContratAddOrUpdateComponent implements OnInit {
  contractForm: FormGroup;
  fournisseurs: Users[] = [];
  agriculteurs: Users[] = [];
  projets: Projets[] = [];
  isEditMode: boolean = false;
  contractId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private contratService: ContratsService,
    private projetsService: ProjetsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contractForm = this.fb.group({
      etat: ['en_cours', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      objectif: ['', [Validators.required, Validators.maxLength(250)]], // Validation pour objectif
      mode_paiement: ['', [Validators.required, Validators.maxLength(250)]], // Validation pour mode_paiement
      nature_paiement: ['', [Validators.required, Validators.maxLength(250)]], // Validation pour nature_paiement
      quantite: [, [Validators.required, Validators.min(1)]], // Aucun changement ici
      presvu: ['', [Validators.required, Validators.maxLength(250)]], // Validation pour presvu
      force_majeure: ['', [Validators.required, Validators.maxLength(250)]], // Validation pour force_majeure
      projet_id: ['', Validators.required], // Aucun changement ici
      ressource_id: ['', Validators.required], // Aucun changement ici
      user_id: [[], Validators.required], // Validation pour user_id
    });
  }
  ngOnInit() {
    this.loadUsers();
    this.loadProjets();
    
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.contractId = +params['id'];
        this.loadContractDetails(this.contractId);
      }
    });
  }

  loadContractDetails(id: number) {
    this.contratService.getContratById(id).subscribe(
      (response: any) => {
        const contrat = response.data; // Assume that the 'data' object contains the contract details
  
        // Patching the form with the retrieved data
        this.contractForm.patchValue({
          etat: contrat.etat,
          date: contrat.date,
          objectif: contrat.objectif,
          mode_paiement: contrat.mode_paiement,
          nature_paiement: contrat.nature_paiement,
          quantite: contrat.quantite,
          presvu: contrat.presvu,
          force_majeure: contrat.force_majeure,
          projet_id: contrat.projet_id, // Assuming this is the ID and matches with the form control
          ressource_id: contrat.ressource_id, // Assuming this is the ID and matches with the form control
          user_id: contrat.users.map((user: Users) => user.id), // Mapping the user IDs if multiple users exist
        });
  
        console.log('Contrat mis à jour avec succès dans le formulaire.');
      },
      error => {
        console.error('Erreur lors du chargement des détails du contrat:', error);
        alert('Erreur lors du chargement des détails du contrat.');
      }
    );
  }
  

  loadUsers() {
    this.userService.getUsersByRole('fournisseur').subscribe(
      (data: any) => {
        if (data.success && Array.isArray(data.users)) {
          this.fournisseurs = data.users;
        } else {
          console.error('Données de fournisseurs invalides:', data);
        }
      },
      (error) => console.error('Erreur lors du chargement des fournisseurs:', error)
    );

    this.userService.getUsersByRole('agriculteur').subscribe(
      (data: any) => {
        if (data.success && Array.isArray(data.users)) {
          this.agriculteurs = data.users;
        } else {
          console.error('Données des agriculteurs invalides:', data);
        }
      },
      (error) => console.error('Erreur lors du chargement des agriculteurs:', error)
    );
  }

  loadProjets() {
    this.projetsService.getProjets().subscribe(
      (projets) => {
        this.projets = projets;
      },
      (error) => console.error('Erreur lors du chargement des projets:', error)
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contractForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  onSubmit() {
    if (this.contractForm.valid) {
      const formData = this.contractForm.value;
      
      if (this.isEditMode && this.contractId) {
        this.contratService.updateContrat(this.contractId, formData).subscribe(
          () => {
            console.log('Contrat mis à jour avec succès');
            this.router.navigate(['/Dashbord-Admin-Contrats/liste']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du contrat:', error);
            alert('Erreur lors de la mise à jour du contrat.');
          }
        );
      } else {
        this.contratService.createContrat(formData).subscribe(
          () => {
            console.log('Contrat créé avec succès');
            this.router.navigate(['/Dashbord-Admin-Contrats/liste']);
          },
          (error) => {
            console.error('Erreur lors de la création du contrat:', error);
            alert('Erreur lors de la création du contrat.');
          }
        );
      }
    }
  }
}