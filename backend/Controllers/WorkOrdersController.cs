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
    public class WorkOrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkOrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkOrder>>> GetWorkOrders()
        {
            return await _context.WorkOrders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkOrder>> GetWorkOrder(int id)
        {
            var workOrder = await _context.WorkOrders.FindAsync(id);
            if (workOrder == null) return NotFound();
            return workOrder;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkOrder(int id, WorkOrder workOrder)
        {
            if (id != workOrder.Id) return BadRequest();
            
            workOrder.UpdatedAt = DateTime.UtcNow;
            _context.Entry(workOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkOrderExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<WorkOrder>> PostWorkOrder(WorkOrder workOrder)
        {
            workOrder.CreatedAt = DateTime.UtcNow;
            workOrder.UpdatedAt = DateTime.UtcNow;
            _context.WorkOrders.Add(workOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkOrder), new { id = workOrder.Id }, workOrder);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkOrder(int id)
        {
            var workOrder = await _context.WorkOrders.FindAsync(id);
            if (workOrder == null) return NotFound();

            _context.WorkOrders.Remove(workOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkOrderExists(int id)
        {
            return _context.WorkOrders.Any(e => e.Id == id);
        }
    }
}
