using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("deployments")]
    public class Deployment
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("deployment_id")]
        public string? DeploymentId { get; set; }

        [Required]
        [Column("site")]
        public string Site { get; set; } = string.Empty;

        [Column("client_id")]
        public int? ClientId { get; set; }

        [Column("workers_count")]
        public int WorkersCount { get; set; } = 0;

        [Column("supervisor")]
        public string? Supervisor { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("check_in")]
        public TimeSpan? CheckIn { get; set; }

        [Column("date")]
        public DateTime? Date { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
