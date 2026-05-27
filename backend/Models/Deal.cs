namespace backend.Models
{
    public class Deal
    {
        public int Id { get; set; }
        
        public string Title { get; set; } = string.Empty;
        
        public string Client { get; set; } = string.Empty;
        
        public decimal Value { get; set; }
        
        public string Stage { get; set; } = "LEAD";
    }
}
