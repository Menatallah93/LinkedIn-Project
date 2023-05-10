using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Hubs
{
    public class LikeNotifyHub : Hub
    {
        public Context Context { get; }
        private readonly UserManager<ApplicationUser> _userManager;
        public LikeNotifyHub(UserManager<ApplicationUser> userManager, Context context)
        {
            _userManager = userManager;
            Context = context;
        }

        public void NewLike(int post)
        {
            //var MyUser = Context.Users.FirstOrDefault(p => p.Id == id);
            int likes = Context.Posts.FirstOrDefault(p => p.Id == post).Like;
            Clients.All.SendAsync("LikeAdded", likes);

        }



        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}
