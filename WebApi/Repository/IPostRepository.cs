using WebApi_Angular_Proj.DTO;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface IPostRepository
    {
        public List<Post> GetPostsByUser(string Id);
        public List<Post> GetAllPosts();
        public void updatePostWhenLikeCreated(int postId);
        public void updatePostWhenLikeDeleted(int postId);
        public void CreatePost(CreatePostDTO PostDTO);
        public Post GetByPostId(int Id);
    }
}
