import { useState } from 'react';
import StatusBadge from '../shared/StatusBadge';
import BotoesPdf from '../shared/BotoesPdf';
import { assumirExecucao, baixarRelatorio, enviarRelatorio } from '../../services/funcionarioService';
import { formatarCnpj, formatarData, formatarDataHora } from '../../utils/rotulos';

const TAMANHO_MAX_MB = 10;

// Uma execução: assumir atendimento e anexar o PDF já preparado pelo funcionário
function Execucao({ execucao, servico, solicitacaoId, aoAtualizar }) {
  const [arquivo, setArquivo] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');
  const [ok, setOk] = useState('');

  async function assumir() {
    setErro('');
    setOk('');
    setOcupado(true);
    try {
      await assumirExecucao(execucao.id);
      await aoAtualizar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado(false);
    }
  }

  function escolher(e) {
    const escolhido = e.target.files?.[0] ?? null;
    setErro('');
    if (escolhido && escolhido.size > TAMANHO_MAX_MB * 1024 * 1024) {
      setArquivo(null);
      return setErro(`O arquivo excede ${TAMANHO_MAX_MB} MB.`);
    }
    setArquivo(escolhido);
  }

  async function enviar(e) {
    e.preventDefault();
    if (!arquivo) return setErro('Selecione um arquivo PDF.');
    setErro('');
    setOk('');
    setOcupado(true);
    try {
      await enviarRelatorio(execucao.id, arquivo, titulo);
      setArquivo(null);
      setTitulo('');
      setOk('Relatório enviado e disponibilizado ao cliente.');
      await aoAtualizar();
    } catch (e2) {
      setErro(e2.message);
    } finally {
      setOcupado(false);
    }
  }

  const encerrada = execucao.status === 'CANCELLED';

  return (
    <div className="area-execucao area-execucao--coluna">
      <div>
        <strong>Execução {execucao.number}</strong> — prevista para {formatarData(execucao.dueDate)}{' '}
        <StatusBadge status={execucao.status} />
        <small className="area-info">
          {' '}Atendimento: {execucao.assignedTo.length ? execucao.assignedTo.join(', ') : 'ninguém assumiu ainda'}
        </small>
      </div>

      {execucao.report && (
        <div>
          Relatório atual: <strong>{execucao.report.title}</strong> ({execucao.report.fileName}){' '}
          {execucao.assignedToMe && (
            <BotoesPdf buscarBlob={() => baixarRelatorio(execucao.report.id)} nomeArquivo={execucao.report.fileName} />
          )}
        </div>
      )}

      {!encerrada && !execucao.assignedToMe && (
        <div>
          <button type="button" className="mini-btn" disabled={ocupado} onClick={assumir}>
            Assumir atendimento
          </button>
        </div>
      )}

      {!encerrada && execucao.assignedToMe && (
        <form className="area-upload" onSubmit={enviar}>
          <small className="area-info">
            Anexando para: solicitação #{solicitacaoId} · {servico.serviceName} · execução {execucao.number}
          </small>
          <input
            placeholder="Título do relatório (opcional)"
            value={titulo}
            maxLength={200}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input type="file" accept="application/pdf,.pdf" onChange={escolher} />
          <button type="submit" className="mini-btn" disabled={ocupado || !arquivo}>
            {ocupado ? 'Enviando...' : execucao.report ? 'Substituir relatório PDF' : 'Enviar relatório PDF'}
          </button>
        </form>
      )}

      {erro && <p className="area-erro" role="alert">{erro}</p>}
      {ok && <p className="area-ok" role="status">{ok}</p>}
    </div>
  );
}

export default function DetalheSolicitacaoFuncionario({ solicitacao, aoAtualizar }) {
  return (
    <div className="area-detalhe">
      <h3>
        Solicitação #{solicitacao.id} <StatusBadge status={solicitacao.status} />
      </h3>
      <p className="area-info">Recebida em {formatarDataHora(solicitacao.createdAt)}</p>

      <div className="area-bloco">
        <h4>Cliente e empresa</h4>
        <p>Empresa: <strong>{solicitacao.company.name}</strong> (CNPJ {formatarCnpj(solicitacao.company.cnpj)})</p>
        <p>Contato: {solicitacao.client.email}{solicitacao.client.phone ? ` · ${solicitacao.client.phone}` : ''}</p>
      </div>

      {solicitacao.site && (
        <div className="area-bloco">
          <h4>Site / ativo</h4>
          <p>{solicitacao.site.name ? `${solicitacao.site.name} — ` : ''}<strong>{solicitacao.site.url}</strong></p>
          {solicitacao.site.backendStack && <p>Backend: {solicitacao.site.backendStack}</p>}
          {solicitacao.site.databaseStack && <p>Banco de dados: {solicitacao.site.databaseStack}</p>}
          {solicitacao.site.repositoryUrl && <p>Repositório: {solicitacao.site.repositoryUrl}</p>}
        </div>
      )}

      {solicitacao.notes && (
        <div className="area-bloco">
          <h4>Informações adicionais</h4>
          <p className="area-texto-livre">{solicitacao.notes}</p>
        </div>
      )}

      <h4>Serviços solicitados</h4>
      {solicitacao.services.map((servico) => (
        <div className="area-servico" key={servico.contractServiceId}>
          <h4>{servico.serviceName} <small>({servico.frequencyName} × {servico.durationIntervals})</small></h4>
          {servico.executions.map((ex) => (
            <Execucao
              key={ex.id}
              execucao={ex}
              servico={servico}
              solicitacaoId={solicitacao.id}
              aoAtualizar={aoAtualizar}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
