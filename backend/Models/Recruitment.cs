using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("recruitment")]
    public class Recruitment
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("candidate_name")]
        public string CandidateName { get; set; } = string.Empty;

        [Column("role")]
        public string? Role { get; set; }

        [Column("nationality")]
        public string? Nationality { get; set; }

        [Column("experience")]
        public string? Experience { get; set; }

        [Column("stage")]
        public string? Stage { get; set; }

        [Column("date")]
        public DateTime? Date { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
