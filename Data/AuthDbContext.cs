using restaurant_franchise.Models;
using Microsoft.EntityFrameworkCore;

namespace restaurant_franchise.Data
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set;}
       public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
    }
}