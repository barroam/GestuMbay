import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContratsService } from '../../../../Services/Contrats/contrats.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roa-contrats-show',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './roa-contrats-show.component.html',
  styleUrl: './roa-contrats-show.component.css'
})
export class ROAContratsShowComponent implements OnInit {
  contrat: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratsService: ContratsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadContrat(+id);
    }
  }

  loadContrat(id: number): void {
    this.contratsService.getContratById(id).subscribe(
  
      (response: any) => {
      this.contrat = response.data; 
      console.log(this.contrat);
      },
      (error) => {
        console.error('Erreur lors du chargement du contrat:', error);
      }
    );
  }
  

  deleteContrat(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      this.contratsService.deleteContrat(this.contrat.id).subscribe(
        () => {
          this.router.navigate(['/Dashbord-Admin-Contrats/liste']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du contrat:', error);
        }
      );
    }
  }
}