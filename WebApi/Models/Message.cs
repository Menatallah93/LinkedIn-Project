using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_Angular_Proj.Models
{
    public class Message
    {
        public int Id { get; set; }
        [ForeignKey("FromUser")]
        public string FromId { get; set; }
        [ForeignKey("ToUser")]
        public string ToId { get; set; }
        public string TextMessage { get; set; }
        public DateTime MessageTime { get; set; }
        public User FromUser { get; set; }
        public User ToUser { get; set; }

    }
}
