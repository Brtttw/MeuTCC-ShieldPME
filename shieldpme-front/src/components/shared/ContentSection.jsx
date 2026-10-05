// Bloco de texto: título, parágrafo opcional, conteúdo extra e lista opcional
export default function ContentSection({ titulo, texto, itens, style, children }) {
  return (
    <div className="content-section" style={style}>
      <h2>{titulo}</h2>
      {texto && <p>{texto}</p>}
      {children}
      {itens && (
        <ul>
          {itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
