# 🧩 Lab — Micro-frontends com Next.js

Laboratório do módulo de Front-End da EBAC demonstrando **micro-frontends com Module Federation**: dois apps Next.js independentes que compartilham componentes **em tempo de execução**.

## 🏛️ A ideia em uma frase

Cada app é uma "loja" independente (com suas próprias dependências e build), mas todos se encaixam na mesma "página-shopping" — o usuário vê um site só, sem iframes e sem links entre apps.

```
┌─────────────────────────────┐      ┌─────────────────────────────┐
│  main-app (porta 3000)      │      │  shop-app (porta 3001)      │
│  Next 13 + React 18         │      │  Next 13 + React 18         │
│  ─────────────────────────  │      │  ─────────────────────────  │
│  HOST: consome remotes      │◄─────┼── REMOTE: expõe componentes │
│  remotes: { shop }          │ HTTP │  exposes: { './catalog' }   │
│  exposes: { ./nav, ./footer }      │  filename: remoteEntry.js   │
└─────────────────────────────┘      └─────────────────────────────┘
```

## ⚙️ Onde a mágica acontece

Tudo vive no `next.config.js` de cada app, via `NextFederationPlugin`:

**shop-app** (o "remote" — quem OFERECE componentes):

```js
new NextFederationPlugin({
  name: 'shop',                              // nome público do app
  filename: 'static/chunks/remoteEntry.js',  // o "contrato" que ele publica
  exposes: {
    './catalog': './pages/catalog.js',       // o que ele oferece
  },
})
```

**main-app** (o "host" — quem CONSOME):

```js
new NextFederationPlugin({
  name: 'main',
  remotes: {
    // nome@onde-está-o-contrato-do-outro-app
    shop: `shop@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
  },
  exposes: {
    './footer': './components/Footer.js',    // host também pode oferecer!
    './nav': './components/Nav.js',
  },
})
```

E na página do main-app, o componente remoto entra como se fosse local:

```js
const CatalogComponent = dynamic(() => import("shop/catalog"))
//                              ↑  "shop" vem do remotes
//                                   "catalog" vem do exposes './catalog'
```

## ▶️ Como rodar

```bash
# terminal 1 — o remote (porta 3001)
cd shop-app && npm install && npm run dev

# terminal 2 — o host (em outra aba)
cd main-app && npm install && npm run dev
```

Abra **http://localhost:3000**: a home do main-app renderiza o **catálogo do shop-app** embutido — componente de verdade, compartilhando a mesma página, sem iframe. O catálogo também existe standalone em `localhost:3001/catalog`.

## ➕ Como adicionar um 3º projeto (receita)

1. Crie o app (ex.: `blog-app`) e instale `@module-federation/nextjs-mf@^6.0.4`
2. No `next.config.js` dele: `name: 'blog'`, `filename: 'static/chunks/remoteEntry.js'` e `exposes: { './post': './components/Post.js' }`
3. No `main-app/next.config.js`, adicione ao `remotes`:
   `blog: 'blog@http://localhost:3002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js'`
4. No main-app: `const Post = dynamic(() => import("blog/post"))` e use `<Post/>`
5. Suba os apps juntos — cada um na sua porta

**Regra de ouro:** quem consome declara `remotes`; quem oferece declara `exposes`; o par `nome@http://.../remoteEntry.js` precisa bater dos dois lados.

## ⚠️ Nota sobre versões

O plugin `@module-federation/nextjs-mf` suporta Next **12–14**. Por isso os dois apps aqui usam **Next 13.5.6 + React 18** — misturar com Next 16 (Turbopack) quebra o plugin (`compilation.addLazyRuntimeModule is not a function`). Se um dia precisar de Next 15+, o caminho é o novo `@module-federation/enhanced` (rsbuild) ou Native Federation.

## 🛠️ Tecnologias

Next.js 13 • Module Federation (`@module-federation/nextjs-mf`) • Webpack 5 • React 18

---

📚 Parte do curso de Front-End da [EBAC](https://ebaconline.com.br) — veja os outros módulos no [meu perfil](https://github.com/dudsfcosta?tab=repositories).
