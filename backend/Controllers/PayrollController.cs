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
    public class PayrollController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PayrollController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payroll>>> GetPayrolls()
        {
            return await _context.Payrolls.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payroll>> GetPayroll(int id)
        {
            var payroll = await _context.Payrolls.FindAsync(id);
            if (payroll == null) return NotFound();
            return payroll;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayroll(int id, Payroll payroll)
        {
            if (id != payroll.Id) return BadRequest();
            
            payroll.UpdatedAt = DateTime.UtcNow;
            _context.Entry(payroll).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayrollExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Payroll>> PostPayroll(Payroll payroll)
        {
            payroll.CreatedAt = DateTime.UtcNow;
            payroll.UpdatedAt = DateTime.UtcNow;
            _context.Payrolls.Add(payroll);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayroll), new { id = payroll.Id }, payroll);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayroll(int id)
        {
            var payroll = await _context.Payrolls.FindAsync(id);
            if (payroll == null) return NotFound();

            _context.Payrolls.Remove(payroll);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PayrollExists(int id)
        {
            return _context.Payrolls.Any(e => e.Id == id);
        }
    }
}
