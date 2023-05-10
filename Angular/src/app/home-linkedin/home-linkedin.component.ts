import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { PostServiceService } from '../Services/post-service.service';
import { CommentservicesService } from '../Services/comment.service';
import { IComment, ICreateComment } from '../Shared-Interface/IComment';
import { FormBuilder, Validators } from '@angular/forms';
import { valueOrDefault } from 'src/assets/vendor/chart.js/helpers';
import { Ilike } from '../Shared-Interface/ILike';
import { interval, lastValueFrom, take } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../Shared-Interface/IUser';
import { SignalRsService } from '../Services/SignalR.service';
import { AuthorizeService } from '../Services/authorize.service';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { LikeService } from '../Services/LikeService';
import { FrindRequstService } from '../Services/frind-requst.service';
import { ICreateSharedPost, ISharedPost } from '../Shared-Interface/ISharedPost';
import { async } from '@angular/core/testing';
import { SharedPost } from '../Services/SharedPost.service';
import { SharedCommentservicesService } from '../Services/SharedComment.service';
import { ISharedComment } from '../Shared-Interface/ISharedComment';

@Component({
  selector: 'app-home-linkedin',
  templateUrl: './home-linkedin.component.html',
  styleUrls: ['./home-linkedin.component.scss'],
})

export class HomeLinkedinComponent implements OnInit {
  @ViewChild('postsDiv') postsDiv!: ElementRef;
  selectedPostfile!: File;
  myImage: string = "https://localhost:7223/images/";

  Mydiv!: HTMLDivElement | null;
  commentUser!: IUser
  sharedCommentUser!:IUser

  constructor(private renderer: Renderer2, private LikeService: LikeService, private Auth: AuthorizeService
    , public signalRService: SignalRsService, private fb: FormBuilder,
    private _PostService: PostServiceService,
    private _CommentService: CommentservicesService,
    private router: Router, private FriendsRequest: FrindRequstService,
    private SharedPostService: SharedPost,
    private _sharesComment: SharedCommentservicesService) {

  }

  Posts: IPost[] = [];
  SharedPosts: ISharedPost[] = []
  Comments: IComment[] = [];
  ShareComment: ISharedComment[] = [];
  Error: any;
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

  IsShowen: boolean = false;
  private hubConnectionBuilder!: HubConnection;
  private hubConnectionPost!: HubConnection;
  private hubConnectionBuilderShare!: HubConnection;
  private hubConnectionBuilderCommentShare!: HubConnection;


  PostID: Number = 0;
  Friends: IUser[] = [];
  SharedUser!: IUser
  UserName!: string;
  sharedComment!: ISharedComment


  CreatePostForm = this.fb.group({
    userId: [''],
    postContent: ['', Validators.required],
    image: [''],
  });

  CreateComment = this.fb.group({
    postId: [''],
    commentContent: ['', Validators.required]
  })

  file!: File
  Post: ICreatePost = {
    userId: this.Auth.gettokenID(),
    postContent: "",
    file: this.file
  }
  SharedUserID!: string
  SharedPostUser!: IUser

  SharePost: ISharedPost = {
    id: 0,
    userId: this.Auth.gettokenID(),
    post: {
      id: 0,
      userId: this.SharedUserID,
      postContent: "",
      user: this.SharedPostUser,
      file: ""
    },
    postId: 0
  }

  Keroo: ICreateSharedPost = {
    userId: '',
    postId: 0,
    id: 0
  };

  async SharedPost(Post: IPost) {
    this.SharePost.post = Post;
    this.SharePost.postId = Post.id
    this.SharePost.user = Post.user
    console.log(Post.id)
    var obj = this
    this.Keroo.userId = this.Auth.gettokenID();
    this.Keroo.postId = Post.id;
    console.log(this.Keroo.userId)
    console.log(this.Keroo.postId)
    this.SharedPostService.CreatePost(this.Keroo).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    });
    this.hubConnectionBuilderShare.invoke('NewSharePost', this.SharePost);
    
     this.hubConnectionBuilderShare.on('PostShareNotify', function(post) {
      console.log(obj.SharePost);
      const element: HTMLElement = document.getElementById("SharedPostAppend") as HTMLElement;
      console.log("Marwa")
      
   if(post.post.file!=null)
   {
        element.innerHTML +=
          `
          <div class="card recent-sales overflow-auto" >
          <div class="d-flex m-2">

            <div class="m-1" style="cursor: pointer;">

              <img src="https://localhost:7223/images/${obj.CurrentUser.image}" alt="Profile" class="rounded-circle" width="70px"
                height="70px">
            </div>
            <div class="m-3">
              <h3 style="font-weight: bold;">
                ${obj.CurrentUser.fullName}
              </h3>
              <p style="font-size: 12px;">
              ${obj.CurrentUser.job}
               
              </p>
            </div>

          </div>


          <div style="width: 50vw; margin-left: 10px;">
            <div class="border">
                <div class="d-flex  m-3">

                  <div class="m-1" (click)="showProfile(Post.userId)" style="cursor: pointer;">
                    <img src="https://localhost:7223/images/${post.user?.image}" alt="Profile" class="rounded-circle" width="50px"
                      height="50px">
                  </div>
                  <div class="m-3">
                    <h4 style="font-weight: bold;">
                      ${post.user.fullName}
                    </h4>
                    <p>
                      ${post.user.job}
                      <br>
                      ${post.post.created}
                    </p>
                  </div>

                </div>


                <div style="width: 100%; height: 70%;">
                  <p style="font-size: 25px; padding-left: 20px;">${post.post.postContent}</p>
                  <img  src="https://localhost:7223/postImages/${post.post.file}" alt="Profile" width="100%" height="50%">
                </div>
          </div>


          <hr class="mt-3">
          <div class="btn-group mb-4" style="margin-left: 10px;" role="group" aria-label="Basic outlined example">
            <a type="button" id="likepost${post.id}" class="btn btn-outline-primary btn-md"
            (click)="AddLike(${post.id})">
              <i id="Likeicon" class="fa-regular fa-thumbs-up"></i>
              ${post.like} Like</a>
            <a type="button" class="btn btn-outline-primary btn-md" (click)="showSharedComment(${post})"><i
              class="fa-solid fa-comment"></i> Comment</a>
            <a type="button" class="btn btn-outline-primary btn-md" (click)="SharedPost(${post})"><i
              class="fa-sharp fa-share"></i> Share</a>
          </div>
          </div>
         

        </div>
        `
   }
   else
   {
    element.innerHTML +=
      `
      <div class="card recent-sales overflow-auto" >
      <div class="d-flex m-2">

        <div class="m-1" style="cursor: pointer;">

          <img src="https://localhost:7223/images/${obj.CurrentUser.image}" alt="Profile" class="rounded-circle" width="70px"
            height="70px">
        </div>
        <div class="m-3">
          <h3 style="font-weight: bold;">
            ${obj.CurrentUser.fName}
          </h3>
          <p style="font-size: 12px;">
          ${obj.CurrentUser.job}
           
          </p>
        </div>

      </div>


      <div style="width: 50vw; margin-left: 10px;">
        <div class="border">
            <div class="d-flex  m-3">

              <div class="m-1" (click)="showProfile(${post.post.userId})" style="cursor: pointer;">
                <img src="https://localhost:7223/images/${post.user?.image}" alt="Profile" class="rounded-circle" width="50px"
                  height="50px">
              </div>
              <div class="m-3">
                <h4 style="font-weight: bold;">
                  ${post.user.fName}
                </h4>
                <p>
                  ${post.user.job}
                  <br>
                  ${post.post.created}
                </p>
              </div>

            </div>


            <div style="width: 100%; height: 70%;">
              <p style="font-size: 25px; padding-left: 20px;">${post.post.postContent}</p>
            </div>
      </div>


      <hr class="mt-3">
      <div class="btn-group mb-4" style="margin-left: 10px;" role="group" aria-label="Basic outlined example">
        <a type="button" id="likepost${post.id}" class="btn btn-outline-primary btn-md"
        (click)="AddLike(${post.id})">
          <i id="Likeicon" class="fa-regular fa-thumbs-up"></i>
          ${post.like} Like</a>
        <a type="button" class="btn btn-outline-primary btn-md" (click)="showSharedComment(${post})"><i
          class="fa-solid fa-comment"></i> Comment</a>
        <a type="button" class="btn btn-outline-primary btn-md" (click)="SharedPost(${post})"><i
          class="fa-sharp fa-share"></i> Share</a>
      </div>
      </div>
     

    </div>
    `
}
        console.log(element)
        console.log(post)
      }
    )
  }

  // this.CreateComment.get("commentContent")?.value
  Comment: ICreateComment = {
    userId: this.Auth.gettokenID(),
    postId: 0,
    commentContent: ""
  }

  like: Ilike = {
    userId: this.Auth.gettokenID(),
    typeContent: "Post",
    postId: 0
  }

  async ngOnInit() {


    this.signalRService.StartPostConnection();

    this._PostService.GetCurrentUser(this.SharedUserID).subscribe({
      next: User => this.SharedPostUser = User
    })
    this.UserName = this.Auth.getName()
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    this.SharedPostService.GetSharedPost().subscribe({
      next: data => console.log(data),
     
      error: err => this.Error = err,
    })
    console.log(this.Posts);


    this._PostService.GetCurrentUser(this.Auth.gettokenID()).subscribe({
      next: User => {
        this.CurrentUser = User
        console.log(this.CurrentUser.image)
        this.CurrentUser = User
      },
      error: err => console.log(err)
    });
    console.log(this.CurrentUser)


    this._PostService.GetCurrentUser(this.SharedUserID).subscribe({
      next: User => this.SharedPostUser = User
    })



    this.UserName = this.Auth.getName()
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    console.log(this.Posts);

    this._PostService.GetSharedPost().subscribe({
      next: data => this.SharedPosts = data,
      error: err => console.log(err)
    })

    ///// SignalR For Post
    this.hubConnectionPost = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/Posthub', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).configureLogging(signalR.LogLevel.Debug).build();


    //////SignalR For Comment in Share Posts
    this.hubConnectionBuilderCommentShare = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/CommentHub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilderCommentShare.start().then(() => {
        console.log("connection CommentShare  started");
      }).catch(err => console.log(err));
    }, 2000);


    ////// SignalR For Share Post
    this.hubConnectionBuilderShare = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/Posthub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilderShare.start().then(() => {
        console.log("connection sharepost started");
      }).catch(err => console.log(err));
    }, 2000);


    //// SignalR For Comment in Posts
    this.hubConnectionBuilder = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/Commenthub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilder.start().then(() => {
        console.log("connection comment started");
      }).catch(err => console.log(err));
    }, 2000);

    this._PostService.GetSharedPost().subscribe({
      next: data => this.SharedPosts = data,
      error: err => console.log(err)
    })

    this.FriendsRequest.GetFriends(this.Auth.gettokenID()).subscribe({
      next: data => this.Friends = data,
      error: err => console.log(err)
    })

  }
  Showchat() {
    this.router.navigate(["/chat"]);


  }



  async CreatePost() {
    var formPost: any = new FormData()
    formPost.append("userId", this.Post.userId)
    formPost.append("postContent", this.Post.postContent)

    if (this.Post.file != null) {
      formPost.append("image", this.Post.file, this.Post.file.name)
    }

    console.log(formPost.get("image"))
    this._PostService.CreatePost(formPost).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
    await this.addElement();

    
  }

  async addElement() {
    setTimeout(async () => {
      var formPost2: any = new FormData()
      formPost2.append("userId", this.Post.userId)
      formPost2.append("postContent", this.Post.postContent)
      if (this.Post.file != null) {
        formPost2.append("image", this.Post.file, this.Post.file.name)
      }

      await this.signalRService.askServer(formPost2, this.Post, this.CurrentUser, this.Auth.gettokenID())
    }, 1000);



    // await this.signalRService.StartPostConnection();

    // setTimeout(async () => {
    //   await this.signalRService.askServer(this.Post, this.CurrentUser, this.Auth.gettokenID())
    // }, 2000);


  }


  GetCurrentUsers(id: string) {
    this._PostService.GetCurrentUser(id).subscribe({
      next: data => { this.CurrentUser = data, console.log(data) },

      error: err => console.log(err),
    })
  }

  showComments(Post: IPost): void {
    this._CommentService.GetComment(Post.id).subscribe({
      next: data => this.Comments = data,
      error: err => this.Error = err,
    })
    this.CreateComment.get("commentContent")?.setValue("");
    Post.showComment = !Post.showComment;
    console.log(this.Comments)
  }

  showSharedComment(Post: ISharedPost): void {

    this._sharesComment.GetComment(Post.id).subscribe({
      next: data => {
        // this.ShareComment =
        this.ShareComment = data,
          console.log(data)
      },
      error: err => console.log(err),
    })
    Post.showComment = !Post.showComment;
    this.CreateComment.get("commentContent")?.setValue("");
  }

  // selectedFile!:File
  onSelectFile(fileInput: any) {

    this.Post.file = <File>fileInput.target.files[0];
    console.log(this.Post.file)
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    const inputElement: HTMLInputElement = document.getElementById('formFile') as HTMLInputElement

    inputElement.files = dataTransfer.files;


  }


  async CreateCommentFunc(PostId: number) {
    this.Comment.postId = PostId
    this._CommentService.CreateComment(this.Comment).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })

    var user = this.CurrentUser
    this.PostID = PostId;
    this.hubConnectionBuilder.invoke('NewCommentAdded', this.Comment);
    this.hubConnectionBuilder.off('NewCommentNotify')
    this.hubConnectionBuilder.on('NewCommentNotify', async (Cot) => {

     await this._PostService.GetCurrentUser(Cot.userId).subscribe({
        next: User => {
          this.commentUser = User,
          console.log(this.commentUser)
        },
        error: err => console.log(err)
      });

      console.log("MArina");
      const element: HTMLElement = document.getElementById("CreateCommentSignalR") as HTMLElement;
      element.innerHTML +=


        `
        <div class="d-flex">
        <div class="m-3">

                      <img src="https://localhost:7223/images/${this.commentUser.image}" alt="Profile" class="rounded-circle" width="50px"
                        height="50px">
                    </div>

                    <div class="m-3 lh-2" style="padding-top: 10px; background-color: lightgrey; border-radius: 5px 20px 20px 15px; width: 50vw; padding-left: 10px;">
                      <span style="font-size: 18px; font-weight: bold;">${this.commentUser.fullName}</span>
                      <br>
                      ${this.commentUser.job}
                    
                      <br>
                      <p>${Cot.commentContent}</p>

                    </div>
                    </div>
                    `



    });

  }


  async CreatesharedCommentFunc(postId: number) {
    var self = this;
    this.Comment.postId = postId
    this._sharesComment.CreateSharedComment(this.Comment).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
    
    console.log(self.CurrentUser.image)
    this.PostID = postId;
    this.hubConnectionBuilder.invoke('NewShareCommentAdded', this.Comment);
    this.hubConnectionBuilder.off('NewshareCommentNotify'),
      await this.hubConnectionBuilder.on('NewshareCommentNotify',async (Cot) =>{
        
        await  this.SharedPostService.GetCurrentUser(Cot.userId).subscribe({
          next: data => {
            this.sharedCommentUser = data,
            console.log(this.sharedCommentUser)
          },
          error: err => console.log(err)
        });


        console.log("nour");
        const element: HTMLElement = document.getElementById("CreateCommentSharedSignalR") as HTMLElement;
        element.innerHTML +=

          ` <div class="d-flex">
          <div class="m-3">
  
                        <img src="https://localhost:7223/images/${this.sharedCommentUser.image}" alt="Profile" class="rounded-circle" width="50px"
                          height="50px">
                      </div>
  
                      <div class="m-3 lh-2" style="padding-top: 10px; background-color: lightgrey; border-radius: 5px 20px 20px 15px; width: 50vw; padding-left: 10px;">
                        <span style="font-size: 18px; font-weight: bold;">${this.sharedCommentUser.fullName}</span>
                        <br>
                        ${this.sharedCommentUser.job}
                      
                        <br>
                        <p>${Cot.commentContent}</p>
  
                      </div>
                      </div>`



      });
  }


  showProfile(userId?: string) {
    this.router.navigate(["/profile", userId]);
  }

  //////////////////// Start Like Functions 
  checked!: boolean
  async AddLike(PostId: number) {
    var service = this.LikeService;
    var tempLike = this.like;
    var signal = this.signalRService
    var UserId = this.Auth.gettokenID()
    tempLike.postId = PostId
    tempLike.userId = UserId
    tempLike.typeContent = "Post"
    var checks: any
    async function addNotify() {
      await signal.StartLikeConnection();
      setTimeout(async () => {

        await signal.likeNotify(PostId)
      }, 1000)
    }
    // addNotify()
    async function name(PostId: number, user: string) {
      let status
      return await service.checkLike(PostId, user).then(val => { console.log(val), checks = val });
    }
    async function execute() {


      const source$ = interval(1000)
        .pipe(take(1));
      const finalNumber = await lastValueFrom(source$);
      console.log(service.status)
      console.log(`The final number is ${finalNumber}`);
      if (!service.status) {

        service.createLike(tempLike).subscribe({
          next: data => console.log(data),
          error: err => console.log(err),
        })
        // addNotify()
      } else {
        service.deleteLike(PostId, UserId).subscribe({
          next: data => console.log(data),
          error: err => console.log(err),
        })
        // addNotify()
      }
    };
    async function ready() {
      name(PostId, UserId)
      await execute();
      addNotify()
    }
    ready()
    this.like.postId = PostId
    this.like.userId = UserId
    this.like.typeContent = "Post"
    console.log(PostId)
    // console.log(name(PostId, user))
    console.log(UserId)
    console.log(this.like)
    console.log(this.LikeService.status)
    console.log(checks)
  }

}
