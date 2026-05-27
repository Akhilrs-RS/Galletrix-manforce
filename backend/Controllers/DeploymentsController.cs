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
    public class DeploymentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DeploymentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deployment>>> GetDeployments()
        {
            return await _context.Deployments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Deployment>> GetDeployment(int id)
        {
            var deployment = await _context.Deployments.FindAsync(id);
            if (deployment == null) return NotFound();
            return deployment;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeployment(int id, Deployment deployment)
        {
            if (id != deployment.Id) return BadRequest();
            
            deployment.UpdatedAt = DateTime.UtcNow;
            _context.Entry(deployment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeploymentExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Deployment>> PostDeployment(Deployment deployment)
        {
            deployment.CreatedAt = DateTime.UtcNow;
            deployment.UpdatedAt = DateTime.UtcNow;
            _context.Deployments.Add(deployment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDeployment), new { id = deployment.Id }, deployment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeployment(int id)
        {
            var deployment = await _context.Deployments.FindAsync(id);
            if (deployment == null) return NotFound();

            _context.Deployments.Remove(deployment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeploymentExists(int id)
        {
            return _context.Deployments.Any(e => e.Id == id);
        }
    }
}
