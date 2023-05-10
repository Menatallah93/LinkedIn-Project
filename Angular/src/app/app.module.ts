import { NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLinkedinComponent } from './home-linkedin/home-linkedin.component';
import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SignalRsService } from './Services/SignalR.service';
import { SingleProfileComponent } from './single-profile/single-profile.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { ContactUsComponent } from './contact-us/contact-us.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeLinkedinComponent,
    LoginComponent,
    RegestrationComponent,
    HeaderComponent,
    ProfileComponent,
    SingleProfileComponent,
    ChatComponent,
    SearchComponentComponent,
    ContactUsComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
