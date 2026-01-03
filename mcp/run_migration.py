import os
import re
import subprocess
import shlex


def load_database_url(env_path):
    s = open(env_path).read()
    m = re.search(r'^DATABASE_URL=(.*)$', s, re.M)
    if not m:
        return None
    return m.group(1).strip().strip('"')


def check_table_with_psql(database_url, table_name):
    try:
        cmd = ["psql", database_url, "-t", "-c", f"SELECT to_regclass('public.{table_name}');"]
        proc = subprocess.run(cmd, capture_output=True, text=True)
    except FileNotFoundError:
        return None, "psql-not-found"

    if proc.returncode != 0:
        return False, proc.stderr.strip()

    out = proc.stdout.strip()
    if not out or out.lower() in ("null", ""):
        return False, out
    return True, out


def check_table_with_psycopg(database_url, table_name):
    try:
        import psycopg
    except Exception as e:
        return None, f"psycopg-not-installed: {e}"

    try:
        conn = psycopg.connect(database_url)
        with conn.cursor() as cur:
            cur.execute("SELECT to_regclass(%s);", (f"public.{table_name}",))
            res = cur.fetchone()
        conn.close()
        val = res[0] if res else None
        if val:
            return True, val
        return False, val
    except Exception as e:
        return False, str(e)


def main():
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    database_url = load_database_url(env_path)
    if not database_url:
        print('DATABASE_URL not found in .env')
        raise SystemExit(1)

    print('Using DATABASE_URL (redacted):', database_url[:60] + '...')

    # Run the migration script with env var
    env = os.environ.copy()
    env['DATABASE_URL'] = database_url
    ret = subprocess.run(['python', os.path.join(os.path.dirname(__file__), 'migrate_schema.py')], env=env)
    if ret.returncode != 0:
        raise SystemExit(ret.returncode)

    # Check for table existence
    table_name = 'links'
    print(f"Checking whether table '{table_name}' exists...")

    ok, info = check_table_with_psql(database_url, table_name)
    if ok is None:
        # psql not available, try psycopg
        ok2, info2 = check_table_with_psycopg(database_url, table_name)
        if ok2 is None:
            print("Cannot check database: neither psql nor psycopg available.")
            print("Install psql or psycopg (pip install psycopg[binary]) to enable programmatic checks.")
            return
        if ok2:
            print(f"Table '{table_name}' exists (verified via psycopg): {info2}")
        else:
            print(f"Table '{table_name}' does NOT exist (psycopg response: {info2})")
        return

    if ok:
        print(f"Table '{table_name}' exists (verified via psql): {info}")
    else:
        print(f"Table '{table_name}' does NOT exist (psql response: {info})")


if __name__ == '__main__':
    main()
