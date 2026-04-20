// @lovable.dev/vite-tanstack-config já inclui:
//   tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (apenas em build),
//   componentTagger (dev), injeção de VITE_*, alias @, dedupe de React/TanStack,
//   plugins de error logging e detecção de sandbox.
//
// Para hospedar no VPS (Contabo) com Node.js + PM2 desativamos o adapter Cloudflare
// definindo a variável LOVABLE_TARGET=node no momento do build.
// No ambiente Lovable (preview/sandbox) a variável NÃO é definida, então o build
// continua usando o adapter Cloudflare normalmente.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isNodeTarget = process.env.LOVABLE_TARGET === "node";

export default defineConfig({
  tanstack: {
    start: {
      target: isNodeTarget ? "node-server" : undefined,
    },
  },
});
