using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyWebAPI.Models
{
    public class Option
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty; // Inicializa com valor padrão

        [Required]
        [Column(TypeName = "tinyint(1)")]
        public bool IsCorrect { get; set; } = false;
        public int QuestionId { get; set; }
        
        [JsonIgnore]
        public Question Question { get; set; } = new Question(); // Inicializa com valor padrão
    }
}
