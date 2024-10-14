import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roa-ressource-liste',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './roa-ressource-liste.component.html',
  styleUrl: './roa-ressource-liste.component.css'
})
export class RoaRessourceListeComponent {

}
