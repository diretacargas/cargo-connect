// Backend standalone para o formulário de contato do site Direta Cargas.
// Roda como processo Node.js separado no VPS Contabo (PM2) e expõe POST /api/contact.
// O Nginx faz proxy de /api/* para este processo (porta 3001 por padrão).
//
// Como rodar:
//   cd backend-contact
//   npm install
//   pm2 start server.mjs --name direta-cargas-api
//
// Variáveis de ambiente esperadas (.env nesta pasta):
//   PORT=3001
//   SMTP_HOST=smtp.uhserver.com
//   SMTP_PORT=587
//   SMTP_USER=comercial@diretacargas.com.br
//   SMTP_PASSWORD=********
//   CONTACT_TO=comercial@diretacargas.com.br
//   ALLOWED_ORIGIN=https://diretacargas.com.br

import http from "node:http";
import nodemailer from "nodemailer";
import "dotenv/config";

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || "127.0.0.1";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload muito grande"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON inválido"));
      }
    });
    req.on("error", reject);
  });
}

function validate(data) {
  const errors = [];
  const str = (v, max) =>
    typeof v === "string" && v.trim().length > 0 && v.trim().length <= max
      ? v.trim()
      : null;

  const nome = str(data.nome, 120);
  if (!nome) errors.push("Nome obrigatório");

  const email = typeof data.email === "string" ? data.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160)
    errors.push("E-mail inválido");

  const telefone = str(data.telefone, 40);
  if (!telefone || telefone.length < 8) errors.push("Telefone inválido");

  const mensagem = str(data.mensagem, 4000);
  if (!mensagem) errors.push("Mensagem obrigatória");

  return {
    ok: errors.length === 0,
    errors,
    data: {
      nome,
      empresa: typeof data.empresa === "string" ? data.empresa.trim().slice(0, 120) : "",
      email,
      telefone,
      origem: typeof data.origem === "string" ? data.origem.trim().slice(0, 160) : "",
      destino: typeof data.destino === "string" ? data.destino.trim().slice(0, 160) : "",
      mensagem,
    },
  };
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, ts: Date.now() }));
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/contact") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
    return;
  }

  try {
    const json = await readJson(req);
    const v = validate(json);
    if (!v.ok) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Dados inválidos", issues: v.errors }));
      return;
    }
    const data = v.data;

    const host = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!host || !portRaw || !user || !pass) {
      console.error("SMTP env vars missing");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Servidor de e-mail não configurado" }));
      return;
    }

    const port = Number(portRaw);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      requireTLS: !secure,
    });

    const to = process.env.CONTACT_TO || "comercial@diretacargas.com.br";
    const subject = `Nova cotação — ${data.nome}${data.empresa ? ` (${data.empresa})` : ""}`;

    const text = [
      "Nova solicitação de cotação recebida pelo site:",
      "",
      `Nome: ${data.nome}`,
      `Empresa: ${data.empresa || "-"}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.telefone}`,
      `Origem: ${data.origem || "-"}`,
      `Destino: ${data.destino || "-"}`,
      "",
      "Detalhes da carga:",
      data.mensagem,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px;background:#fff;">
        <h2 style="margin:0 0 16px;color:#000;">Nova solicitação de cotação</h2>
        <p style="margin:0 0 16px;color:#444;">Recebida pelo formulário do site Direta Cargas.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 8px;border:1px solid #eee;width:140px;color:#666;">Nome</td><td style="padding:6px 8px;border:1px solid #eee;"><strong>${escapeHtml(data.nome)}</strong></td></tr>
          <tr><td style="padding:6px 8px;border:1px solid #eee;color:#666;">Empresa</td><td style="padding:6px 8px;border:1px solid #eee;">${escapeHtml(data.empresa || "-")}</td></tr>
          <tr><td style="padding:6px 8px;border:1px solid #eee;color:#666;">E-mail</td><td style="padding:6px 8px;border:1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:6px 8px;border:1px solid #eee;color:#666;">Telefone</td><td style="padding:6px 8px;border:1px solid #eee;">${escapeHtml(data.telefone)}</td></tr>
          <tr><td style="padding:6px 8px;border:1px solid #eee;color:#666;">Origem</td><td style="padding:6px 8px;border:1px solid #eee;">${escapeHtml(data.origem || "-")}</td></tr>
          <tr><td style="padding:6px 8px;border:1px solid #eee;color:#666;">Destino</td><td style="padding:6px 8px;border:1px solid #eee;">${escapeHtml(data.destino || "-")}</td></tr>
        </table>
        <h3 style="margin:24px 0 8px;color:#000;">Detalhes da carga</h3>
        <div style="white-space:pre-wrap;padding:12px;border:1px solid #eee;border-radius:6px;background:#fafafa;font-size:14px;">${escapeHtml(data.mensagem)}</div>
      </div>`;

    await transporter.sendMail({
      from: `"Site Direta Cargas" <${user}>`,
      to,
      replyTo: `${data.nome} <${data.email}>`,
      subject,
      text,
      html,
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true }));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Contact email send failed:", msg);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Falha ao enviar e-mail", detail: msg }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Direta Cargas API ouvindo em http://${HOST}:${PORT}`);
});
