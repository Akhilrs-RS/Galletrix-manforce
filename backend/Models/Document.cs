using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("documents")]
    public class Document
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("worker_id")]
        public int? WorkerId { get; set; }

        [Column("type")]
        public string? Type { get; set; }

        [Column("number")]
        public string? Number { get; set; }

        [Column("expiry")]
        public DateTime? Expiry { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("file_url")]
        public string? FileUrl { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
