using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PetShop.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/crud")]
public class CrudController(JsonDb db) : ControllerBase
{
    [HttpGet("pets")]
    public IActionResult List([FromQuery] string? search, [FromQuery] string? status)
    {
        var pets = db.Run(c => c.Query<Pet>(@"
            SELECT * FROM Pets
            WHERE (@search IS NULL OR Name LIKE '%' || @search || '%' OR Species LIKE '%' || @search || '%' OR Breed LIKE '%' || @search || '%')
              AND (@status IS NULL OR Status = @status)
            ORDER BY Id DESC",
            new
            {
                search = string.IsNullOrWhiteSpace(search) ? null : search.Trim(),
                status = string.IsNullOrWhiteSpace(status) ? null : status
            }).ToList());
        return Ok(pets);
    }

    [HttpGet("pets/{id:int}")]
    public IActionResult Get(int id)
    {
        var pet = db.Run(c => c.QueryFirstOrDefault<Pet>("SELECT * FROM Pets WHERE Id = @id", new { id }));
        return pet is null ? NotFound(new { message = "Pet not found." }) : Ok(pet);
    }

    [HttpPost("pets")]
    public IActionResult Create(PetRequest r)
    {
        var id = db.Run(c => c.ExecuteScalar<int>(@"
            INSERT INTO Pets (Name, Species, Breed, AgeMonths, Price, Status)
            VALUES (@Name, @Species, @Breed, @AgeMonths, @Price, @Status);
            SELECT last_insert_rowid();", r), persist: true);
        var pet = db.Run(c => c.QueryFirst<Pet>("SELECT * FROM Pets WHERE Id = @id", new { id }));
        return CreatedAtAction(nameof(Get), new { id }, pet);
    }

    [HttpPut("pets/{id:int}")]
    public IActionResult Update(int id, PetRequest r)
    {
        var rows = db.Run(c => c.Execute(@"
            UPDATE Pets SET Name = @Name, Species = @Species, Breed = @Breed,
                            AgeMonths = @AgeMonths, Price = @Price, Status = @Status
            WHERE Id = @id",
            new { id, r.Name, r.Species, r.Breed, r.AgeMonths, r.Price, r.Status }), persist: true);
        if (rows == 0) return NotFound(new { message = "Pet not found." });
        return Ok(db.Run(c => c.QueryFirst<Pet>("SELECT * FROM Pets WHERE Id = @id", new { id })));
    }

    [HttpDelete("pets/{id:int}")]
    public IActionResult Delete(int id)
    {
        var rows = db.Run(c => c.Execute("DELETE FROM Pets WHERE Id = @id", new { id }), persist: true);
        return rows == 0 ? NotFound(new { message = "Pet not found." }) : NoContent();
    }

    [HttpGet("summary")]
    public IActionResult Summary() => Ok(db.Run(c => new
    {
        total = c.ExecuteScalar<int>("SELECT COUNT(*) FROM Pets"),
        available = c.ExecuteScalar<int>("SELECT COUNT(*) FROM Pets WHERE Status = 'Available'"),
        reserved = c.ExecuteScalar<int>("SELECT COUNT(*) FROM Pets WHERE Status = 'Reserved'"),
        sold = c.ExecuteScalar<int>("SELECT COUNT(*) FROM Pets WHERE Status = 'Sold'"),
        inventoryValue = c.ExecuteScalar<double>("SELECT COALESCE(SUM(Price), 0) FROM Pets WHERE Status <> 'Sold'"),
        bySpecies = c.Query<SpeciesCount>("SELECT Species, COUNT(*) AS Count FROM Pets GROUP BY Species ORDER BY Count DESC").ToList()
    }));
}
