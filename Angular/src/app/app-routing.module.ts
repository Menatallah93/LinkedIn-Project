import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLinkedinComponent } from './home-linkedin/home-linkedin.component';
import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleProfileComponent } from './single-profile/single-profile.component';
import { AuthGuard } from 'src/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponentComponent } from './search-component/search-component.component';

const routes: Routes = [
  {path: '' , redirectTo:'login' , pathMatch:'full'},
  {path: 'login',component:LoginComponent},
  {path: "home",component:HomeLinkedinComponent},
  {path: 'Register',component:RegestrationComponent},
  {path: 'profile' , component:ProfileComponent},
  {path: 'profile/:id' , component:SingleProfileComponent},
  {path: 'ContactUs',component:ContactUsComponent},
  {path: 'chat',component:ChatComponent},
  {path: 'search',component:SearchComponentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
