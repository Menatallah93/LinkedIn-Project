namespace WebApi_Angular_Proj.DTO
{
    public class RegisterDTO
    {

        public string FName { get; set; }
        public string LName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string Address { get; set; }
        public IFormFile Image { get; set; }

    }
}
