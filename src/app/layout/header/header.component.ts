import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../Services/Storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = null;
  

  constructor(private storageService: StorageService) {
    // Récupérer l'objet utilisateur depuis le StorageService
    const user = this.storageService.getLocalItem('user');
    if (user) {
      const userData = user; // Analyser la chaîne JSON
      this.username = userData.name; // Extraire le nom
    }
  }
}
