import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../layout/header/header.component";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
