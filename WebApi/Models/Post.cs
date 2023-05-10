using System.ComponentModel.DataAnnotations.Schema;
using WebApi_Angular_Proj.Models;

namespace WebApplication1.Models
{
    public class Post
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public string PostContent { get; set; }

        public string? File { get; set; }

        public int Like { get; set; }
        public DateTime Created { get; set; }
        public bool ShowComment { get; set; }
      
        public virtual User User { get; set; }
    }
}
