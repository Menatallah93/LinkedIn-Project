using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Security.Cryptography;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;
namespace WebApi_Angular_Proj.Hubs
{
    public class FrindHub : Hub
    {


        public async Task NewRequestAdded(RequestDTO request)
        {

            await Clients.All.SendAsync("NewRequestNotify", request);
        }
        public async Task AcceptFriend(RequestDTO request)
        {
            await Clients.All.SendAsync("AppendFriendNotify", request);
        }


    }
}
