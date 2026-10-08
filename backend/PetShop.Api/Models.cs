using System.ComponentModel.DataAnnotations;

namespace PetShop.Api;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Role { get; set; } = "Staff";
}

public class Pet
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Species { get; set; } = "";
    public string Breed { get; set; } = "";
    public int AgeMonths { get; set; }
    public double Price { get; set; }
    public string Status { get; set; } = "Available";
}

public class LoginRequest
{
    [Required] public string Username { get; set; } = "";
    [Required] public string Password { get; set; } = "";
}

public class PetRequest
{
    [Required, MaxLength(60)] public string Name { get; set; } = "";
    [Required, MaxLength(30)] public string Species { get; set; } = "";
    [MaxLength(60)] public string Breed { get; set; } = "";
    [Range(0, 600)] public int AgeMonths { get; set; }
    [Range(0, 10000000)] public double Price { get; set; }
    [RegularExpression("^(Available|Reserved|Sold)$", ErrorMessage = "Status must be Available, Reserved or Sold.")]
    public string Status { get; set; } = "Available";
}

public class SpeciesCount
{
    public string Species { get; set; } = "";
    public int Count { get; set; }
}
