using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Models
{
    public class Context : IdentityDbContext<ApplicationUser>
    {
        public Context()
        {

        }
        public Context(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<SharedPost> SharedPosts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Requests> Requests { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages{ get; set; }
        public DbSet<sharedcommentcs> sharedcommentcs { get; set; }

    }
}
