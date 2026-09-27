import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>shop-app</title>
      </Head>
      <main style={{ padding: '2rem' }}>
        <h1>🛍️ shop-app</h1>
        <p>
          Este é o app remoto do lab de micro-frontends. O catálogo que ele expõe
          via Module Federation aparece dentro do <strong>main-app</strong> (porta 3000).
        </p>
        <p>
          Veja o catálogo standalone em <a href="/catalog">/catalog</a> — ou abra o
          main-app na porta 3000 e veja este mesmo catálogo embutido na home.
        </p>
      </main>
    </>
  )
}
