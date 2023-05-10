import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from '../Services/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  imgSrc: string='assets/img/safe.png';
  LoginForm:FormGroup;
  constructor(private fb:FormBuilder,private Auth:AuthorizeService,private rout:Router){
    this.LoginForm=fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]],
    });
   
  }

  get Username(){
    return this.LoginForm.get('userName');
  }
  get Password(){
    return this.LoginForm.get('password');
  }
  error:string='';
  submitData(data:FormGroup){
    console.log(data.value);
    this.Auth.login(data.value).subscribe((info)=>
    {
if(info.message=="sucesss")
{
  localStorage.setItem("userInfo",info.token);
  this.Auth.getToken();
this.rout.navigate(['/home']);
}
else
{
this.error="error";
}

  })
}}
