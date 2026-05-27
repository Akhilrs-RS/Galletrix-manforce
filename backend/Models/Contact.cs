namespace backend.Models
{
    public class Contact
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
        
        public string Company { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        
        public string Phone { get; set; } = string.Empty;
        
        public string LastContact { get; set; } = string.Empty;
        
        public string Status { get; set; } = string.Empty;
    }
}
