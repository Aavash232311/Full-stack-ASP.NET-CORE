namespace restaurant_franchise.Models
{
    public class User
    {
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string phone { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime DateJoined { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime BlackListToken { get; set; }
        public DateTime DateCreated {get; set;}
        public Guid Id { get; set; }
    }
}
