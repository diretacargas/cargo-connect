# Deploy do Site no Contabo VPS

Este projeto pode ser hospedado em qualquer VPS (incluindo Contabo) como um **site estático (SPA)** servido pelo Nginx.

## 1. Build local

No seu computador, gere o build de produção:

```bash
npm install
npm run build
```

A pasta `dist/` (ou `.output/public/`) conterá os arquivos estáticos.

> Nota: este template usa TanStack Start. O build padrão tem SSR para Cloudflare Workers. Para um VPS Contabo, recomenda-se servir apenas o frontend estático. Se precisar de SSR no Contabo, será necessário rodar Node.js (PM2) no servidor — abra um chamado se quiser esse caminho.

## 2. Enviar arquivos para o Contabo

Via SCP:

```bash
scp -r dist/* root@SEU_IP_CONTABO:/var/www/transcarga/
```

## 3. Configurar Nginx

Crie `/etc/nginx/sites-available/transcarga`:

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;

    root /var/www/transcarga;
    index index.html;

    # Compressão
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    # Cache de assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback — todas as rotas servem index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Ative e recarregue:

```bash
ln -s /etc/nginx/sites-available/transcarga /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## 4. HTTPS com Let's Encrypt

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

Pronto! Site no ar com SSL gratuito e renovação automática.
