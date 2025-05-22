import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private userService: UserService){}

  sidebarToggle(){

  }

  getTitle(): string {
    return 'Dashboard';
  }

  logout(): void {
    this.userService.logout();
  }
}
