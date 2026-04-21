# Deploy do site Direta Cargas no VPS Contabo (Node.js + PM2)

Este projeto usa **TanStack Start** com uma rota de servidor (`/api/contact`) que envia e-mails via SMTP do **UolHost**. Por isso, hospedamos como **app Node.js** (não como site estático). Abaixo o passo a passo completo, do zero, até o site no ar com HTTPS.

---

## Pré-requisitos

- 1 VPS Contabo (Ubuntu 22.04 ou superior recomendado)
- 1 domínio apontando para o IP do VPS (registros A `seudominio.com.br` e `www`)
- Acesso SSH como root (ou usuário com sudo)
- Credenciais SMTP do UolHost em mãos

---

## 1. Preparar o VPS

Conecte via SSH e instale o que é necessário:

```bash
ssh root@SEU_IP_CONTABO

# Atualiza pacotes
apt update && apt upgrade -y

# Node.js 20 (LTS) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx

# PM2 (gerenciador de processos)
npm install -g pm2

# Verificar
node -v   # deve exibir v20.x
npm -v
pm2 -v
nginx -v
```

---

## 2. Enviar o código para o VPS

A forma mais simples é versionar no GitHub e clonar no servidor. Se preferir enviar direto, use `scp` ou `rsync`.

```bash
# No VPS:
mkdir -p /var/www
cd /var/www
git clone https://github.com/SEU_USUARIO/direta-cargas.git
cd direta-cargas
```

> Sem repositório? Do seu computador local:
> ```bash
> rsync -avz --exclude node_modules --exclude .output ./ root@SEU_IP_CONTABO:/var/www/direta-cargas/
> ```

---

## 3. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto **no servidor**:

```bash
cd /var/www/direta-cargas
nano .env
```

Conteúdo (substitua pelos seus dados reais do UolHost):

```env
# SMTP UolHost
SMTP_HOST=smtp.uhserver.com
SMTP_PORT=587
SMTP_USER=comercial@diretacargas.com.br
SMTP_PASSWORD=SUA_SENHA_AQUI

# Node
NODE_ENV=production
PORT=3000
HOST=127.0.0.1
```

Salve com `Ctrl+O`, `Enter`, `Ctrl+X`.

> **Importante:** Confirme com o suporte UolHost o host e a porta corretos (geralmente `smtp.uhserver.com:587` com STARTTLS, ou `smtp.uhserver.com:465` com SSL).

---

## 4. Instalar dependências e gerar o build de produção (modo Node)

```bash
cd /var/www/direta-cargas
npm install
npm run build:node
```

O script `build:node` define `LOVABLE_TARGET=node` para que o Vite gere um servidor Node.js em `.output/server/index.mjs` em vez do bundle Cloudflare Workers.

> Se aparecer erro com `cross-env`, instale globalmente: `npm install -g cross-env` e refaça o build.

---

## 5. Subir o app com PM2

O arquivo `ecosystem.config.cjs` já está incluído no projeto e aponta para `.output/server/index.mjs` na porta `3000`.

```bash
mkdir -p /var/www/direta-cargas/logs
cd /var/www/direta-cargas

pm2 start ecosystem.config.cjs
pm2 save
pm2 startup    # copie e cole o comando que ele exibir, para iniciar o PM2 no boot

pm2 status     # verificar se está "online"
pm2 logs direta-cargas --lines 50    # ver logs em tempo real
```

Teste se o app responde localmente no VPS:

```bash
curl http://127.0.0.1:3000
```

Deve retornar o HTML do site.

---

## 6. Configurar Nginx como proxy reverso

Crie o arquivo de site:

```bash
nano /etc/nginx/sites-available/direta-cargas
```

Cole:

```nginx
server {
    listen 80;
    server_name diretacargas.com.br www.diretacargas.com.br;

    # Tamanho máximo de upload (formulário de contato)
    client_max_body_size 5M;

    # Compressão
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 60s;
    }
}
```

Ative e recarregue:

```bash
ln -s /etc/nginx/sites-available/direta-cargas /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Acesse `http://diretacargas.com.br` no navegador — o site deve carregar.

---

## 7. HTTPS gratuito com Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d diretacargas.com.br -d www.diretacargas.com.br
```

Siga as instruções (e-mail, aceitar termos, redirecionar HTTP→HTTPS = **sim**).

A renovação é automática (certbot já adiciona um cron). Para testar:

```bash
certbot renew --dry-run
```

---

## 8. Atualizações futuras (deploy de novas versões)

Sempre que alterar o código:

```bash
cd /var/www/direta-cargas
git pull                  # ou rsync do seu computador
npm install               # apenas se mudou package.json
npm run build:node
pm2 restart direta-cargas
pm2 logs direta-cargas --lines 30
```

---

## 9. Comandos úteis de manutenção

```bash
# Ver status do app
pm2 status

# Ver logs (Ctrl+C para sair)
pm2 logs direta-cargas

# Reiniciar
pm2 restart direta-cargas

# Parar
pm2 stop direta-cargas

# Ver consumo de memória/CPU
pm2 monit

# Recarregar Nginx após mudanças
nginx -t && systemctl reload nginx

# Ver logs do Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 10. Troubleshooting

**Site não abre / 502 Bad Gateway**
- `pm2 status` — o app está online?
- `pm2 logs direta-cargas` — tem erros?
- `curl http://127.0.0.1:3000` — responde?

**Formulário de contato retorna erro 500**
- Confirme as variáveis SMTP no `.env`
- Teste com `pm2 logs direta-cargas` enquanto envia o formulário
- Verifique com o UolHost se o IP do VPS pode autenticar SMTP

**Build falha com erro de memória no VPS**
- VPS de 1GB pode precisar de swap:
  ```bash
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  ```

**Variáveis de ambiente não carregam**
- O PM2 carrega `.env` automaticamente via Node. Se preferir explicitar:
  ```bash
  pm2 restart direta-cargas --update-env
  ```

---

Pronto! Site no ar em `https://diretacargas.com.br` com SSL, formulário de contato funcionando via SMTP do UolHost, e reinício automático do app caso o VPS reinicie.
