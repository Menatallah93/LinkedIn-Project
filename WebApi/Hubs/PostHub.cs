using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Cryptography;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Hubs
{
    public class PostHub : Hub
    {
        public Context Context { get; }
        private readonly UserManager<ApplicationUser> _userManager;

        public PostHub(UserManager<ApplicationUser> userManager, Context context)
        {

            _userManager = userManager;

            Context = context;

        }
        public void NewPost([FromForm] CreatePostDTO post,string id)
        {
            var MyUser = Context.Users.FirstOrDefault(p => p.Id == id);
            Clients.All.SendAsync("PostAdded", MyUser,post);

        }

        public void NewSharePost(SharedPostDTO post)
        {
            Clients.All.SendAsync("PostShareNotify", post);

        }



        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}

