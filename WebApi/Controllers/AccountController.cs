
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http.Cors;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class AccountController : ControllerBase
    {
        //api/Account/register
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration config;

        public Context Context { get; }

        public AccountController(UserManager<ApplicationUser> userManager, IConfiguration config, Context context)
        {
            this.userManager = userManager;
            this.config = config;
            Context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Result>> RegisterAsync([FromForm] RegisterDTO registerDTO)
        {

            if (ModelState.IsValid)
            {
                ApplicationUser newUsr = new ApplicationUser();

                newUsr.Email = registerDTO.Email;
                newUsr.UserName = registerDTO.UserName;

                IdentityResult result = await userManager.CreateAsync(newUsr, registerDTO.Password);
                Result result1 = new Result();

                if (result.Succeeded)
                {
                    User usr = new User();

                    usr.Id = newUsr.Id;
                    usr.Address = registerDTO.Address;
                    usr.LName = registerDTO.LName;
                    usr.FName = registerDTO.FName;
                    usr.Image = ImagesHelper.UploadImg(registerDTO.Image, "images");
                    Context.Users.Add(usr);
                    Context.SaveChanges();
                    result1.Message = "sucess";
                    result1.IsPass = true;
                    result1.Data = usr.FName;
                    return Ok(result1);
                }
                else
                {
                    result1.Message = "the register failed";
                    result1.IsPass = false;
                    return BadRequest(result1);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<Result>> LoginAsync(LoginDTO loginDTO)
        {

            if (ModelState.IsValid)
            {
                ApplicationUser Usr = await userManager.FindByNameAsync(loginDTO.UserName);
                if (Usr != null && await userManager.CheckPasswordAsync(Usr, loginDTO.Password))
                {


                    List<Claim> myClaims = new List<Claim>();

                    myClaims.Add(new Claim(ClaimTypes.NameIdentifier, Usr.Id));
                    myClaims.Add(new Claim(ClaimTypes.Name, Usr.UserName));
                    myClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                    var authSecritKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:SecuriytKey"]));

                    SigningCredentials credentials =
                        new SigningCredentials(authSecritKey, SecurityAlgorithms.HmacSha256);



                    JwtSecurityToken jtw = new JwtSecurityToken
                        (
                            issuer: "ValidIss",
                            audience: "ValidAud",
                            expires: DateTime.Now.AddHours(0.5),
                            claims: myClaims,
                            signingCredentials: credentials
                        );
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(jtw),
                        expiration = jtw.ValidTo,
                        message = "sucesss"
                    }); ;

                }
                Result result = new Result();
                result.Message = "failed";
                return BadRequest(result);
            }

            return BadRequest(ModelState);
        }
    }


}
