// Moldura das páginas "tela cheia" (contato, minha conta, blog, ferramentas)
export default function PaginaInterna({ titulo, introducao, children }) {
  return (
    <section className="new-page">
      <div className="new-page-container">
        <div className="new-page-header">
          <h1>{titulo}</h1>
          <p>{introducao}</p>
        </div>

        {children}
      </div>
    </section>
  );
}
