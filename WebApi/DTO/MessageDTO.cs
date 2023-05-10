namespace WebApi_Angular_Proj.DTO
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public string TextMessage { get; set; }
    }
}
