export default function Catalogo() {

    const produtos = ["Notebook", "Celular", "Fone de Ouvido"];
    return (
        <>
            <h2>Catalogo</h2>
            <ul>
                {produtos.map((p) => (
                    <li key={p}> {p}
                    <button onClick={() =>{
                    window.dispatchEvent(new CustomEvent("adicionarCarrinho", {detail: p}))
                    }}>Adicionar</button>
                    </li>
                ))
                }
            </ul>
        </>
    )
}