using Microsoft.EntityFrameworkCore;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class SharedPostRepository : ISharedPostRepository
    {
        Context context;
        public SharedPostRepository(Context _conext)
        {
            context = _conext;
        }
        public void Add(SharedPostDTO Post)
        {
            SharedPost sharedPost = new SharedPost();
            sharedPost.UserId = Post.UserId;
            sharedPost.PostId = Post.PostId;
            context.Add(sharedPost);
            context.SaveChanges();
        }

        public List<SharedPost> GetAllShared()
        {
            return context.SharedPosts.Include(u=>u.User)
                .Include(s=>s.Post)
                .ThenInclude(u=>u.User)
                .ToList();
        }

        public List<SharedPost> GetByUserId(string UserID)
        {
            return context.SharedPosts
                .Where(s => s.UserId == UserID)
                .ToList();
        }
    }
}
