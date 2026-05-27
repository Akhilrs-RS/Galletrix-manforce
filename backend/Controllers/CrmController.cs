using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/crm")]
    public class CrmController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CrmController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET Deals -> http://localhost:5000/api/crm/deals
        [HttpGet("deals")]
        public async Task<ActionResult<IEnumerable<Deal>>> GetDeals()
        {
            return await _context.Deals.ToListAsync();
        }

        // 2. POST New Deal -> http://localhost:5000/api/crm/deals
        [HttpPost("deals")]
        public async Task<ActionResult<Deal>> CreateDeal([FromBody] Deal deal)
        {
            _context.Deals.Add(deal);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDeals), new { id = deal.Id }, deal);
        }

        // 3. PUT Drag-and-Drop Stage Update -> http://localhost:5000/api/crm/deals/{id}
        // Accepts only the raw string value (e.g. "PROPOSAL") in the body
        [HttpPut("deals/{id}")]
        public async Task<IActionResult> UpdateDealStage(int id, [FromBody] string stage)
        {
            var deal = await _context.Deals.FindAsync(id);
            if (deal == null)
            {
                return NotFound(new { message = "Deal not found" });
            }

            deal.Stage = stage;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Stage updated successfully" });
        }

        // 4. GET Contacts -> http://localhost:5000/api/crm/contacts
        [HttpGet("contacts")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // 5. POST New Contact -> http://localhost:5000/api/crm/contacts
        [HttpPost("contacts")]
        public async Task<ActionResult<Contact>> CreateContact([FromBody] Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
        }

        // 6. GET Activities -> http://localhost:5000/api/crm/activities
        [HttpGet("activities")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        // 7. POST New Activity -> http://localhost:5000/api/crm/activities
        [HttpPost("activities")]
        public async Task<ActionResult<Activity>> CreateActivity([FromBody] Activity activity)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetActivities), new { id = activity.Id }, activity);
        }

        // 8. PUT Activity State Update -> http://localhost:5000/api/crm/activities/{id}
        [HttpPut("activities/{id}")]
        public async Task<IActionResult> UpdateActivity(int id, [FromBody] Activity activityUpdate)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound(new { message = "Activity not found" });
            }

            if (activityUpdate.Task != null) activity.Task = activityUpdate.Task;
            if (activityUpdate.Contact != null) activity.Contact = activityUpdate.Contact;
            if (activityUpdate.Date != null) activity.Date = activityUpdate.Date;
            if (activityUpdate.Priority != null) activity.Priority = activityUpdate.Priority;
            if (activityUpdate.Status != null) activity.Status = activityUpdate.Status;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Activity updated successfully", activity });
        }
    }
}
