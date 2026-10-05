import PaginaInterna from '../components/shared/PaginaInterna';
import ContentSection from '../components/shared/ContentSection';
import { paginaMinhaConta, secoesConta, destaquesConta } from '../data/minhaConta';

export default function MinhaConta() {
  return (
    <PaginaInterna titulo={paginaMinhaConta.titulo} introducao={paginaMinhaConta.introducao}>
      {secoesConta.map((secao) => (
        <ContentSection key={secao.titulo} {...secao} />
      ))}

      <div className="account-highlights">
        {destaquesConta.map(({ titulo, texto }) => (
          <div className="account-highlight" key={titulo}>
            <h4>{titulo}</h4>
            <p>{texto}</p>
          </div>
        ))}
      </div>
    </PaginaInterna>
  );
}
