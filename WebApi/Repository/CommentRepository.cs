using Microsoft.EntityFrameworkCore;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class CommentRepository : ICommentRepository
    {
        Context Context;
        public CommentRepository(Context _context)
        {
            Context = _context;
        }

        public void AddComment(CommentDTO CommentDTO)
        {
            Comment Comment = new Comment();
            Comment.date = DateTime.Now;
            Comment.PostId = CommentDTO.PostId;
            Comment.Content = CommentDTO.CommentContent;
            Comment.UserId = CommentDTO.UserId;
            Comment.Updated = false;

            Context.Comments.Add(Comment);
            Context.SaveChanges();
        }

        public void DeleteComment(int CommentId)
        {
            Comment Comment = Context.Comments.FirstOrDefault(c => c.Id == CommentId);
            Context.Comments.Remove(Comment);
            Context.SaveChanges();
        }

        public List<Comment> GetComments(int PostId)
        {
            return Context.Comments.Include(u => u.User).Where(c => c.PostId == PostId).ToList();
        }

        public void UpdateComment(int CommentId, string CommentContent)
        {
            Comment Comment = Context.Comments.FirstOrDefault(c => c.Id == CommentId);
            Comment.Content = CommentContent;
            Comment.Updated = true;
            Context.SaveChanges();
        }
    }
}
