using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface IsharedCommentRepositry
    {
        public List<sharedcommentcs> GetComments(int sharedpost);
        public void AddComment(CommentDTO Comment);
        public void UpdateComment(int CommentId, string CommentContent);
        public void DeleteComment(int CommentId);
    }
}
