using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("attendance")]
    public class Attendance
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("worker_id")]
        public int? WorkerId { get; set; }

        [Column("check_in")]
        public TimeSpan? CheckIn { get; set; }

        [Column("check_out")]
        public TimeSpan? CheckOut { get; set; }

        [Column("ot_hours")]
        public decimal OtHours { get; set; } = 0;

        [Column("status")]
        public string? Status { get; set; }

        [Required]
        [Column("date")]
        public DateTime Date { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
