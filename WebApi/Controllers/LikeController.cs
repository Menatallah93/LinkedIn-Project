using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi_Angular_Proj.Models;
using WebApi_Angular_Proj.Repository;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        ILikeRepository likeRepository;
        IPostRepository postRepository;
        public LikeController(ILikeRepository likeRepository,
            IPostRepository postRepository)
        {
            this.likeRepository = likeRepository;
            this.postRepository = postRepository;
        }
        [HttpPost]
        public IActionResult AddLike(Like like)
        {
            likeRepository.AddLike(like);
            int id = like.PostId;
            postRepository.updatePostWhenLikeCreated(id);
            return Ok("Does");
        }

        [HttpGet]
        public IActionResult checkLikeExist(int postId, string userId)
        {
            List<Like> likeList = new List<Like>();
            likeList = likeRepository.GetLikes(postId);
            Boolean check = false;
            foreach (Like like in likeList)
            {
                if (like.UserId == userId)
                {
                    check = true;
                    return Ok(check);
                }
            }
            return Ok(check);
        }
        [HttpDelete]
        public IActionResult DeleteLike(int postId, string userId)
        {
            likeRepository.DeleteLike(postId, userId);
            postRepository.updatePostWhenLikeDeleted(postId);
            return Ok("Deleted");
        }

        [HttpGet("{PostId:int}")]
        public IActionResult GetAllLikesInPost(int PostId)
        {

            return Ok(likeRepository.GetLikes(PostId));
        }
    }
}
