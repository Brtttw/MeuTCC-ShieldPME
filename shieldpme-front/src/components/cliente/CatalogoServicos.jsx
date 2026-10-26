const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// Lista os serviços ativos cadastrados no backend
export default function CatalogoServicos({ catalogo, aoSolicitar }) {
  if (catalogo.carregando) return <p className="area-info">Carregando serviços...</p>;
  if (catalogo.erro) return <p className="area-erro" role="alert">{catalogo.erro.message}</p>;
  if (!catalogo.dados.services.length) return <p className="area-info">Nenhum serviço disponível no momento.</p>;

  return (
    <div className="area-grid">
      {catalogo.dados.services.map((servico) => (
        <div className="area-card" key={servico.id}>
          <h3>{servico.name}</h3>
          <p>{servico.description}</p>
          <p className="area-card__preco">A partir de {moeda.format(servico.basePrice)}</p>
          <button type="button" className="mini-btn" onClick={() => aoSolicitar(servico.id)}>
            Solicitar este serviço
          </button>
        </div>
      ))}
    </div>
  );
}
