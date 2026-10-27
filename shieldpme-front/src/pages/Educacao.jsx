import { Link } from 'react-router-dom';
import PaginaInterna from '../components/shared/PaginaInterna';
import { artigos, paginaEducacao } from '../data/educacao';

export default function Educacao() {
  return (
    <PaginaInterna titulo={paginaEducacao.titulo} introducao={paginaEducacao.introducao}>
      <div className="blog-grid">
        {artigos.map((artigo) => (
          <Link className="blog-card edu-card" to={`/educacao/${artigo.slug}`} key={artigo.slug}>
            <div className="blog-card-content">
              <span className="date">{artigo.leitura}</span>
              <h3>{artigo.titulo}</h3>
              <p>{artigo.resumo}</p>
              <span className="edu-card__ler">Ler artigo →</span>
            </div>
          </Link>
        ))}
      </div>
    </PaginaInterna>
  );
}
