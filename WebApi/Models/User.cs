using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApi_Angular_Proj.Models
{
    public class User
    {
        [Key]
        [ForeignKey("ApplicationUser")]
        public string Id { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }


        public string? FullName { get; set; }
        public string? About { get; set; }
        public string? Company { get; set; }
        public string? job { get; set; }
        public string? Cuntry { get; set; }
        public string? Phone { get; set; }
        public string? TwitterLink { get; set; }
        public string? FacebookLink { get; set; }
        public string? InstagramLink { get; set; }
        public string? LinkedinLink { get; set; }



        [JsonIgnore]
        public virtual ApplicationUser? ApplicationUser { get; set; }
        [JsonIgnore]

        [InverseProperty("FromUser")]
        public virtual ICollection<Requests>? FromRequests { get; set; } = new List<Requests>();
        [JsonIgnore]
        [InverseProperty("ToUser")]
        public virtual ICollection<Requests>? ToRequests { get; set; } = new List<Requests>();



    }
}
