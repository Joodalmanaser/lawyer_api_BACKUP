module.exports = {
  apps: [
    {
      name: "lawyer-api",
      cwd: "/var/www/lawyer_api",
      script: "server.js",          // 🔁 change if your entry is different (e.g. app.js, index.js, dist/main.js)
      instances: 1,                 // or "max" for cluster mode
      exec_mode: "fork",            // use "cluster" if instances: "max"
      autorestart: true,
      watch: false,                 // set true only if you want auto-restart on code changes
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3300                  // 🔁 change to your port
      },
      error_file: "/var/log/pm2/lawyer-api-error.log",
      out_file: "/var/log/pm2/lawyer-api-out.log",
      time: true
    }
  ]
};
