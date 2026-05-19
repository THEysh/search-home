const { spawn } = require("child_process");

const isWindows = process.platform === "win32";
const children = new Set();

function run(name, command, args) {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    env: process.env,
    shell: false,
    stdio: ["inherit", "pipe", "pipe"],
  });

  children.add(child);

  child.stdout.on("data", (chunk) => {
    process.stdout.write(`[${name}] ${chunk}`);
  });

  child.stderr.on("data", (chunk) => {
    process.stderr.write(`[${name}] ${chunk}`);
  });

  child.on("exit", (code, signal) => {
    children.delete(child);

    if (signal) {
      return;
    }

    if (code !== 0) {
      shutdown(code || 1);
    }
  });

  child.on("error", (error) => {
    console.error(`[${name}] ${error.message}`);
    shutdown(1);
  });

  return child;
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill(isWindows ? undefined : "SIGTERM");
    }
  }

  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

run("server", process.execPath, ["server.js"]);
run("vite", process.execPath, ["node_modules/vite/bin/vite.js", "--host", "0.0.0.0"]);
