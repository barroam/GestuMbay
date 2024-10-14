import { Component, OnInit } from '@angular/core';
import { Demandes } from '../../../../Models/demandes';
import { DemandesService } from '../../../../Services/Demandes/demandes.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-roa-demandes',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './roa-demandes.component.html',
  styleUrl: './roa-demandes.component.css'
})
export class ROADemandesComponent {
  
}