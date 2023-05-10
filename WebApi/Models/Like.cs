using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_Angular_Proj.Models
{
    public class Like
    {
        public int Id { get; set; }
        //public virtual Post? post { get; set; }
        [ForeignKey("post")]
        public int PostId { get; set; }
        public string typeContent { get; set; }
        //public virtual User? User { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
    }
}
