using System.ComponentModel.DataAnnotations.Schema;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Models
{
    public class SharedPost
    {
        public int Id { get; set; }
        [ForeignKey("Post")]
        public int PostId { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }

        public bool ShowComment { get; set; }

        public virtual User? User { get; set; }
        public virtual Post? Post { get; set; }
        public virtual List<sharedcommentcs>? Sharedcommentcs { get; set; }

    }
}
