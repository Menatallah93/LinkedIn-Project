import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FrindRequstService } from '../Services/frind-requst.service';
import { AuthorizeService } from '../Services/authorize.service';
import { ProfileservicesService } from '../Services/Profile.service';
import { IPost } from '../Shared-Interface/IPost';
import { IProfile } from '../Shared-Interface/IProfile';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.scss']
})
export class SingleProfileComponent {
  private hubConnectionBuilder!: HubConnection;
  constructor(private fb: FormBuilder, private ProfileService: ProfileservicesService,
    private FrindRequest: FrindRequstService, private Auth: AuthorizeService,
    private activerout: ActivatedRoute, private router: Router) {



  }

  userId: any;
  user: any;
  Error: any;

  MyPostss: IPost[] = []
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


  UpdatePofileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    fName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    lName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    about: [''],
    company: ['', [Validators.required, Validators.minLength(6)]],
    job: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required]],
    twitterLink: ['', [Validators.required]],
    facebookLink: ['', [Validators.required]],
    instagramLink: ['', [Validators.required]],
    image: ['', [Validators.required]],
    linkedinLink: ['', [Validators.required]],
    cuntry: ['', [Validators.required]],
  });


  ConnectForm = this.fb.group({
    fromId: [''],
    toId: ['']

  });

  fromId: string = '';
  toId: string = '';
  IsFrind!: boolean
  IsRejected!: boolean
  IsPendding!: boolean
  async ngOnInit() {
    this.hubConnectionBuilder = new signalR.HubConnectionBuilder().withUrl('https://localhost:44335/FrindHub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilder.start().then(() => {
        console.log("connection started");
      }).catch(err => console.log(err));
    }, 10);

    console.log(this.ProfileData);
    this.ProfileService.GetData(this.Auth.gettokenID()).subscribe({
      next: data => this.ProfileData = data,

      error: err => this.Error = err,
    })
    console.log(this.ProfileData);

    // this.MyPosts();

    this.activerout.paramMap.subscribe((parm: ParamMap) => {
      this.userId = parm.get("id");
      this.ProfileService.GetMyPosts(this.userId).subscribe({
        next: data => this.MyPostss = data,
  
        error: err => console.log(err),
      })
      this.user = this.ProfileService.GetData(this.userId).subscribe({
        next: data => this.user = data,
        error: err => console.log(err),
      });

    })

    this.fromId = this.Auth.gettokenID();
    this.toId = this.userId;
    this.FrindRequest.CheckFrind(this.fromId, this.toId).subscribe({
      next: data => this.IsFrind = data
    })
    this.FrindRequest.CheckReject(this.fromId, this.toId).subscribe({
      next: data => this.IsRejected = data
    })
    this.FrindRequest.CheckPending(this.fromId, this.toId).subscribe({
      next: data => this.IsPendding = data
    })
  }
  Cancel() {
    this.FrindRequest.CancelRequest(this.fromId, this.toId).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // MyPosts() {
  //   this.ProfileService.GetMyPosts(this.userId).subscribe({
  //     next: data => this.MyPostss = data,

  //     error: err => console.log(err),
  //   })

  // }

  isClick: Boolean = true;
  async SendConnect() {
    this.FrindRequest.SenConnect(this.fromId, this.toId).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })


    this.IsFrind = true;
    var reqe = {

      fromId: this.fromId,
      toId: this.toId
    }
    this.hubConnectionBuilder.invoke('NewRequestAdded', reqe);
    await this.hubConnectionBuilder.on('NewRequestNotify', (req) => {
      console.log("Marina");
      if (req.toId == this.Auth.gettokenID()) {

        const element: HTMLElement = document.getElementById("NumberNotify") as HTMLElement;
        element.innerHTML = `${parseInt(element.innerHTML) + 1}`
      }
    });

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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