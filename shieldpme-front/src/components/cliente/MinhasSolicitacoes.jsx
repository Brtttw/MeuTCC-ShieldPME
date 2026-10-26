import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync';
import StatusBadge from '../shared/StatusBadge';
import DetalheSolicitacaoCliente from './DetalheSolicitacaoCliente';
import { listarSolicitacoes, obterSolicitacao } from '../../services/clienteService';
import { formatarDataHora } from '../../utils/rotulos';

export default function MinhasSolicitacoes({ selecionadaInicial, versao }) {
  const [selecionada, setSelecionada] = useState(selecionadaInicial ?? null);
  const lista = useAsync(listarSolicitacoes, [versao]);
  const detalhe = useAsync(() => (selecionada ? obterSolicitacao(selecionada) : Promise.resolve(null)), [selecionada, versao]);

  useEffect(() => {
    if (selecionadaInicial) setSelecionada(selecionadaInicial);
  }, [selecionadaInicial]);

  if (lista.carregando) return <p className="area-info">Carregando solicitações...</p>;
  if (lista.erro) return <p className="area-erro" role="alert">{lista.erro.message}</p>;
  if (!lista.dados.length) return <p className="area-info">Você ainda não enviou nenhuma solicitação.</p>;

  return (
    <div className="area-duas-colunas">
      <div className="area-lista">
        {lista.dados.map((s) => (
          <div
            key={s.id}
            className={`area-lista__item${selecionada === s.id ? ' area-lista__item--ativo' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => setSelecionada(s.id)}
            onKeyDown={(e) => e.key === 'Enter' && setSelecionada(s.id)}
          >
            <strong>#{s.id}</strong> <StatusBadge status={s.status} />
            <span>{s.serviceNames.join(', ')}</span>
            <small>{s.siteUrl} · {formatarDataHora(s.createdAt)}</small>
          </div>
        ))}
      </div>

      <div>
        {!selecionada && <p className="area-info">Selecione uma solicitação para ver os detalhes.</p>}
        {selecionada && detalhe.carregando && <p className="area-info">Carregando...</p>}
        {selecionada && detalhe.erro && <p className="area-erro" role="alert">{detalhe.erro.message}</p>}
        {selecionada && detalhe.dados && <DetalheSolicitacaoCliente solicitacao={detalhe.dados} />}
      </div>
    </div>
  );
}
