using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("invoices")]
    public class Invoice
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("invoice_number")]
        public string? InvoiceNumber { get; set; }

        [Column("client_id")]
        public int? ClientId { get; set; }

        [Column("amount")]
        public decimal? Amount { get; set; }

        [Column("issued_date")]
        public DateTime? IssuedDate { get; set; }

        [Column("due_date")]
        public DateTime? DueDate { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
