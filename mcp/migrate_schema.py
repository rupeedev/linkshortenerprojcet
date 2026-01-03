import subprocess
import os
import shlex


def run_command(command):
    """Run a command (as list or string) without a shell and print output."""
    if isinstance(command, str):
        args = shlex.split(command)
    else:
        args = command
    print(f"$ {' '.join(args)}")
    result = subprocess.run(args, shell=False, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"Error (exit {result.returncode}):\n{result.stderr}")
        raise SystemExit(result.returncode)
    print(result.stdout)


def main():
    # Ensure we run from the project root
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print(f"Changing working directory to project root: {project_root}")
    os.chdir(project_root)

    # Ensure drizzle-kit is installed as a dev dependency
    print("Installing/ensuring drizzle-kit (dev dependency)...")
    run_command(["npm", "install", "drizzle-kit", "--save-dev"])

    # Show installed drizzle-kit version
    run_command(["./node_modules/.bin/drizzle-kit", "--version"])

    # Generate migration
    print("Generating migration file...")
    run_command(["./node_modules/.bin/drizzle-kit", "generate", "--out", "migrations", "--schema", "db/schema.ts", "--dialect", "postgresql"])

    # Push migration
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        print("Error: DATABASE_URL environment variable is not set. Set it or put it in .env and run with: env $(cat .env | xargs) python mcp/migrate_schema.py")
        raise SystemExit(1)

    print("Pushing migration to Neon database...")
    run_command(["./node_modules/.bin/drizzle-kit", "push", "--url", DATABASE_URL, "--schema", "db/schema.ts", "--dialect", "postgresql"])

    print("Migration completed successfully!")


if __name__ == "__main__":
    main()
