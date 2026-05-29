using backend.Models;
using BCrypt.Net;

namespace backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Ensure database is created and schema matches models
            context.Database.EnsureCreated();

            // Clear existing users to ensure DB state matches 01_initial_data.js exactly
            context.Users.RemoveRange(context.Users);
            context.SaveChanges();

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("password123");

            var users = new List<User>
            {
                new User { Username = "admin", PasswordHash = hashedPassword, Role = "admin" },
                new User { Username = "hr_manager", PasswordHash = hashedPassword, Role = "hr" },
                new User { Username = "supervisor1", PasswordHash = hashedPassword, Role = "supervisor" },
                new User { Username = "accounts_user", PasswordHash = hashedPassword, Role = "accounts" },
                new User { Username = "worker1", PasswordHash = hashedPassword, Role = "worker" }
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}
