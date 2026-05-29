using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("work_orders")]
    public class WorkOrder
    {
        [Key]
        [Column("id")]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [Required]
        [Column("site_name")]
        [JsonPropertyName("site_name")]
        public string SiteName { get; set; } = string.Empty;

        [Required]
        [Column("client_name")]
        [JsonPropertyName("client_name")]
        public string ClientName { get; set; } = string.Empty;

        [Required]
        [Column("assigned_name")]
        [JsonPropertyName("assigned_name")]
        public string AssignedName { get; set; } = string.Empty;

        [Required]
        [Column("site_address")]
        [JsonPropertyName("site_address")]
        public string SiteAddress { get; set; } = string.Empty;

        [Required]
        [Column("status")]
        [JsonPropertyName("status")]
        public string Status { get; set; } = "Pending";

        [Column("start_date")]
        [JsonPropertyName("start_date")]
        public DateTime? StartDate { get; set; }

        [Column("est_budget")]
        [JsonPropertyName("est_budget")]
        public decimal EstBudget { get; set; } = 0;

        [Column("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [Column("created_at")]
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        [JsonPropertyName("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
