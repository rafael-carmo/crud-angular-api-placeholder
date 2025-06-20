import { Routes } from '@angular/router';
import { ItemListComponent } from "./components/item-list/item-list.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { UserNotAuthenticatedGuard } from './services/guards/user-not-authenticated.guard';
import { UserAuthenticatedGuard } from './services/guards/user--authenticated.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    {
      path: 'login', component: LoginComponent,
      canActivate: [UserNotAuthenticatedGuard]
    },
    {
      path: 'signup', component: SignupComponent,
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [UserAuthenticatedGuard],
        children: [
            {path: '', component: DashboardComponent},
            {path: 'items', component: ItemListComponent},
        ]
    },
    {path: '**', component: PageNotFoundComponent},
];
