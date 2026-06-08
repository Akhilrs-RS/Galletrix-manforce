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
    public class DocumentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DocumentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            return await _context.Documents.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null) return NotFound();
            return document;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocument(int id, Document document)
        {
            if (id != document.Id) return BadRequest();
            
            document.UpdatedAt = DateTime.UtcNow;
            _context.Entry(document).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Document>> PostDocument([FromForm] DocumentUploadDto dto)
        {
            var document = new Document
            {
                WorkerId = dto.WorkerId,
                Type = dto.Type,
                Number = dto.Number,
                Expiry = dto.Expiry,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            if (dto.Expiry.HasValue)
            {
                document.Status = dto.Expiry.Value < DateTime.UtcNow ? "Expired" : "Valid";
            }

            if (dto.Document != null && dto.Document.Length > 0)
            {
                var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                var fileName = $"{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}-{dto.Document.FileName}";
                var filePath = Path.Combine(uploadsPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Document.CopyToAsync(stream);
                }

                document.FileUrl = $"/uploads/{fileName}";
            }

            _context.Documents.Add(document);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDocument), new { id = document.Id }, document);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null) return NotFound();

            if (!string.IsNullOrEmpty(document.FileUrl))
            {
                var fileName = document.FileUrl.Replace("/uploads/", "");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", fileName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.Documents.Remove(document);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DocumentExists(int id)
        {
            return _context.Documents.Any(e => e.Id == id);
        }
    }

    public class DocumentUploadDto
    {
        [FromForm(Name = "worker_id")]
        public int? WorkerId { get; set; }
        public string? Type { get; set; }
        public string? Number { get; set; }
        public DateTime? Expiry { get; set; }
        public IFormFile? Document { get; set; }
    }
}
