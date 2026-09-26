# 🧩 Lab — Micro-frontends com Next.js

## 📖 Sobre

Dois apps independentes que compartilham componentes em runtime:

- `main-app/` — host (Next 13): expõe a navegação e consome `shop/catalog` via `dynamic(import('shop/catalog'))`
- `shop-app/` — remote (Next 16 + React 19): expõe a página de catálogo
- `main-app/pages/catalogOnMain.js` — página dedicada que carrega a rota do shop

## 🚀 Como rodar

```bash
# terminal 1
cd shop-app && npm install && npm run dev

# terminal 2
cd main-app && npm install && npm run dev
```

## 🛠️ Tecnologias

Next.js • Module Federation (@module-federation/nextjs-mf) • Webpack 5

## 💡 O que aprendi

- Configuração de host/remote no Module Federation para Next.js
- Importação dinâmica de módulos remotos entre apps de versões diferentes
