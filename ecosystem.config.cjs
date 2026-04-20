// Configuração do PM2 para rodar o site Direta Cargas no VPS Contabo.
// Uso (no servidor, dentro da pasta do projeto):
//   pm2 start ecosystem.config.cjs
//   pm2 save
//   pm2 startup
module.exports = {
  apps: [
    {
      name: "direta-cargas",
      script: ".output/server/index.mjs",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "127.0.0.1",
      },
      max_memory_restart: "400M",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
