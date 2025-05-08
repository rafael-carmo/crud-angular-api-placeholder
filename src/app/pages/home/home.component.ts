import { Component, OnInit } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatCardContent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private userService: UserService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  deslogar(): void {
    this.userService.deslogar();
  }
}
