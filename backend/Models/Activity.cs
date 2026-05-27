namespace backend.Models
{
    public class Activity
    {
        public int Id { get; set; }
        
        public string Task { get; set; } = string.Empty;
        
        public string Contact { get; set; } = string.Empty;
        
        public string Date { get; set; } = string.Empty;
        
        public string Priority { get; set; } = string.Empty;
        
        public string Status { get; set; } = "pending";
    }
}
