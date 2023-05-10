import { Component, Input } from '@angular/core';
import { AuthorizeService } from '../Services/authorize.service';
import { IUser } from '../Shared-Interface/IUser';
import { FrindRequstService } from '../Services/frind-requst.service';
import { ProfileservicesService } from '../Services/Profile.service';
import { IProfile } from '../Shared-Interface/IProfile';
import { SearchService } from '../Services/search.service';
import { PostServiceService } from '../Services/post-service.service';
import { Router } from '@angular/router';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private hubConnectionBuilderFriend!: HubConnection;



  constructor(private Auth: AuthorizeService,
    private ProfileService: ProfileservicesService,
    private frindRequest: FrindRequstService,
    private Search: SearchService,
    private _PostService: PostServiceService,
    private route: Router
  ) { }

  SignOut() {

    this.Auth.LogOut();
  }

  users: IUser[] = [];
  user!: IProfile;
  RequestNumber = 0
  inputText!: string
  SendRequestSignalR: ISendRequest = {
    toId: this.Auth.gettokenID()
  }
  CurrentUser: IUser = {
    id: '',
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
  ngOnInit() {

    this._PostService.GetCurrentUser(this.Auth.gettokenID()).subscribe({
      next: User => {
        this.CurrentUser = User

        console.log(this.CurrentUser.image)

        this.CurrentUser = User
      },

      error: err => console.log(err)
    });

    this.frindRequest.GetNumberRequest(this.Auth.gettokenID()).subscribe({
      next: data => this.RequestNumber = data,
      error: err => console.log(err)
    });

    this.ProfileService.GetData(this.Auth.gettokenID()).subscribe({
      next: data => this.user = data,
      error: err => console.log("Error"),

    });

    this.hubConnectionBuilderFriend = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/FrindHub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilderFriend.start().then(() => {
        console.log("connection Friend  started");
      }).catch(err => console.log(err));
    }, 2000);
  }

  onSearchChange(event: Event) {

    this.route.navigate(["/search"]);

  }

  // onSearchChange(event: Event) {
  //   if (event.target instanceof HTMLInputElement) {
  //     const searchText = event.target.value;
  //     this.Search.Search(searchText).subscribe({
  //       next: data => console.log(data),
  //       error: err => console.log(err)
  //     })
  //   }
  // }
  fromFrined!: IUser

  getUsers() {
    this.frindRequest.GetRequest(this.Auth.gettokenID()).subscribe({
      next: data => this.users = data,
      error: err => console.log(err)
    });
    const element: HTMLElement = document.getElementById("NumberNotify") as HTMLElement;
    element.innerHTML = `0`
  }

  AcceptFriends(fromId: any) {
    this.SendRequestSignalR.fromId = fromId;
    console.log("asdasdasdasd",this.SendRequestSignalR.fromId)
    this.frindRequest.AcceptRequest(fromId, this.Auth.gettokenID()).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
    console.log("hiii : " + fromId);
    // this.SendRequestSignalR.fromId = fromUserId;
    // this.SendRequestSignalR.toId = this.Auth.gettokenID();
    console.log("Marwa : ");
    // 7a325c40-3b80-4355-9f5f-990d77803107
    this.hubConnectionBuilderFriend.invoke('AcceptFriend',this.SendRequestSignalR);
    this.hubConnectionBuilderFriend.off('AppendFriendNotify')
    this.hubConnectionBuilderFriend.on('AppendFriendNotify', (request) => {
      this._PostService.GetCurrentUser(fromId).subscribe({
        next: data => {
          this.fromFrined = data,
            console.log(data)

        }
      })
      const friend = document.getElementById("appendFriend") as HTMLElement;
      friend.innerHTML = `<li  class="list-group-item d-flex justify-content-between"
      (click)="showProfile(Friend?.id)" style="cursor: pointer;">
      <div>
      <img src="https://localhost:7223/images/${this.fromFrined.image}" alt="Profile" class="rounded-circle" width="50px"
      height="50px">
          ${this.fromFrined.fullName}
      </div>
      <div class="ml-auto">
        <button (click)="Showchat()" type="button" class="btn btn-primary" style="height:5vh;"><i
            class="fa-sharp fa-comment-dots"></i> </button>
      </div>
    </li>`

    })


  }

  RejectFriends(fromUserId: any) {
    this.frindRequest.RejectRequest(fromUserId, this.Auth.gettokenID()).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
    console.log("hiii : " + fromUserId);
  }

}
