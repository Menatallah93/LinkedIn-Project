using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Web.Http.Cors;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;
namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]

    public class Search : ControllerBase
    {
        public Context Context { get; set; }
        public Search(Context _context)
        {
            Context = _context;
        }
        [HttpGet("GetUser")]
        public IActionResult SearchUsers(string name)
        {
           return Ok( Context.Users.Where(u=>u.FName.Contains(name)|| u.LName.Contains(name) || u.FullName.Contains(name)).ToList());
        }
    }
}
