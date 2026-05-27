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
    public class WorkersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Worker>>> GetWorkers()
        {
            return await _context.Workers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Worker>> GetWorker(int id)
        {
            var worker = await _context.Workers.FindAsync(id);
            if (worker == null) return NotFound();
            return worker;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorker(int id, Worker worker)
        {
            if (id != worker.Id) return BadRequest();
            
            worker.UpdatedAt = DateTime.UtcNow;
            _context.Entry(worker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkerExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Worker>> PostWorker(Worker worker)
        {
            worker.CreatedAt = DateTime.UtcNow;
            worker.UpdatedAt = DateTime.UtcNow;
            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorker), new { id = worker.Id }, worker);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorker(int id)
        {
            var worker = await _context.Workers.FindAsync(id);
            if (worker == null) return NotFound();

            _context.Workers.Remove(worker);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkerExists(int id)
        {
            return _context.Workers.Any(e => e.Id == id);
        }
    }
}
