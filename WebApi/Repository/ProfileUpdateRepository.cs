using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class ProfileUpdateRepository : IProfileUpdateRepository
    {
        Context context;
        public ProfileUpdateRepository(Context context)
        {
            this.context = context;
        }

        public User GetById(string id)
        {
            return context.Users.FirstOrDefault(e => e.Id == id);
        }
        
        public void Update(string id, ProfileUpdateDTO profileUpdateDTO)
        {
            User user = GetById(id);

            user.FullName = profileUpdateDTO.FName + profileUpdateDTO.LName;
            user.FName = profileUpdateDTO.FName;
            user.LName = profileUpdateDTO.LName;
            user.About = profileUpdateDTO.About;
            user.Company = profileUpdateDTO.Company;
            user.job = profileUpdateDTO.job;
            user.Cuntry = profileUpdateDTO.Cuntry;
            user.Address = profileUpdateDTO.Address;
            user.Phone = profileUpdateDTO.Phone;
            user.TwitterLink = profileUpdateDTO.TwitterLink;
            user.FacebookLink = profileUpdateDTO.FacebookLink;
            user.InstagramLink = profileUpdateDTO.InstagramLink;
            user.LinkedinLink = profileUpdateDTO.LinkedinLink;
            user.Image= profileUpdateDTO.Image;

            context.SaveChanges();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public void Insert(User user)
        {
            throw new NotImplementedException();
        }

    
    }
}
