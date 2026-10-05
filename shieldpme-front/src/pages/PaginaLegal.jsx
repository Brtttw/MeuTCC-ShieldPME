// Privacidade e Termos de Uso: o texto vem de src/data/paginasLegais.js
export default function PaginaLegal({ conteudo }) {
  return (
    <section className="extra-page">
      <div className="extra-container">
        <div className="extra-header">
          <h1>{conteudo.titulo}</h1>
          <p>{conteudo.introducao}</p>
        </div>

        {conteudo.secoes.map((secao) => (
          <div className="extra-section" key={secao.titulo}>
            <h3>{secao.titulo}</h3>
            <p>{secao.texto}</p>

            {secao.itens && (
              <ul className="extra-list">
                {secao.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
