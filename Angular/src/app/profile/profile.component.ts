import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileservicesService } from '../Services/Profile.service';
import { FrindRequstService } from '../Services/frind-requst.service';
import { IProfile } from '../Shared-Interface/IProfile';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import { IChangePass } from '../Shared-Interface/IChangePass';
import { IPost } from '../Shared-Interface/IPost';
import { PostServiceService } from '../Services/post-service.service';
import { AuthorizeService } from '../Services/authorize.service';
import { IUser } from '../Shared-Interface/IUser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private fb: FormBuilder, private ProfileService: ProfileservicesService,
    private FrindRequest: FrindRequstService,private Auth:AuthorizeService,
    private _PostService: PostServiceService,) {
  }

  MyPostss : IPost[] = []
  CurrentUser: IUser={
    id:'',
    fName: '',
    lName: '',
    image: '',
    fullName: '',
    about: '',
    company: '',
    job: '',
    linkedinLink: '',
    instagramLink: '',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    cuntry: '',
    address: ''
  };
  ProfileData: IProfile = {
    userId: '',
    fullName: '',
    fName: '',
    lName: '',
    about: '',
    company: '',
    job: '',
    cuntry: '',
    address: '',
    phone: '',
    twitterLink: '',
    facebookLink: '',
    instagramLink: '',
    linkedinLink: '',
    image: '',

  }
  Error: any;

  UpdatePofileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    fName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    lName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    about: [''],
    company: ['', ],
    job: ['',  [Validators.required]],
    phone: ['', ],
    address: ['', ],
    email: ['', ],
    twitterLink: ['', ],
    facebookLink: ['', ],
    instagramLink: ['', ],
    image: ['', ],
    linkedinLink: ['', ],
    cuntry: ['', ],
  });


  fromId: string = this.Auth.gettokenID();

  Ichange:IChangePass = {
    oldPass: '',
    newPass: ''
  }

  UpdatePassForm = this.fb.group({
    oldpass: ['',],
    newpass: ['',],
    confirmpass: ['',]

  });

  ConnectForm = this.fb.group({
    fromId: [''],
    toId: ['']

  });




  ngOnInit() {

    this._PostService.GetCurrentUser(this.Auth.gettokenID()).subscribe({
      next: User =>{ this.CurrentUser = User
      
        console.log(this.CurrentUser.image)

        this.CurrentUser = User
      },

      error: err => console.log(err) 
    });

    console.log(this.ProfileData);
    this.ProfileService.GetData(this.Auth.gettokenID()).subscribe({
      next: data => this.ProfileData = data,

      error: err => this.Error = err,
    })
    console.log(this.ProfileData);

    this.MyPosts();
  }

  SaveChanges() {
    console.log(this.ProfileData);
    this.ProfileService.UpdateData(this.Auth.gettokenID(), this.ProfileData).subscribe({
      next: data => this.ProfileData = data,

      error: err => console.log(err),
    })
  }


  PassChanges() {
    console.log(this.Ichange.newPass);
    console.log(this.Ichange.oldPass);
    this.ProfileService.ChangePass(this.Auth.gettokenID(),this.Ichange).subscribe({
      next: data => console.log(data),
      
      error: err => console.log(err),
    })}

    MyPosts() {
      
      this.ProfileService.GetMyPosts(this.Auth.gettokenID()).subscribe({
        next: data => this.MyPostss = data,
        
        error: err => console.log(err),
      })
    }






  get fullName() {
    return this.UpdatePofileForm.get('fullName');
  }

  get lName() {
    return this.UpdatePofileForm.get('lName');
  }

  get fName() {
    return this.UpdatePofileForm.get('fName');
  }
  get about() {
    return this.UpdatePofileForm.get('about');
  }
  get address() {
    return this.UpdatePofileForm.get('address');
  }
  get image() {
    return this.UpdatePofileForm.get('image');
  }
  get linkedinLink() {
    return this.UpdatePofileForm.get('linkedinLink');
  }
  get instagramLink() {
    return this.UpdatePofileForm.get('instagramLink');
  }
  get facebookLink() {
    return this.UpdatePofileForm.get('facebookLink');
  }
  get twitterLink() {
    return this.UpdatePofileForm.get('twitterLink');
  }
  get email() {
    return this.UpdatePofileForm.get('email');
  }
  get phone() {
    return this.UpdatePofileForm.get('phone');
  }
  get cuntry() {
    return this.UpdatePofileForm.get('cuntry');
  }

  get company() {
    return this.UpdatePofileForm.get('company');
  }

  get job() {
    return this.UpdatePofileForm.get('job');
  }

}
