using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface ILikeRepository
    {
        public List<Like> GetLikes(int PostId);
        public void AddLike(Like like);
        //public void UpdateComment(int CommentId, string CommentContent);
        public void DeleteLike(int postId, string userId);
    }
}
