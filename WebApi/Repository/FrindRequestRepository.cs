using Azure.Core;
using System.Linq;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class FrindRequestRepository : IFrindRequestRepository
    {
        Context Context;

        public FrindRequestRepository(Context _context)
        {
            Context = _context;
        }

        public void SendRequest(RequestDTO request)
        {
            Requests Request = new Requests
            {
                FromId = request.FromId,
                ToId = request.ToId,
                Date = DateTime.Now,
                status = "Pendding",
                IsSeen = false,
            };

            Context.Requests.Add(Request);
            Context.SaveChanges();
        }
        public void AcceptRequest(string FromId, string ToId)
        {
            Requests Request = Context.Requests
                .FirstOrDefault(r => r.FromId == FromId && r.ToId == ToId && r.status == "Pendding");
            Request.status = "Accept";
            Context.SaveChanges();
        }
        public void RejectRequest(string FromId, string ToId)
        {
            Requests Request = Context.Requests
                .FirstOrDefault(r => r.FromId == FromId && r.ToId == ToId && r.status == "Pendding");
            Request.status = "Rejected";
            Context.SaveChanges();
        }

        public List<User> GetAllRequests(string id)
        {
            List<User> requests = Context.Requests
            .Where(e => e.ToId == id && e.status == "Pendding")
            .Select(u => u.FromUser)
            .ToList();
            foreach (var req in Context.Requests
                .Where(e => e.ToId == id && e.status == "Pendding")
                .ToList())
            {
                req.IsSeen = true;
            }
            Context.SaveChanges();
            return requests;
        }

        public int GetNewRequestCount(string id)
        {
            return Context.Requests.Count(c => c.IsSeen == false && c.ToId == id);
        }

        public bool CheckFrind(string FromId, string ToID)
        {
            Requests req = Context.Requests.
                FirstOrDefault(r => ((r.FromId == FromId && r.ToId == ToID) ||
                (r.FromId == ToID && r.ToId == FromId)) && r.status == "Accept");
            if (req == null) return false;
            return true;
        }
        public bool CheckRejectRequest(string FromId, string ToID)
        {
            Requests req = Context.Requests.
                FirstOrDefault(r => ((r.FromId == FromId && r.ToId == ToID) ||
                (r.FromId == ToID && r.ToId == FromId)) && r.status == "Rejected");
            if (req == null) return false;
            return true;
        }

        public bool CheckPenddingRequest(string FromId, string ToID)
        {
            Requests req = Context.Requests.
                FirstOrDefault(r => (r.FromId == FromId && r.ToId == ToID) && r.status == "Pendding");
            if (req == null) return false;
            return true;
        }

        public void CancelRequest(string FromId, string ToID)
        {
            Requests req = Context.Requests.
                FirstOrDefault(r => (r.FromId == FromId && r.ToId == ToID) && r.status == "Pendding");
            Context.Requests.Remove(req);
            Context.SaveChanges();
        }

        public List<User> GetFriends(string id)
        {
            List<User> Friends = new List<User>();
            List<User> FromFriends = Context.Requests
                .Where(r => r.FromId == id && r.status == "Accept")
                .Select(r => r.ToUser).ToList();
            List<User> ToFriends = Context.Requests
                .Where(r => r.ToId == id && r.status == "Accept")
                .Select(r => r.FromUser).ToList(); ;
            Friends = FromFriends.Concat(ToFriends).ToList();

            return Friends;
        }
    }
}
