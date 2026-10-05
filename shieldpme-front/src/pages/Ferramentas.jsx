import PaginaInterna from '../components/shared/PaginaInterna';
import useAsync from '../hooks/useAsync';
import { listarFerramentas } from '../services/ferramentaService';
import { paginaFerramentas } from '../data/ferramentas';

export default function Ferramentas() {
  const { dados: ferramentas } = useAsync(listarFerramentas);

  return (
    <PaginaInterna titulo={paginaFerramentas.titulo} introducao={paginaFerramentas.introducao}>
      <div className="tools-list">
        {(ferramentas ?? []).map((ferramenta) => (
          <div className="tool-item" key={ferramenta.id}>
            <h3>{ferramenta.nome}</h3>
            <p>{ferramenta.descricao}</p>
            <ul>
              {ferramenta.recursos.map((recurso) => (
                <li key={recurso}>{recurso}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PaginaInterna>
  );
}
