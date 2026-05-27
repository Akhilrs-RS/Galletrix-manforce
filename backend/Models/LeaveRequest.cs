using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("leave_requests")]
    public class LeaveRequest
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("worker_id")]
        public int? WorkerId { get; set; }

        [Column("type")]
        public string? Type { get; set; }

        [Column("from_date")]
        public DateTime? FromDate { get; set; }

        [Column("to_date")]
        public DateTime? ToDate { get; set; }

        [Column("days")]
        public int? Days { get; set; }

        [Column("reason")]
        public string? Reason { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
