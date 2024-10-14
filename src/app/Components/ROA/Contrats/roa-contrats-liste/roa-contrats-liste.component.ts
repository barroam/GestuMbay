import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContratsService } from '../../../../Services/Contrats/contrats.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roa-contrats-liste',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './roa-contrats-liste.component.html',
  styleUrl: './roa-contrats-liste.component.css'
})
export class ROAContratsListeComponent implements OnInit {
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
          console.log(this.contrats);
          
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
    this.router.navigate(['Dashbord-ROA-Contrats//add-or-update']);
  }

  navigateToShowContrat(id: number): void {
    this.router.navigate(['Dashbord-ROA-Contrats//show', id]);
  }

  navigateToEditContrat(id: number): void {
    this.router.navigate(['Dashbord-ROA-Contrats//add-or-update', id]);
  }
}