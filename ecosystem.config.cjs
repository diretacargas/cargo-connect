// PM2 — Backend do formulário de contato (Node.js standalone).
// O site em si é estático (servido pelo Nginx a partir de /var/www/direta-cargas/dist).
// Este processo expõe apenas POST /api/contact e GET /api/health na porta 3001.
//
// Uso (no VPS, na raiz do projeto):
//   cd backend-contact && npm install && cd ..
//   pm2 start ecosystem.config.cjs
//   pm2 save
//   pm2 startup
module.exports = {
  apps: [
    {
      name: "direta-cargas-api",
      cwd: "./backend-contact",
      script: "server.mjs",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "200M",
      out_file: "./logs/api-out.log",
      error_file: "./logs/api-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
