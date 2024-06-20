namespace MyWebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty; // Inicializa com valor padrão
        public string Password { get; set; } = string.Empty; // Inicializa com valor padrão
    }
}
