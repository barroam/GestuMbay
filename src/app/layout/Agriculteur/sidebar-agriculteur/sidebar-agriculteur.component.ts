import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-agriculteur',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar-agriculteur.component.html',
  styleUrl: './sidebar-agriculteur.component.css'
})
export class SidebarAgriculteurComponent {

}
