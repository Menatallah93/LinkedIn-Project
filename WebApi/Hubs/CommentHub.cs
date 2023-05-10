
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using System.Text;
using WebApi_Angular_Proj.Models;
using WebApi_Angular_Proj.DTO;

namespace WebApi_Angular_Proj.Hubs
{
    public class CommentHub : Hub
    {
        public async Task NewCommentAdded(CommentDTO comment)
        {
            await Clients.All.SendAsync("NewCommentNotify", comment);
        }

        public void NewShareCommentAdded(CommentDTO comment)
        {
            Clients.All.SendAsync("NewshareCommentNotify", comment);
        }

    }
}