using Microsoft.EntityFrameworkCore;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class PostRepository : IPostRepository
    {
        Context Context;
        public PostRepository(Context _context)
        {
            Context = _context;
        }
        public void CreatePost(CreatePostDTO PostDTO)
        {
            
            Post Post = new Post();
            Post.UserId = PostDTO.UserId;
            Post.PostContent = PostDTO.PostContent;
            Post.Like = 0;
            Post.Created = DateTime.Now;
             
            if(PostDTO.Image != null) 
            { 
                Post.File  = ImagesHelper.UploadImg(PostDTO.Image, "postImages");
            }

            Context.Posts.Add(Post);
            Context.SaveChanges();
        }

        public void updatePostWhenLikeCreated(int postId)
        {
            Post post =
            Context.Posts.FirstOrDefault(p => p.Id == postId);
            post.Like += 1;
            Context.Update(post);
            Context.SaveChanges();
        }
        public void updatePostWhenLikeDeleted(int postId)
        {
            Post post =
            Context.Posts.FirstOrDefault(p => p.Id == postId);
            post.Like -= 1;
            Context.Update(post);
            Context.SaveChanges();
        }


        public List<Post> GetAllPosts()
        {
            return Context.Posts.Include(p => p.User).ToList();
        }

        public Post GetByPostId(int Id)
        {
            return Context.Posts.FirstOrDefault(p => p.Id == Id);

        }

        public List<Post> GetPostsByUser(string Id)
        {
            return Context.Posts.Include(p => p.User).Where(p => p.UserId == Id).ToList();
        }
    
    }
}
