import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    SidebarComponent,
    NavbarComponent,
    MatSidenavModule,
    SidebarComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private userService: UserService){}

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}
