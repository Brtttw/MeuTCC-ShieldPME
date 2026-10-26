import StatusBadge from '../shared/StatusBadge';
import BotoesPdf from '../shared/BotoesPdf';
import { baixarRelatorio } from '../../services/clienteService';
import { formatarData, formatarDataHora } from '../../utils/rotulos';

export default function DetalheSolicitacaoCliente({ solicitacao }) {
  return (
    <div className="area-detalhe">
      <h3>
        Solicitação #{solicitacao.id} <StatusBadge status={solicitacao.status} />
      </h3>
      <p className="area-info">Enviada em {formatarDataHora(solicitacao.createdAt)}</p>
      {solicitacao.site && <p>Site: <strong>{solicitacao.site.url}</strong></p>}
      {solicitacao.notes && <p>Informações adicionais: {solicitacao.notes}</p>}

      {solicitacao.services.map((servico) => (
        <div className="area-servico" key={servico.contractServiceId}>
          <h4>{servico.serviceName} <small>({servico.frequencyName} × {servico.durationIntervals})</small></h4>
          {servico.executions.map((ex) => (
            <div className="area-execucao" key={ex.id}>
              <span>Execução {ex.number} — prevista para {formatarData(ex.dueDate)}</span>
              <StatusBadge status={ex.status} />
              {ex.report ? (
                <BotoesPdf buscarBlob={() => baixarRelatorio(ex.report.id)} nomeArquivo={ex.report.fileName} />
              ) : (
                <small className="area-info">Relatório ainda não disponível</small>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
