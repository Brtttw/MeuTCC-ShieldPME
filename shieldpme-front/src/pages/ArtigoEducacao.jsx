import { Link, Navigate, useParams } from 'react-router-dom';
import PaginaInterna from '../components/shared/PaginaInterna';
import { artigos, buscarArtigo } from '../data/educacao';

function Bloco({ bloco }) {
  switch (bloco.t) {
    case 'h2':
      return <h2>{bloco.x}</h2>;
    case 'ul':
      return (
        <ul>
          {bloco.x.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'aviso':
      return <p className="edu-aviso">{bloco.x}</p>;
    default:
      return <p>{bloco.x}</p>;
  }
}

export default function ArtigoEducacao() {
  const { slug } = useParams();
  const artigo = buscarArtigo(slug);
  if (!artigo) return <Navigate to="/educacao" replace />;

  const outros = artigos.filter((a) => a.slug !== slug);

  return (
    <PaginaInterna titulo={artigo.titulo} introducao={`${artigo.resumo} · ${artigo.leitura}`}>
      <article className="edu-artigo">
        {artigo.conteudo.map((bloco, i) => (
          <Bloco key={i} bloco={bloco} />
        ))}

        <div className="edu-rodape">
          <Link to="/educacao">← Todos os artigos</Link>
          {outros.map((a) => (
            <Link key={a.slug} to={`/educacao/${a.slug}`}>
              {a.titulo}
            </Link>
          ))}
        </div>
      </article>
    </PaginaInterna>
  );
}
