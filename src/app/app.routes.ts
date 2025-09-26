import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import { Shows } from './pages/shows/shows';
import {ShowDetail} from './pages/show-detail/show-detail';

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',component:Home},
  {path:'shows',component:Shows},
  {path:'shows/:id',component:ShowDetail},
  {path:'login',component:Login},
  {path:'register',component:Register}

];
