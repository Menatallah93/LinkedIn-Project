using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface ISharedPostRepository
    {
        public void Add(SharedPostDTO Post);
        public List<SharedPost> GetAllShared();
        public List<SharedPost> GetByUserId(string UserId);
    }
}
