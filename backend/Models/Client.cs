using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("clients")]
    public class Client
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("contact")]
        public string? Contact { get; set; }

        [Column("phone")]
        public string? Phone { get; set; }

        [Column("type")]
        public string? Type { get; set; }

        [Column("workers")]
        public int? Workers { get; set; }

        [Column("rate")]
        public decimal? Rate { get; set; }

        [Column("till")]
        public DateTime? Till { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("revenue")]
        public decimal Revenue { get; set; } = 0;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
