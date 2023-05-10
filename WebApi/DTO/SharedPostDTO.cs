using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.DTO
{
    public class SharedPostDTO
    {
        public int? Id { get; set; }
        public string UserId { get; set; }

        public Post? Post { get; set; }
        public int PostId { get; set; }
        public virtual User? User { get; set; }

        public bool? showComment { get; set; }

    }
}
