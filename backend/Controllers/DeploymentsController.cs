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

        [HttpPost("assign-multiple")]
        public async Task<IActionResult> AssignMultiple([FromBody] AssignMultipleDto request)
        {
            if (request.WorkerIds == null || !request.WorkerIds.Any())
                return BadRequest(new { message = "No workers selected." });

            var deployment = new Deployment
            {
                DeploymentId = "DEP-" + DateTime.UtcNow.ToString("yyyyMMddHHmmss"),
                Site = request.SiteName,
                WorkersCount = request.WorkerIds.Count,
                Status = "Active",
                Date = DateTime.UtcNow
            };

            _context.Deployments.Add(deployment);

            foreach (var id in request.WorkerIds)
            {
                var worker = await _context.Workers.FindAsync(id);
                if (worker != null)
                {
                    worker.Status = "Deployed";
                    worker.Site = request.SiteName;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Deployed successfully" });
        }

        [HttpPost("complete-worker")]
        public async Task<IActionResult> CompleteWorker([FromBody] CompleteWorkerDto request)
        {
            var worker = await _context.Workers.FindAsync(request.WorkerId);
            if (worker != null)
            {
                worker.Status = "Available";
                worker.Site = null;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Worker marked as available" });
            }
            return NotFound(new { message = "Worker not found" });
        }

        private bool DeploymentExists(int id)
        {
            return _context.Deployments.Any(e => e.Id == id);
        }
    }

    public class AssignMultipleDto
    {
        public List<int> WorkerIds { get; set; } = new List<int>();
        public string SiteName { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public int Duration { get; set; } = 30;
    }

    public class CompleteWorkerDto
    {
        public int WorkerId { get; set; }
    }
}
