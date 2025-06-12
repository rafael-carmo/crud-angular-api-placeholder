import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '', title: 'Dashboard',  icon: 'home', class: 'sidebar-align sidebar-link active text-decoration-none p-3' },
    { path: '/user', title: 'User Profile',  icon:'person', class: 'sidebar-align sidebar-link text-decoration-none p-3' },
    { path: '/table', title: 'Table List',  icon:'table_view', class: 'sidebar-align sidebar-link text-decoration-none p-3' },
    { path: '/maps', title: 'Maps',  icon:'map', class: 'sidebar-align sidebar-link text-decoration-none p-3' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: 'sidebar-align sidebar-link text-decoration-none p-3' },
    { path: '/items', title: 'Items',  icon:'list', class: 'sidebar-align sidebar-link text-decoration-none p-3' },
];

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isCollapsed = false;

  constructor(){}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


}
