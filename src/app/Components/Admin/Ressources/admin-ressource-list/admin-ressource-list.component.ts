import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-ressource-list',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive,RouterLink],
  templateUrl: './admin-ressource-list.component.html',
  styleUrl: './admin-ressource-list.component.css'
})
export class AdminRessourceListComponent {

}
