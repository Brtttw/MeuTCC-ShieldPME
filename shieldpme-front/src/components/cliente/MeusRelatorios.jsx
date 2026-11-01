import useAsync from '../../hooks/useAsync';
import BotoesPdf from '../shared/BotoesPdf';
import { baixarRelatorio, listarRelatorios } from '../../services/clienteService';
import { formatarDataHora } from '../../utils/rotulos';

export default function MeusRelatorios({ versao }) {
  const relatorios = useAsync(listarRelatorios, [versao]);

  if (relatorios.carregando) return <p className="area-info">Carregando relatórios...</p>;
  if (relatorios.erro) return <p className="area-erro" role="alert">{relatorios.erro.message}</p>;
  if (!relatorios.dados.length) return <p className="area-info">Nenhum relatório disponibilizado até o momento.</p>;

  return (
    <div className="area-lista">
      {relatorios.dados.map((r) => (
        <div className="area-lista__item" key={r.reportId}>
          <strong>{r.title}</strong>
          <span>{r.serviceName} — execução {r.executionNumber} (solicitação #{r.requestId})</span>
          <small>{r.siteUrl} · liberado em {formatarDataHora(r.releasedAt)}</small>
          <BotoesPdf buscarBlob={() => baixarRelatorio(r.reportId)} nomeArquivo={r.fileName} />
        </div>
      ))}
    </div>
  );
}
