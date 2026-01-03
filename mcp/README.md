# MCP (Migration Control Plane)

This folder contains lightweight scripts and a tiny HTTP server to generate and push database migrations and validate the resulting schema for local or CI use.

Files
- `migrate_schema.py` — generates Drizzle migrations and pushes them to the database.
- `run_migration.py` — wrapper that loads `DATABASE_URL` from `.env`, runs the migration, and verifies the `links` table exists.
- `server.py` — simple HTTP server exposing endpoints to run the above scripts programmatically.

Quick usage

1. Put your connection string into `.env` at the project root:

```
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
```

2. Generate & push migrations (local):

```
python mcp/migrate_schema.py         # generates migrations and pushes to DB
# or use the wrapper which also verifies the table
python mcp/run_migration.py
```

3. Start the MCP HTTP server (optional):

```
python mcp/server.py --host 127.0.0.1 --port 8080
```

Endpoints
- `GET /status` — returns `{ "status": "ok" }`.
- `POST /migrate` — runs `migrate_schema.py` and returns stdout/stderr.
- `POST /run` — runs `run_migration.py` (migration + verification).

Security notes (important)
- This server is intentionally minimal and not designed for direct internet exposure. Only run it on localhost or behind an authenticated proxy.
- If you want lightweight auth, set `MCP_API_KEY` in your project `.env`. Then include header `X-API-KEY: <value>` with requests. Example:

```
MCP_API_KEY=mysecret
```

- For production usage, prefer running migrations via CI/CD or a managed job runner. Do not expose `mcp/server.py` without proper TLS, authentication, and firewall restrictions.

Dependencies
- The scripts rely on `drizzle-kit` (installed by the scripts using `npm install drizzle-kit --save-dev`).
- `run_migration.py` may use `psql` if available or `psycopg` (Python) as a fallback to check tables. Install `psycopg[binary]` if you want programmatic checks on systems without `psql`.

Example curl

```
curl -X POST http://127.0.0.1:8080/run -H "X-API-KEY: mysecret"
```

Notes
- These utilities are convenience tooling for development and small teams. Treat them as helpers, not as a full migration service.
