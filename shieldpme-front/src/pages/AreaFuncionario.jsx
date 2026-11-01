import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaginaInterna from '../components/shared/PaginaInterna';
import StatusBadge from '../components/shared/StatusBadge';
import DetalheSolicitacaoFuncionario from '../components/funcionario/DetalheSolicitacaoFuncionario';
import { listarSolicitacoes, obterSolicitacao } from '../services/funcionarioService';
import { formatarDataHora } from '../utils/rotulos';

export default function AreaFuncionario() {
  const [params, setParams] = useSearchParams();
  const selecionada = params.get('solicitacao') ? Number(params.get('solicitacao')) : null;

  const [lista, setLista] = useState({ dados: [], carregando: true, erro: '' });
  const [detalhe, setDetalhe] = useState({ dados: null, carregando: false, erro: '' });

  const carregarLista = useCallback(async () => {
    try {
      setLista({ dados: await listarSolicitacoes(), carregando: false, erro: '' });
    } catch (e) {
      setLista((atual) => ({ ...atual, carregando: false, erro: e.message }));
    }
  }, []);

  const carregarDetalhe = useCallback(async () => {
    if (!selecionada) return setDetalhe({ dados: null, carregando: false, erro: '' });
    try {
      setDetalhe((atual) => ({ ...atual, carregando: atual.dados?.id !== selecionada, erro: '' }));
      setDetalhe({ dados: await obterSolicitacao(selecionada), carregando: false, erro: '' });
    } catch (e) {
      setDetalhe({ dados: null, carregando: false, erro: e.message });
    }
  }, [selecionada]);

  useEffect(() => {
    carregarLista();
    const timer = setInterval(carregarLista, 30_000); // novas solicitações aparecem sem recarregar
    return () => clearInterval(timer);
  }, [carregarLista]);

  useEffect(() => {
    carregarDetalhe();
  }, [carregarDetalhe]);

  async function aposAlterar() {
    await Promise.all([carregarDetalhe(), carregarLista()]);
  }

  return (
    <PaginaInterna
      titulo="Área do funcionário"
      introducao="Solicitações recebidas dos clientes. Assuma o atendimento e anexe o relatório em PDF de cada execução."
    >
      {lista.carregando && <p className="area-info">Carregando solicitações...</p>}
      {lista.erro && <p className="area-erro" role="alert">{lista.erro}</p>}
      {!lista.carregando && !lista.erro && lista.dados.length === 0 && (
        <p className="area-info">Nenhuma solicitação recebida até o momento.</p>
      )}

      {lista.dados.length > 0 && (
        <div className="area-duas-colunas">
          <div className="area-lista">
            {lista.dados.map((s) => (
              <div
                key={s.id}
                className={`area-lista__item${selecionada === s.id ? ' area-lista__item--ativo' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setParams({ solicitacao: String(s.id) })}
                onKeyDown={(e) => e.key === 'Enter' && setParams({ solicitacao: String(s.id) })}
              >
                <strong>#{s.id} — {s.companyName}</strong> <StatusBadge status={s.status} />
                <span>{s.serviceNames.join(', ')}</span>
                <small>{s.siteUrl} · {formatarDataHora(s.createdAt)}</small>
              </div>
            ))}
          </div>

          <div>
            {!selecionada && <p className="area-info">Selecione uma solicitação (ou clique numa notificação).</p>}
            {selecionada && detalhe.carregando && <p className="area-info">Carregando detalhes...</p>}
            {selecionada && detalhe.erro && <p className="area-erro" role="alert">{detalhe.erro}</p>}
            {selecionada && detalhe.dados && (
              <DetalheSolicitacaoFuncionario solicitacao={detalhe.dados} aoAtualizar={aposAlterar} />
            )}
          </div>
        </div>
      )}
    </PaginaInterna>
  );
}
