# Deploy do site Direta Cargas no VPS Contabo (SPA + Nginx + API Node)

Este projeto agora é um **SPA estático** (build Vite gera `dist/` com `index.html`).
O formulário de contato é atendido por um **backend Node separado** (pasta `backend-contact/`) que envia e-mails via SMTP UOL Host.

```
[ Navegador ] → Nginx (80/443) ─┬─→ /var/www/direta-cargas/dist  (HTML/CSS/JS estático)
                                └─→ proxy /api/* → Node em 127.0.0.1:3001 (PM2)
```

---

## 1. Build local (na sua máquina)

```bash
npm install
npm run build
```

Saída: pasta **`dist/`**.

---

## 2. Preparar o VPS (uma única vez)

```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx git
npm install -g pm2

mkdir -p /var/www/direta-cargas/dist
mkdir -p /var/www/direta-cargas/backend-contact
mkdir -p /var/www/direta-cargas/logs
```

---

## 3. Enviar arquivos para o VPS

Da raiz do projeto, na sua máquina local:

```bash
# Site estático
scp -r dist/* root@SEU-IP-VPS:/var/www/direta-cargas/dist/

# Backend de contato
scp -r backend-contact/* root@SEU-IP-VPS:/var/www/direta-cargas/backend-contact/
scp ecosystem.config.cjs root@SEU-IP-VPS:/var/www/direta-cargas/
```

---

## 4. Configurar o backend de contato (no VPS)

```bash
cd /var/www/direta-cargas/backend-contact
npm install --omit=dev
cp .env.example .env
nano .env
```

Preencha:

```
PORT=3001
HOST=127.0.0.1
SMTP_HOST=smtp.uhserver.com
SMTP_PORT=587
SMTP_USER=comercial@diretacargas.com.br
SMTP_PASSWORD=sua-senha-real
CONTACT_TO=comercial@diretacargas.com.br
ALLOWED_ORIGIN=https://diretacargas.com.br
```

Inicie com PM2:

```bash
cd /var/www/direta-cargas
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup    # cole o comando que ele exibir
```

Teste: `curl http://127.0.0.1:3001/api/health` deve responder `{"ok":true,...}`.

---

## 5. Configurar o Nginx

Crie `/etc/nginx/sites-available/direta-cargas`:

```nginx
server {
    listen 80;
    server_name diretacargas.com.br www.diretacargas.com.br;

    root /var/www/direta-cargas/dist;
    index index.html;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/direta-cargas /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

---

## 6. SSL/HTTPS com Certbot

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d diretacargas.com.br -d www.diretacargas.com.br
```

---

## 7. Apontar o domínio

| Tipo | Nome | Valor          |
|------|------|----------------|
| A    | @    | IP-DO-SEU-VPS  |
| A    | www  | IP-DO-SEU-VPS  |

---

## 8. Atualizar o site depois

Front:

```bash
npm run build
scp -r dist/* root@SEU-IP-VPS:/var/www/direta-cargas/dist/
```

Backend:

```bash
scp -r backend-contact/* root@SEU-IP-VPS:/var/www/direta-cargas/backend-contact/
ssh root@SEU-IP-VPS "cd /var/www/direta-cargas/backend-contact && npm install --omit=dev && pm2 restart direta-cargas-api"
```

---

## Comandos úteis no VPS

```bash
pm2 status
pm2 logs direta-cargas-api
pm2 restart direta-cargas-api
systemctl status nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## Observações

- **Front-end 100% estático**: `dist/` funciona em qualquer hospedagem estática (Nginx, Apache, S3, Cloudflare Pages...).
- **Backend opcional**: se não quiser e-mail via SMTP, pule o PM2 e remova o bloco `location /api/` do Nginx — o resto do site funciona. Substitua o formulário por WhatsApp/mailto.
- **CORS**: como Nginx serve site e API no mesmo domínio, não há problema de CORS. Se hospedar a API em outro domínio, ajuste `ALLOWED_ORIGIN` e defina `VITE_API_URL` no build do front.
