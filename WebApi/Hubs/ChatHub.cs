using Microsoft.AspNetCore.SignalR;
using WebApi_Angular_Proj.DTO;

namespace WebApi_Angular_Proj.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewChatHub(MessageDTO message)
        {

            await Clients.All.SendAsync("NewMessageNotify", message);
            
        }
    }
}
