import PaginaInterna from '../components/shared/PaginaInterna';
import ContentSection from '../components/shared/ContentSection';
import useAsync from '../hooks/useAsync';
import { listarPosts } from '../services/blogService';
import { formatarData } from '../utils/formatadores';
import { paginaBlog, ultimasNoticias, secoesBlog } from '../data/blog';

export default function Blog() {
  const { dados: posts } = useAsync(listarPosts);

  return (
    <PaginaInterna titulo={paginaBlog.titulo} introducao={paginaBlog.introducao}>
      <ContentSection titulo={ultimasNoticias.titulo} texto={ultimasNoticias.texto}>
        <div className="blog-grid">
          {(posts ?? []).map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={`/imagens/${post.imagem}`} alt={post.textoAlternativo} />
              <div className="blog-card-content">
                <span className="date">{formatarData(post.data)}</span>
                <h3>{post.titulo}</h3>
                <p>{post.resumo}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      {secoesBlog.map((secao) => (
        <ContentSection key={secao.titulo} {...secao} />
      ))}
    </PaginaInterna>
  );
}
