import { Component, OnInit } from '@angular/core';
import { Demandes } from '../../../../Models/demandes';
import { DemandesService } from '../../../../Services/Demandes/demandes.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roa-demandes-liste',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './roa-demandes-liste.component.html',
  styleUrl: './roa-demandes-liste.component.css'
})
export class ROADemandesListeComponent implements OnInit {
  demandes: Demandes[] = [];

  constructor(
    private demandesService: DemandesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chargerDemandes();
  }

  chargerDemandes() {
    this.demandesService.getDemandes().subscribe(
      (data: Demandes[]) => {
        this.demandes = data;
      },
      error => {
        console.error('Erreur lors du chargement des demandes:', error);
      }
    );
  }

  voirDetails(id: number | undefined) {
    if (id) {
      this.router.navigate(['/Dashbord-ROA-Demandes/show', id]);
    }
  }
}