import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule
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

  deslogar(): void {
    this.userService.deslogar();
  }
}
