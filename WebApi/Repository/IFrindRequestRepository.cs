using Microsoft.EntityFrameworkCore.Query.Internal;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface IFrindRequestRepository
    {
        public void SendRequest(RequestDTO request);
        public void AcceptRequest(string UserId, string FrindId);
        public void RejectRequest(string UserId, string FrindId);
        public List<User> GetAllRequests(string id);
        public List<User> GetFriends (string id);
        public int GetNewRequestCount(string id);
        public bool CheckFrind(string FromId , string ToID);
        public bool CheckRejectRequest(string FromId , string ToID);
        public bool CheckPenddingRequest(string FromId , string ToID);
        public void CancelRequest(string FromId , string ToID);

    }
}
