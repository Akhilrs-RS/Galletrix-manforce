using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("workers")]
    public class Worker
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("worker_id")]
        public string? WorkerId { get; set; }

        [Column("category")]
        public string? Category { get; set; }

        [Column("type")]
        public string? Type { get; set; }

        [Column("nationality")]
        public string? Nationality { get; set; }

        [Column("salary")]
        public decimal? Salary { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("expiry")]
        public DateTime? Expiry { get; set; }

        [Column("emirates_id")]
        public string? EmiratesId { get; set; }

        [Column("client_id")]
        public int? ClientId { get; set; }

        [Column("site")]
        public string? Site { get; set; }

        [Column("hr_allowance")]
        public decimal HrAllowance { get; set; } = 0;

        [Column("da_allowance")]
        public decimal DaAllowance { get; set; } = 0;

        [Column("daily_wage")]
        public decimal DailyWage { get; set; } = 0;

        [Column("monthly_wage")]
        public decimal MonthlyWage { get; set; } = 0;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
