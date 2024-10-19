import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsersService } from '../../../Services/Users/users.service';
import { PartageServicesService } from '../../../Services/partageServices/partage-services.service';
import { StorageService } from '../../../Services/Storage/storage.service';

@Component({
  selector: 'app-fournisseurs-dashbord',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './fournisseurs-dashbord.component.html',
  styleUrl: './fournisseurs-dashbord.component.css'
})
export class FournisseursDashbordComponent {
 
}