import Head from 'next/head'

const produtos = [
  { id: 1, nome: 'Miniatura — Cavaleiro', preco: 'R$ 45,00', emoji: '⚔️' },
  { id: 2, nome: 'Miniatura — Dragão', preco: 'R$ 89,90', emoji: '🐉' },
  { id: 3, nome: 'Miniatura — Mago', preco: 'R$ 52,00', emoji: '🧙' },
  { id: 4, nome: 'Miniatura — Arqueira', preco: 'R$ 47,50', emoji: '🏹' },
  { id: 5, nome: 'Cenário — Ruínas', preco: 'R$ 120,00', emoji: '🏰' },
  { id: 6, nome: 'Cenário — Floresta', preco: 'R$ 98,00', emoji: '🌲' },
]

export default function Catalog() {
  return (
    <>
      <Head>
        <title>Catálogo — shop-app</title>
      </Head>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒 Catálogo de Miniaturas</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Este componente vem do <strong>shop-app</strong> (porta 3001) e é renderizado
          dentro do <strong>main-app</strong> (porta 3000) via Module Federation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {produtos.map((p) => (
            <div key={p.id}
              style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem' }}>{p.emoji}</div>
              <h3 style={{ margin: '0.5rem 0 0.25rem' }}>{p.nome}</h3>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#0070f3' }}>{p.preco}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
