using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyWebAPI.Models
{
    public class Option
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;
        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        
        [JsonIgnore]
        public Question Question { get; set; } = new Question();
    }
}
