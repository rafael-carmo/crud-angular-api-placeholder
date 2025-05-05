import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from "./components/item-list/item-list.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ItemListComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-api-placeholder';
}
