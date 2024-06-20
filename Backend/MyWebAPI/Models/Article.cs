namespace MyWebAPI.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Inicializa com valor padrão
        public string Content { get; set; } = string.Empty; // Inicializa com valor padrão
    }
}
