namespace MyWebAPI.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty; // Inicializa com valor padrão
        public List<Option> Options { get; set; } = new List<Option>(); // Inicializa com valor padrão
    }
}
