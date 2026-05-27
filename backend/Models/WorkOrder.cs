using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("work_orders")]
    public class WorkOrder
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("site_name")]
        public string SiteName { get; set; } = string.Empty;

        [Required]
        [Column("client_name")]
        public string ClientName { get; set; } = string.Empty;

        [Required]
        [Column("assigned_name")]
        public string AssignedName { get; set; } = string.Empty;

        [Required]
        [Column("site_address")]
        public string SiteAddress { get; set; } = string.Empty;

        [Required]
        [Column("status")]
        public string Status { get; set; } = "Pending";

        [Column("start_date")]
        public DateTime? StartDate { get; set; }

        [Column("est_budget")]
        public decimal EstBudget { get; set; } = 0;

        [Column("description")]
        public string? Description { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
