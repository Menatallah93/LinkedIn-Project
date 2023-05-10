namespace WebApi_Angular_Proj.DTO
{
    public class CreatePostDTO
    {
        public string UserId { get; set; }
        public IFormFile? Image { get; set; }
        public string PostContent { get; set; }
    }
}
