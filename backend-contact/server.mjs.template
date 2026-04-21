import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import nodemailer from "nodemailer";

const ContactSchema = z.object({
  nome: z.string().trim().min(1, "Nome obrigatório").max(120),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(160),
  telefone: z.string().trim().min(8, "Telefone inválido").max(40),
  origem: z.string().trim().max(160).optional().or(z.literal("")),
  destino: z.string().trim().max(160).optional().or(z.literal("")),
  mensagem: z.string().trim().min(1, "Mensagem obrigatória").max(4000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = ContactSchema.safeParse(json);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({
                error: "Dados inválidos",
                issues: parsed.error.flatten(),
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const data = parsed.data;

          const host = process.env.SMTP_HOST;
          const portRaw = process.env.SMTP_PORT;
          const user = process.env.SMTP_USER;
          const pass = process.env.SMTP_PASSWORD;

          if (!host || !portRaw || !user || !pass) {
            console.error("SMTP env vars missing");
            return new Response(
              JSON.stringify({ error: "Servidor de e-mail não configurado" }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          const port = Number(portRaw);
          const secure = port === 465; // 465=SSL, 587=STARTTLS

          const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
            requireTLS: !secure,
          });

          const to = "comercial@diretacargas.com.br";
          const subject = `Nova cotação — ${data.nome}${data.empresa ? ` (${data.empresa})` : ""}`;

          const textLines = [
            `Nova solicitação de cotação recebida pelo site:`,
            ``,
            `Nome: ${data.nome}`,
            `Empresa: ${data.empresa || "-"}`,
            `E-mail: ${data.email}`,
            `Telefone: ${data.telefone}`,
            `Origem: ${data.origem || "-"}`,
            `Destino: ${data.destino || "-"}`,
            ``,
            `Detalhes da carga:`,
            data.mensagem,
          ];
          const text = textLines.join("\n");

          const html = `
            <div style="font-family:Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px;background:#ffffff;">
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
            </div>
          `;

          await transporter.sendMail({
            from: `"Site Direta Cargas" <${user}>`,
            to,
            replyTo: `${data.nome} <${data.email}>`,
            subject,
            text,
            html,
          });

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("Contact email send failed:", msg);
          return new Response(
            JSON.stringify({ error: "Falha ao enviar e-mail", detail: msg }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
