import { Component } from '@angular/core';
import { IUser } from '../Shared-Interface/IUser';
import { FrindRequstService } from '../Services/frind-requst.service';
import { AuthorizeService } from '../Services/authorize.service';
import { MessageService } from '../Services/message.service';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import { IMessage } from '../Shared-Interface/IMessage';
import { PostServiceService } from '../Services/post-service.service';
import { IPostMessage } from '../Shared-Interface/IPostMessage';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']

})
export class ChatComponent {

  public renderer!: Renderer2;
  constructor(private FrindRequest: FrindRequstService, rendererFactory: RendererFactory2,
    private Auth: AuthorizeService, private Message: MessageService, private Post: PostServiceService) {
    this.UsersID = {};
    this.renderer = rendererFactory.createRenderer(null, null);

  }
  private hubConnectionBuilder!: HubConnection;

  Frindes: IUser[] = []
  UsersID!: ISendRequest
  CurrentUserId!: string

  ngOnInit() {
    this.FrindRequest.GetFriends(this.Auth.gettokenID()).subscribe({
      next: data => this.Frindes = data,
      error: err => console.log(err)
    })
    this.CurrentUserId = this.Auth.gettokenID()
    if (this.UsersID) {
      this.UsersID.fromId = this.Auth.gettokenID();
    }
    this.hubConnectionBuilder = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/ChatHub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilder.start().then(() => {
        console.log("connection started");
      }).catch(err => console.log(err));
    }, 1);
  }
  toId: any = ''

  Messages: IMessage[] = []
  ChatUser!: IUser
  private i: number = 0;




  CreateMessage: IPostMessage = {
    fromUserId: this.Auth.gettokenID(),
    toUserId: '',
    textMessage: ''
  }

  insertAfter(newNode: any, existingNode: any) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }
  SendMessage() {
    console.log(this.CreateMessage)
    this.Message.AddMessage(this.CreateMessage).subscribe({
      next: data => console.log(data)
    })
    this.hubConnectionBuilder.invoke('NewChatHub', this.CreateMessage);

    this.hubConnectionBuilder.off('NewMessageNotify');
    this.hubConnectionBuilder.on('NewMessageNotify', (msg: IPostMessage) => {
      const element = document.getElementById("chat") as HTMLElement;


      const liFrom = document.createElement("li");
      const liTo = document.createElement("li");

      if (msg.fromUserId === this.CurrentUserId) {
        liFrom.classList.add("me");
        liFrom.innerHTML = `
        <div class = "delete">
      <div class="entete" id = "delete">
        <span class="status green"></span>
        <h2>${this.Auth.getName()}</h2>
        <h3>now</h3>
      </div>
      <div class="triangle"></div>
      <div class="message">${msg.textMessage}</div>
      </div>
    `;
      }
      if (msg.toUserId === this.CurrentUserId && msg.fromUserId == this.UsersID.toId) {
        console.log(msg.toUserId + this.Auth.gettokenID())
        liTo.classList.add("you");
        liTo.innerHTML = `
      <div class = "delete">
      <div class="entete"  >
        <h2>{msg.fromUser.fName}</h2>
        <h3>{msg.messageTime}</h3>
        <span class="status blue"></span>
      </div>
      <div class="triangle"></div>
      <div class="message">${msg.textMessage}</div>
      </div>
    `;
      }
      console.log(liFrom, liTo)
      element.appendChild(liTo);
      element.appendChild(liFrom);
    });

  }
  async GetChat(userId?: string) {
    const chat = document.getElementById("chat");
    const element = document.getElementsByClassName("delete");
    for (let i = 0; i < element.length; i++) {

      if (element[i] != null) {

        element[i].innerHTML = ""
      }
    }

    if (this.UsersID) {
      this.UsersID.toId = userId;
    }
    if (this.CreateMessage) {

      this.CreateMessage.toUserId = userId
    }

    this.Post.GetCurrentUser(userId).subscribe({

      next: data => this.ChatUser = data,
      error: err => console.log("Error")
    })

    this.Message.GetMessages(this.UsersID).subscribe({
      next: data => this.Messages = data,
      error: err => console.log(err)
    })
  }
}
