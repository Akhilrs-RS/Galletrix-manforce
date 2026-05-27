using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Deal> Deals { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Deployment> Deployments { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Payroll> Payrolls { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Recruitment> Recruitments { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
    }
}
