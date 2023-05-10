using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class LikeRepository : ILikeRepository
    {
        Context Context;
        public LikeRepository(Context _context)
        {
            Context = _context;
        }

        public void AddLike(Like like)
        {
            Context.Add(like);
            Context.SaveChanges();
        }

        public List<Like> GetLikes(int PostId)
        {
            return Context.Likes.Where(c => c.PostId == PostId).ToList();
        }

        public void DeleteLike(int postId, string userId)
        {
            Like like = Context.Likes.FirstOrDefault(c => c.PostId == postId && c.UserId == userId);
            Context.Likes.Remove(like);
            Context.SaveChanges();
        }
    }
}
