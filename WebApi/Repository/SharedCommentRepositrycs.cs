using Microsoft.EntityFrameworkCore;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class SharedCommentRepositrycs : IsharedCommentRepositry
    {
        Context Context;
        public SharedCommentRepositrycs(Context _context)
        {
            Context = _context;
        }

        public void AddComment(CommentDTO CommentDTO)
        {
            sharedcommentcs Comment = new sharedcommentcs();
            Comment.date = DateTime.Now;
            Comment.SharedPostid = CommentDTO.PostId;
            Comment.Content = CommentDTO.CommentContent;
            Comment.UserId = CommentDTO.UserId;
            Comment.Updated = false;

            Context.sharedcommentcs.Add(Comment);
            Context.SaveChanges();
        }

        public void DeleteComment(int CommentId)
        {
            sharedcommentcs Comment = Context.sharedcommentcs.FirstOrDefault(c => c.Id == CommentId);
            Context.sharedcommentcs.Remove(Comment);
            Context.SaveChanges();
        }

        public List<sharedcommentcs> GetComments(int PostId)
        {
            return Context.sharedcommentcs.Include(e => e.User)
                .Where(c => c.SharedPostid == PostId)
                .ToList();
        }

        public void UpdateComment(int CommentId, string CommentContent)
        {
            sharedcommentcs Comment = Context.sharedcommentcs.FirstOrDefault(c => c.Id == CommentId);
            Comment.Content = CommentContent;
            Comment.Updated = true;
            Context.SaveChanges();
        }
    }
}
