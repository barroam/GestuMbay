import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';

import { ContratsService } from '../../../../Services/Contrats/contrats.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-contrat-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive,],
  templateUrl: './admin-contrat-list.component.html',
  styleUrl: './admin-contrat-list.component.css'
})
export class AdminContratListComponent implements OnInit {
  contrats: any[] = [];
  errorMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private contratsService: ContratsService, private router: Router) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadContrats(): void {
    this.subscriptions.add(
      this.contratsService.getContrats().subscribe(
        (data) => {
          this.contrats = data;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Erreur lors du chargement des contrats:', error);
          this.errorMessage = 'Impossible de charger les contrats. Veuillez réessayer plus tard.';
        }
      )
    );
  }

  deleteContrat(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      this.subscriptions.add(
        this.contratsService.deleteContrat(id).subscribe(
          () => {
            this.loadContrats();
            this.errorMessage = '';
          },
          (error) => {
            console.error('Erreur lors de la suppression du contrat:', error);
            this.errorMessage = 'Impossible de supprimer le contrat. Veuillez réessayer plus tard.';
          }
        )
      );
    }
  }

  navigateToAddContrat(): void {
    this.router.navigate(['Dashbord-Admin-Contrats/add-or-update']);
  }

  navigateToShowContrat(id: number): void {
    this.router.navigate(['Dashbord-Admin-Contrats/show', id]);
  }

  navigateToEditContrat(id: number): void {
    this.router.navigate(['Dashbord-Admin-Contrats/add-or-update', id]);
  }
}