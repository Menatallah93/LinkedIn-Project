using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public interface IProfileUpdateRepository
    {
        List<User> GetAll();
        User GetById(string id);
        User GetByName(string name);
        void Insert(User user);
        void Update(string id, ProfileUpdateDTO user);
        void Delete(string id);
    }
}
