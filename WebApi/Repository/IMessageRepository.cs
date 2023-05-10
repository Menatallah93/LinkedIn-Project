using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface IMessageRepository
    {
        public void AddMessage(MessageDTO messageDTO);

        public List<Message> GetAllMessages(RequestDTO userMessages);
       
    }
}
