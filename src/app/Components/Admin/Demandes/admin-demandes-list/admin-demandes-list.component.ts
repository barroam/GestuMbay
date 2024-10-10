import { Component, OnInit } from '@angular/core';
import { Demandes } from '../../../../Models/demandes';
import { InfoDemandesService } from '../../../../Services/Info-demandes/info-demandes.service';
import { Router } from '@angular/router';
import { DemandesService } from '../../../../Services/Demandes/demandes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-demandes-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './admin-demandes-list.component.html',
  styleUrl: './admin-demandes-list.component.css'
})
export class AdminDemandesListComponent implements OnInit {
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
      this.router.navigate(['/Dashbord-Admin-Demandes/show', id]);
    }
  }
}