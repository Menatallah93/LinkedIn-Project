using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Models
{
    public class PostFiles
    {
        public int Id { get; set; }

        [ForeignKey("Post")]
        public int PostId { get; set; }

        public string? Files { get; set; }

        public virtual Post Post { get; set; }
    }
}
