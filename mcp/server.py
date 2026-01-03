#!/usr/bin/env python3
"""Simple MCP HTTP server to run migration and validation scripts.

Endpoints:
 - GET /status    -> {"status": "ok"}
 - POST /migrate  -> runs mcp/migrate_schema.py
 - POST /run      -> runs mcp/run_migration.py

Optional: set MCP_API_KEY in .env and include header `X-API-KEY` to authorize requests.
This server uses only Python stdlib so no extra packages are required.
"""

import os
import re
import json
import subprocess
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


def load_env(env_path):
    vals = {}
    try:
        with open(env_path, "r") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    k, v = line.split("=", 1)
                    vals[k.strip()] = v.strip().strip('"')
    except FileNotFoundError:
        return vals
    return vals


ENV = load_env(os.path.join(os.path.dirname(__file__), "..", ".env"))
API_KEY = ENV.get("MCP_API_KEY") or ENV.get("MCP_APIKEY")


def run_script(command, env=None, timeout=300):
    """Run a script (list of args) and return a dict with exit, stdout, stderr."""
    try:
        proc = subprocess.run(command, capture_output=True, text=True, env=env, timeout=timeout)
        return {"exit_code": proc.returncode, "stdout": proc.stdout, "stderr": proc.stderr}
    except subprocess.TimeoutExpired:
        return {"exit_code": 124, "stdout": "", "stderr": "timeout"}


class MCPHandler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, payload):
        data = json.dumps(payload).encode()
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _authorized(self):
        if not API_KEY:
            return True
        header = self.headers.get("X-API-KEY")
        return header == API_KEY

    def do_GET(self):
        if self.path == "/status":
            self._send_json(200, {"status": "ok"})
            return
        self._send_json(404, {"error": "not found"})

    def do_POST(self):
        if not self._authorized():
            self._send_json(401, {"error": "unauthorized"})
            return

        if self.path == "/migrate":
            env = os.environ.copy()
            env.update(ENV)
            res = run_script(["python", os.path.join(os.path.dirname(__file__), "migrate_schema.py")], env=env)
            self._send_json(200, res)
            return

        if self.path == "/run":
            env = os.environ.copy()
            env.update(ENV)
            res = run_script(["python", os.path.join(os.path.dirname(__file__), "run_migration.py")], env=env)
            self._send_json(200, res)
            return

        self._send_json(404, {"error": "not found"})


def run_server(host="0.0.0.0", port=8080):
    server = ThreadingHTTPServer((host, port), MCPHandler)
    print(f"MCP server listening on http://{host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Shutting down MCP server")
        server.shutdown()


def _smoke_test():
    # start server in background thread and query /status
    thread = threading.Thread(target=run_server, kwargs={"host": "127.0.0.1", "port": 8081}, daemon=True)
    thread.start()
    time.sleep(0.6)
    try:
        import urllib.request
        with urllib.request.urlopen("http://127.0.0.1:8081/status", timeout=3) as r:
            print(r.read().decode())
    except Exception as e:
        print("Smoke test failed:", e)


if __name__ == "__main__":
    import argparse

    p = argparse.ArgumentParser()
    p.add_argument("--host", default="0.0.0.0")
    p.add_argument("--port", default=8080, type=int)
    p.add_argument("--smoke", action="store_true", help="Run a quick smoke test")
    args = p.parse_args()
    if args.smoke:
        _smoke_test()
    else:
        run_server(args.host, args.port)
