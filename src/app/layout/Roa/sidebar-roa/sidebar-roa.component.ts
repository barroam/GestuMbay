import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar-roa',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './sidebar-roa.component.html',
  styleUrl: './sidebar-roa.component.css'
})
export class SidebarRoaComponent {

}
