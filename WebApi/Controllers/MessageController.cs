using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http.Cors;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApi_Angular_Proj.Repository;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]

    public class MessageController : ControllerBase
    {
        IMessageRepository MessageRepo;
        public MessageController(IMessageRepository _Message) 
        {
            MessageRepo = _Message;
        }
        [HttpPost("AddMessage")]
        public IActionResult AddMessage(MessageDTO Msg)
        {
            MessageRepo.AddMessage(Msg);
            return Ok();
        }
        [HttpGet("GetMessages")]
        public IActionResult GetMessages([FromQuery] RequestDTO UserMessage)
        {

            return Ok(MessageRepo.GetAllMessages(UserMessage));
        }
    }
}
