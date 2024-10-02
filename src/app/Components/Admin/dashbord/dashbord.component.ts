import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/header/header.component";
import { SidebarComponent } from "../../../layout/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent,RouterOutlet],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
