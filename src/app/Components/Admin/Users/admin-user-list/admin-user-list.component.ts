import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../Services/Users/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Users } from '../../../../Models/users';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements OnInit {

    roles = ['admin', 'agriculteur', 'fournisseur', 'ROA']; // Liste des rôles
    selectedRole: string = ''; // Rôle sélectionné
    users: Users[] = []; // Utilisateurs récupérés
    role:any;
    constructor(private userService: UsersService) {}
  
    ngOnInit(): void {}
  
    // Méthode pour récupérer les utilisateurs selon le rôle sélectionné
    onRoleChange() {
      if (this.selectedRole) {
        this.userService.getUsersByRole(this.selectedRole).subscribe({
          next: (reponse: any) => {
            this.users = reponse.users;
            this.role=reponse;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des utilisateurs', err);
          }
        });
      }
    }
  }