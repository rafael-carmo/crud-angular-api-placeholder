import { Routes } from '@angular/router';
import { ItemListComponent } from "./components/item-list/item-list.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: 'home', 
        component: HomeComponent,
        children: [            
            {path: 'item-list', component: ItemListComponent},
        ]
    },
    {path: '', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent},
];
