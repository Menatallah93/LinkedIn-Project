using WebApi_Angular_Proj.DTO;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface ICommentRepository
    {
        public List<Comment> GetComments(int PostId);
        public void AddComment(CommentDTO Comment);
        public void UpdateComment(int CommentId, string CommentContent);
        public void DeleteComment(int CommentId);

    }
}
