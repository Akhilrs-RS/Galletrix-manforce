using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("payroll")]
    public class Payroll
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("worker_id")]
        public int? WorkerId { get; set; }

        [Column("month")]
        public string? Month { get; set; }

        [Column("year")]
        public int? Year { get; set; }

        [Column("basic")]
        public decimal? Basic { get; set; }

        [Column("ot")]
        public decimal? Ot { get; set; }

        [Column("allowance")]
        public decimal? Allowance { get; set; }

        [Column("deduction")]
        public decimal? Deduction { get; set; }

        [Column("net_pay")]
        public decimal? NetPay { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
