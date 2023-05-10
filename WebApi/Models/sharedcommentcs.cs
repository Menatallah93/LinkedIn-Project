using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_Angular_Proj.Models
{
    public class sharedcommentcs
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        [ForeignKey("SharedPost")]
        public int SharedPostid { get; set; }
        public string Content { get; set; }
        public DateTime date { get; set; }
        public int? Likes { get; set; }

        public bool? Updated { get; set; } = false;

        public virtual SharedPost? SharedPost { get; set; }
        public virtual User? User { get; set; }
    }
}
