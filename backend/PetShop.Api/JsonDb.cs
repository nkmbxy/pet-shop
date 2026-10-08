using System.Data;
using System.Text.Json;
using Dapper;
using Microsoft.Data.Sqlite;

namespace PetShop.Api;

/// <summary>
/// Mock database: each JSON file in /Data is a table. On startup the files are loaded into an
/// in-memory SQLite database so queries can be written as SQL with Dapper. After every
/// write the tables are saved back to their JSON files.
/// </summary>
public class JsonDb
{
    private static readonly JsonSerializerOptions Json = new()
    {
        WriteIndented = true,
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private readonly SqliteConnection _conn = new("Data Source=:memory:");
    private readonly string _dir;
    private readonly object _lock = new();

    public JsonDb(IWebHostEnvironment env)
    {
        _dir = Path.Combine(env.ContentRootPath, "Data");
        _conn.Open();
        _conn.Execute(@"
            CREATE TABLE Users (Id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT NOT NULL UNIQUE,
                                PasswordHash TEXT NOT NULL, FullName TEXT, Role TEXT);
            CREATE TABLE Pets  (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Species TEXT NOT NULL,
                                Breed TEXT, AgeMonths INTEGER, Price REAL, Status TEXT);");

        var users = Read<User>("users.json");
        if (users.Count == 0)
        {
            // First run: create the default admin account (admin / admin123).
            users.Add(new User
            {
                Id = 1, Username = "admin", FullName = "Shop Admin", Role = "Admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123")
            });
        }

        _conn.Execute("INSERT INTO Users (Id, Username, PasswordHash, FullName, Role) VALUES (@Id, @Username, @PasswordHash, @FullName, @Role)", users);
        _conn.Execute("INSERT INTO Pets (Id, Name, Species, Breed, AgeMonths, Price, Status) VALUES (@Id, @Name, @Species, @Breed, @AgeMonths, @Price, @Status)", Read<Pet>("pets.json"));
        Save();
    }

    /// <summary>Runs a Dapper query/command thread-safely; set persist to write the JSON files afterwards.</summary>
    public T Run<T>(Func<IDbConnection, T> work, bool persist = false)
    {
        lock (_lock)
        {
            var result = work(_conn);
            if (persist) Save();
            return result;
        }
    }

    private List<T> Read<T>(string file)
    {
        var path = Path.Combine(_dir, file);
        return File.Exists(path) ? JsonSerializer.Deserialize<List<T>>(File.ReadAllText(path), Json) ?? new() : new();
    }

    private void Save()
    {
        File.WriteAllText(Path.Combine(_dir, "users.json"), JsonSerializer.Serialize(_conn.Query<User>("SELECT * FROM Users ORDER BY Id"), Json));
        File.WriteAllText(Path.Combine(_dir, "pets.json"), JsonSerializer.Serialize(_conn.Query<Pet>("SELECT * FROM Pets ORDER BY Id"), Json));
    }
}
