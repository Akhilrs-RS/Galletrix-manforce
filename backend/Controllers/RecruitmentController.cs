using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class RecruitmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RecruitmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recruitment>>> GetRecruitments()
        {
            return await _context.Recruitments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recruitment>> GetRecruitment(int id)
        {
            var recruitment = await _context.Recruitments.FindAsync(id);
            if (recruitment == null) return NotFound();
            return recruitment;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecruitment(int id, Recruitment recruitment)
        {
            if (id != recruitment.Id) return BadRequest();
            
            recruitment.UpdatedAt = DateTime.UtcNow;
            _context.Entry(recruitment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecruitmentExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Recruitment>> PostRecruitment(Recruitment recruitment)
        {
            recruitment.CreatedAt = DateTime.UtcNow;
            recruitment.UpdatedAt = DateTime.UtcNow;
            _context.Recruitments.Add(recruitment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecruitment), new { id = recruitment.Id }, recruitment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecruitment(int id)
        {
            var recruitment = await _context.Recruitments.FindAsync(id);
            if (recruitment == null) return NotFound();

            _context.Recruitments.Remove(recruitment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecruitmentExists(int id)
        {
            return _context.Recruitments.Any(e => e.Id == id);
        }
    }
}
