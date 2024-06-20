namespace MyWebAPI.Models
{
    public class Option
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty; // Inicializa com valor padrão
        public int QuestionId { get; set; }
        public Question Question { get; set; } = new Question(); // Inicializa com valor padrão
    }
}
