import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../Validation/regestrationValidation';
import { AuthorizeService } from '../Services/authorize.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.scss']
})

export class RegestrationComponent implements OnInit {
  constructor(private fb:FormBuilder,private Auth:AuthorizeService,private rote:Router){}
  selectedFile!: File;
  
  RegisterationForm = this.fb.group({
    userName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    fName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    lName:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
    email:['',[Validators.required,Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z]+\.[A-Za-z]+$')]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required,Validators.minLength(6)]],
    address: ['' , [Validators.required]],
    image: ['' ,[Validators.required]],

    },{validator:[ConfirmPasswordValidator]});

   

 get UserName(){
    return this.RegisterationForm.get('userName');
  }
  get FirstName(){
    return this.RegisterationForm.get('fName');
  }
  get LastName(){
    return this.RegisterationForm.get('lName');
  }
  get yourEmail(){
    return this.RegisterationForm.get('email');
  }
  get Address(){
    return this.RegisterationForm.get('address');
  }
  get yourPassword(){
    return this.RegisterationForm.get('password');
  }
  get ConfirmPassword(){
    return this.RegisterationForm.get('confirmPassword');
  }

 
 
  async submitData(data:any){
    var Data = {
      'userName': data.get("userName").value,
      'fName': data.get("fName").value,
      'lName': data.get("lName").value,
      'email': data.get("email").value,
      'phone': "0105154584488",
      'address': data.get("address").value,
      'password' : data.get("password").value,
      'confirmPassword': data.get("confirmPassword").value,
      'image': this.selectedFile
    }
    // this.register = Data
    console.log(Data)
    // console.log(this.register)
    // console.log(this.register.image)
    // console.log(this.register.image.name)
      const formData = new FormData();
      // formData = data
    formData.append('fName', data.get("fName").value);
    formData.append('userName', data.get("userName").value);
    formData.append('lName', data.get("lName").value);
    formData.append('email', data.get("email").value);
    formData.append('address', data.get("address").value);
    formData.append('password', data.get("password").value);
    formData.append('confirmPassword', data.get("confirmPassword").value);
    formData.append('image', this.selectedFile,this.selectedFile.name);
    console.log(data.value)
    console.log(data.get("userName").value)
    console.log(formData.get("userName"))
      console.log(formData.get("email"))
      console.log(formData.get("image"))
      console.log(formData.get("password"))
      console.log(formData)
      console.log(formData.forEach)
      console.log(formData.getAll)
      console.log(this.RegisterationForm.get("image"))
     
      formData.forEach((value,key) => {
        console.log(key+value)
         });
      
      this.Auth.register(formData).subscribe((info)=>
      {
      if(info.message=="sucess")
      {
        this.rote.navigate(['/login']);
      }
      else
      {
        console.log("Not vaild");
  
      }
      })
  
    }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    console.log(this.selectedFile)
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    const inputElement: HTMLInputElement = document.getElementById('formFile') as HTMLInputElement

  inputElement.files = dataTransfer.files;
  }


 ngOnInit(): void {
   
 }

}
