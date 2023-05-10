using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebApi_Angular_Proj.Models;

namespace WebApplication1.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        [ForeignKey("post")]
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime date { get; set; }
        public int Likes { get; set; }

        public bool? Updated { get; set; } = false;

        [JsonIgnore]
        public virtual Post? post { get; set; }
        public virtual User? User { get; set; }
    }
}
