using System.Collections.Generic;

namespace MyWebAPI.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<Option> Options { get; set; } = new List<Option>();
    }
}
