import { useEffect, useState } from 'react';
import { criarSolicitacao } from '../../services/clienteService';

const VAZIO = { siteUrl: '', siteName: '', backendStack: '', databaseStack: '', repositoryUrl: '', notes: '' };

export default function NovaSolicitacao({ catalogo, servicoInicial, aoCriar }) {
  const [campos, setCampos] = useState(VAZIO);
  const [selecionados, setSelecionados] = useState({}); // serviceId -> { frequencyId, durationIntervals }
  const [erro, setErro] = useState('');
  const [criada, setCriada] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const frequencias = catalogo.dados?.frequencies ?? [];

  const disponivel = (servicoId) =>
    Boolean(catalogo.dados?.services.find((s) => s.id === servicoId)?.available);

  function alternar(servicoId) {
    if (!disponivel(servicoId)) return;
    setSelecionados((atual) => {
      if (atual[servicoId]) {
        const { [servicoId]: _removido, ...resto } = atual;
        return resto;
      }
      return { ...atual, [servicoId]: { frequencyId: frequencias[0]?.id ?? '', durationIntervals: 1 } };
    });
  }

  // Serviço escolhido na aba "Serviços"
  useEffect(() => {
    if (servicoInicial && frequencias.length && disponivel(servicoInicial)) {
      setSelecionados((atual) =>
        atual[servicoInicial]
          ? atual
          : { ...atual, [servicoInicial]: { frequencyId: frequencias[0].id, durationIntervals: 1 } }
      );
    }
  }, [servicoInicial, frequencias.length]);

  function alterar(e) {
    setCampos((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  function alterarItem(servicoId, nome, valor) {
    setSelecionados((atual) => ({ ...atual, [servicoId]: { ...atual[servicoId], [nome]: Number(valor) } }));
  }

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    setCriada(null);

    const ids = Object.keys(selecionados);
    if (!campos.siteUrl.trim()) return setErro('Informe o site que será analisado.');
    if (ids.length === 0) return setErro('Selecione ao menos um serviço.');

    setEnviando(true);
    try {
      const resposta = await criarSolicitacao({
        ...campos,
        siteUrl: campos.siteUrl.trim(),
        services: ids.map((id) => ({
          serviceId: Number(id),
          frequencyId: selecionados[id].frequencyId,
          durationIntervals: selecionados[id].durationIntervals,
        })),
      });
      setCriada(resposta);
      setCampos(VAZIO);
      setSelecionados({});
    } catch (e2) {
      setErro(e2.message);
    } finally {
      setEnviando(false);
    }
  }

  if (catalogo.carregando) return <p className="area-info">Carregando serviços...</p>;
  if (catalogo.erro) return <p className="area-erro" role="alert">{catalogo.erro.message}</p>;

  return (
    <form className="area-form" onSubmit={enviar}>
      <h3>Site ou ativo a ser analisado</h3>
      <input name="siteUrl" placeholder="https://www.seusite.com.br *" value={campos.siteUrl} onChange={alterar} maxLength={255} />
      <input name="siteName" placeholder="Nome do site (opcional)" value={campos.siteName} onChange={alterar} maxLength={100} />
      <input name="backendStack" placeholder="Tecnologia do backend (opcional)" value={campos.backendStack} onChange={alterar} maxLength={255} />
      <input name="databaseStack" placeholder="Banco de dados (opcional)" value={campos.databaseStack} onChange={alterar} maxLength={255} />
      <input name="repositoryUrl" placeholder="URL do repositório (opcional, para revisão de código)" value={campos.repositoryUrl} onChange={alterar} maxLength={255} />

      <h3>Serviços desejados</h3>
      {catalogo.dados.services.map((servico) => {
        const item = selecionados[servico.id];
        return (
          <div
            className={`area-opcao${item ? ' area-opcao--ativa' : ''}${servico.available ? '' : ' area-opcao--indisponivel'}`}
            key={servico.id}
          >
            <label>
              <input
                type="checkbox"
                checked={Boolean(item)}
                disabled={!servico.available}
                onChange={() => alternar(servico.id)}
              />{' '}
              {servico.name}
              {!servico.available && <span className="area-selo-breve">Em breve</span>}
            </label>
            {item && (
              <div className="area-opcao__config">
                <label>
                  Frequência
                  <select value={item.frequencyId} onChange={(e) => alterarItem(servico.id, 'frequencyId', e.target.value)}>
                    {frequencias.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Repetições
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={item.durationIntervals}
                    onChange={(e) => alterarItem(servico.id, 'durationIntervals', e.target.value)}
                  />
                </label>
              </div>
            )}
          </div>
        );
      })}

      <h3>Informações adicionais</h3>
      <textarea name="notes" rows="4" maxLength={2000} placeholder="Escopo, horários permitidos, contatos técnicos, restrições..." value={campos.notes} onChange={alterar} />

      {erro && <p className="area-erro" role="alert">{erro}</p>}
      {criada && (
        <p className="area-ok" role="status">
          Solicitação #{criada.id} enviada! Nossa equipe foi avisada.{' '}
          <button type="button" className="mini-btn" onClick={() => aoCriar(criada.id)}>Acompanhar</button>
        </p>
      )}

      <button type="submit" className="btn" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar solicitação'}
      </button>
    </form>
  );
}
