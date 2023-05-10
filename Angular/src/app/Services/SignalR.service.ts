import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IComment } from "../Shared-Interface/IComment";
import { IProfile } from '../Shared-Interface/IProfile';
import { IChangePass } from '../Shared-Interface/IChangePass';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import * as signalR from '@aspnet/signalr'
import { IUser } from '../Shared-Interface/IUser';
@Injectable({
  providedIn: 'root'
})
export class SignalRsService {

    hubconnection!: signalR.HubConnection;
    Mypost!: ICreatePost;
    Myuserid! : IUser;
    public renderer!: Renderer2;
    
  constructor(private http: HttpClient,rendererFactory: RendererFactory2) {

      this.renderer = rendererFactory.createRenderer(null, null);
   }


  StartPostConnection(){
    this.hubconnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/Posthub',
    {
        skipNegotiation : true ,
         transport:signalR.HttpTransportType.WebSockets
    }).configureLogging(signalR.LogLevel.Debug).build();

    this.hubconnection.start().then(()=>{
        console.log("Connection Post Start  ")
    }).catch(err => console.log(err))
  }


  async askServer(post:any,MyPost : ICreatePost,user:IUser,id:string){
    this.Mypost = post;
    this.Myuserid = user;
    
    this.hubconnection.invoke('NewPost',post,id)
    const self = this;
    await this.hubconnection.on('PostAdded',function (Myuserid,post) {
        console.log(Myuserid)
        var Mydiv1 = document.getElementById("postsDiv"); 
        console.log(Mydiv1)
        
        const p: HTMLElement = self.renderer.createElement('p');
        p.innerHTML='';
       if(MyPost.file==null)
       {
        p.innerHTML += `<div class="card-body mb-2" style=" background-color: white;">
        
        <div class="d-flex m-3">
        
        <div class="m-3">
        
        <img src="https://localhost:7223/images/${user.image}" alt="Profile" class="rounded-circle" width="70px"
        height="70px">
        </div>
        <div class="m-3">
        <h6 style="font-weight: bold;">
        ${user.fName} ${user.lName}
      </h6>
      <p>
      ${user.job}
      <p>${new Date().toLocaleString()}
      </p>
      </p>
      </div>
      
      </div>
      
      <div style="width: 100%; height: 70%;">
      <p>${MyPost.postContent}</p>
      </div>
      <hr class="mt-3">
      <div class="btn-group" role="group" aria-label="Basic outlined example">
      <a type="button" class="btn btn-outline-primary btn-md"(click)="AddLike(Post.id,Post.userId)" >
      <i class="fa-regular fa-thumbs-up"></i>
      0 Like</a>
      <a type="button" class="btn btn-outline-primary btn-md" (click)="showComment(Post.id)"><i
      class="fa-solid fa-comment"></i> Comment</a>
      <a type="button" class="btn btn-outline-primary btn-md"><i class="fa-sharp fa-share"></i> Share</a>
      </div>`     
       }
       else
       {
        p.innerHTML += `<div class="card-body mb-2" style=" background-color: white;">
        
        <div class="d-flex m-3">
        
        <div class="m-3">
        
        <img src="https://localhost:7223/images/${user.image}" alt="Profile" class="rounded-circle" width="70px"
        height="70px">
        </div>
        <div class="m-3">
        <h6 style="font-weight: bold;">
        ${user.fName} ${user.lName}
      </h6>
      <p>
      ${user.job}
      <p>${new Date().toLocaleString()}
      </p>
      </p>
      </div>
      
      </div>
      
      <div style="width: 100%; height: 70%;">
      <p>${MyPost.postContent}</p>
      <img src="https://localhost:7223/postImages/${MyPost.file?.name}" alt="Profile"width="100%" height="50%">
      </div>
      <hr class="mt-3">
      <div class="btn-group" role="group" aria-label="Basic outlined example">
      <a type="button" class="btn btn-outline-primary btn-md"(click)="AddLike(Post.id,Post.userId)" >
      <i class="fa-regular fa-thumbs-up"></i>
      0 Like</a>
      <a type="button" class="btn btn-outline-primary btn-md" (click)="showComment(Post.id)"><i
      class="fa-solid fa-comment"></i> Comment</a>
      <a type="button" class="btn btn-outline-primary btn-md"><i class="fa-sharp fa-share"></i> Share</a>
      </div>`
       }
      console.log(p)
      Mydiv1?.appendChild(p)
      
    console.log(Mydiv1)
    })
}

askServerListener(){
    
}



PostAdded(user:string){
    
      console.log(user);
      
  }




// Start Like Services
  StartLikeConnection(){
    this.hubconnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7223/LikeNotifyHub",
    {
        skipNegotiation : true ,
         transport:signalR.HttpTransportType.WebSockets
    }).configureLogging(signalR.LogLevel.Debug).build();

    this.hubconnection.start().then(()=>{
        console.log("Hello Marwa Connection")
    }).catch(err => console.log(err))
  }
  user:any
  post:any
// HomeLinkedinComponent
async likeNotify(id:number){
//  self.renderer
    // this.Mypost = post;
    // this.Myuserid = id;
var x ;
var y ;
 this.hubconnection.invoke("NewLike",id)
await this.hubconnection.on('LikeAdded',async function(likeNum){
  console.log(likeNum);
  y = likeNum
  console.log(y)
  var Mylike = document.getElementById("likepost"+id);
  var text = document.createTextNode(`${likeNum}`);
  var text1 = document.createElement('span');
  text1.innerHTML+=`${likeNum}`
  console.log(Mylike);
  Mylike!.innerHTML=`<i id="Likeicon" class="fa-regular fa-thumbs-up"></i> ${likeNum}  Like`
  console.log(Mylike);
}
)
console.log(x)
console.log(y)
}
}