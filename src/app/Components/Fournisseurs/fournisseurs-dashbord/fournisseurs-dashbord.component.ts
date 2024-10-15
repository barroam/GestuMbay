import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fournisseurs-dashbord',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './fournisseurs-dashbord.component.html',
  styleUrl: './fournisseurs-dashbord.component.css'
})
export class FournisseursDashbordComponent {

}
