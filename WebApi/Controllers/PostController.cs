using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApi_Angular_Proj.Repository;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "https://localhost:4200/", headers: "*", methods: "*")]
    public class PostController : ControllerBase
    {
        IPostRepository PostRepository;
        ICommentRepository CommentRepository;
        ISharedPostRepository SharedPostRepo;
        public PostController(IPostRepository _PostRepository,
            ICommentRepository _CommentRepository,
            ISharedPostRepository _sharedPostRepository)
        {
            PostRepository = _PostRepository;
            CommentRepository = _CommentRepository;
            SharedPostRepo = _sharedPostRepository;
        }
        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(PostRepository.GetAllPosts());
        }

        [HttpGet("{Id}")]
        public IActionResult GetPostByUserId(string Id)
        {
            return Ok(PostRepository.GetPostsByUser(Id));
        }


        [HttpGet("{Postid:int}")]
        public IActionResult GetPostById(int Postid)
        {

            return Ok(PostRepository.GetByPostId(Postid));
        }


        [HttpPost]
        public IActionResult CreatePost([FromForm] CreatePostDTO PostDTO)
        {

            PostRepository.CreatePost(PostDTO);
            return Ok();
        }


        [HttpPost("SharePost")]
        public IActionResult CreateSharedPost(SharedPostDTO sharedPost)
        {
            SharedPostRepo.Add(sharedPost);
            return Ok();
        }

        [HttpGet("GetSharedPost")]

        public IActionResult GetSharePosts()
        {
            return Ok(SharedPostRepo.GetAllShared());
        }

        [HttpGet("GetSharedByUser/{id}")]

        public IActionResult GetSharedByUserId(string Id)
        {
            return Ok(SharedPostRepo.GetByUserId(Id));
        }

        

    }
}
