using Microsoft.EntityFrameworkCore;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class MessageRepository : IMessageRepository
    {
        Context Context { get; set; }
        public MessageRepository(Context _context)
        {
            Context = _context;
        }
        public void AddMessage(MessageDTO messageDTO)
        {
            Message NewMessage = new Message();
            NewMessage.FromId = messageDTO.FromUserId;
            NewMessage.ToId = messageDTO.ToUserId;
            NewMessage.MessageTime = DateTime.Now;
            NewMessage.TextMessage = messageDTO.TextMessage;
            Context.Messages.Add(NewMessage);
            Context.SaveChanges();
        }


        public List<Message> GetAllMessages(RequestDTO userMessages)
        {
            return Context.Messages
                .Where(s => (s.FromId == userMessages.FromId && s.ToId == userMessages.ToId)
                ||
                (s.FromId == userMessages.ToId && s.ToId == userMessages.FromId))
                .Include(u => u.FromUser).Include(u => u.ToUser)
                .ToList();
        }
    }
}
