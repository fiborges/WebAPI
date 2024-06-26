using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;
using MyWebAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionsController : ControllerBase
    {
        private readonly MyWebAPIContext _context;

        public QuestionsController(MyWebAPIContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions.Include(q => q.Options).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestions), new { id = question.Id }, question);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest("Question ID mismatch");
            }

            var existingQuestion = await _context.Questions.Include(q => q.Options).FirstOrDefaultAsync(q => q.Id == id);
            if (existingQuestion == null)
            {
                return NotFound();
            }

            existingQuestion.Text = question.Text;
            Console.WriteLine("Existing Options:");
            foreach (var opt in existingQuestion.Options)
            {
                Console.WriteLine($"Option ID: {opt.Id}, Text: {opt.Text}");
            }

            Console.WriteLine("New Options:");
            foreach (var opt in question.Options)
            {
                Console.WriteLine($"Option ID: {opt.Id}, Text: {opt.Text}");
            }

            var optionsToRemove = existingQuestion.Options.Where(o => !question.Options.Any(qo => qo.Id == o.Id)).ToList();
            Console.WriteLine("Options to Remove:");
            foreach (var opt in optionsToRemove)
            {
                Console.WriteLine($"Option ID: {opt.Id}, Text: {opt.Text}");
            }
            foreach (var option in optionsToRemove)
            {
                _context.Options.Remove(option);
            }

            foreach (var option in question.Options)
            {
                var existingOption = existingQuestion.Options.FirstOrDefault(o => o.Id == option.Id);
                if (existingOption != null)
                {
                    Console.WriteLine($"Updating Option ID: {existingOption.Id} with new text: {option.Text}");
                    existingOption.Text = option.Text;
                }
                else
                {
                    Console.WriteLine($"Adding new Option with text: {option.Text}");
                    existingQuestion.Options.Add(new Option
                    {
                        Text = option.Text,
                        QuestionId = existingQuestion.Id
                    });
                }
            }

            _context.Entry(existingQuestion).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    Console.WriteLine($"Error updating question: {ex.Message}");
                    return StatusCode(500, "Internal server error");
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}
