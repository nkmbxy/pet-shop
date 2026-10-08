# Pet Shop Management System

- `backend/PetShop.Api` — .NET 8 Web API + Dapper (JSON files as tables)
- `frontend` — Next.js (TypeScript) with Login and Dashboard pages

## Run the Back End
Requires the .NET 8 SDK.

```bash
cd backend/PetShop.Api
dotnet run          # http://localhost:5000
```

Default account (created on first run): **admin / admin123**

### Mock database
Each file in `backend/PetShop.Api/Data` is a table: `users.json`, `pets.json`.
On startup the files are loaded into an in-memory SQLite database so Dapper can run SQL against them;
every create/update/delete is written back to the JSON files.

### Endpoints
| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/login` | Returns a JWT and the user |
| GET | `/api/crud/pets?search=&status=` | List pets (auth required) |
| GET | `/api/crud/pets/{id}` | Get one pet |
| POST | `/api/crud/pets` | Create a pet |
| PUT | `/api/crud/pets/{id}` | Update a pet |
| DELETE | `/api/crud/pets/{id}` | Delete a pet |
| GET | `/api/crud/summary` | Dashboard totals and species breakdown |

Allowed front-end origins are set in `appsettings.json` under `Cors:Origins`.

## Run the Front End
Requires Node.js 18+.

```bash
cd frontend
npm install
npm run dev         # http://localhost:3000 (uses .env.dev)
```

### Environments
| File | Used by | API URL |
|---|---|---|
| `.env.dev` | `npm run dev`, `npm run build:dev` | http://localhost:5000 |
| `.env.uat` | `npm run build:uat` | https://uat-api.petshop.example.com |
| `.env.prod` | `npm run build:prod` | https://api.petshop.example.com |

Build for an environment, then `npm start`. Replace the UAT/Prod URLs with your real ones, and add those
front-end origins to `Cors:Origins` on the API.
