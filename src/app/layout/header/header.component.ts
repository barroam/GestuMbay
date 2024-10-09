import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = null;

  constructor() {
    // Récupérer l'objet utilisateur depuis le localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user); // Analyser la chaîne JSON
      this.username = userData.name; // Extraire le nom
    }
  }
}
