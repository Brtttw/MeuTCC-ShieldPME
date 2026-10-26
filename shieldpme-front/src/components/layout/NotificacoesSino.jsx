import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarNotificacoes, marcarNotificacaoLida } from '../../services/funcionarioService';
import { formatarDataHora } from '../../utils/rotulos';

const INTERVALO_MS = 30_000; // atualização por consulta periódica (sem WebSockets)

// Sino de notificações do funcionário: avisa de novas solicitações e abre a área de solicitações ao clicar
export default function NotificacoesSino() {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [lista, setLista] = useState({ unread: 0, items: [] });
  const [falhou, setFalhou] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setLista(await listarNotificacoes());
      setFalhou(false);
    } catch {
      setFalhou(true);
    }
  }, []);

  useEffect(() => {
    carregar();
    const timer = setInterval(carregar, INTERVALO_MS);
    return () => clearInterval(timer);
  }, [carregar]);

  async function abrir(notificacao) {
    setAberto(false);
    if (!notificacao.read) {
      try {
        await marcarNotificacaoLida(notificacao.id);
      } catch {
        /* a leitura é só informativa; segue para a solicitação */
      }
    }
    navigate(`/area-funcionario?solicitacao=${notificacao.contractId}`);
    carregar();
  }

  function aoTeclar(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setAberto((valor) => !valor);
    }
  }

  return (
    <li className="sino">
      <span
        className="sino__gatilho"
        role="button"
        tabIndex={0}
        aria-label={`Notificações (${lista.unread} não lidas)`}
        onClick={() => setAberto((valor) => !valor)}
        onKeyDown={aoTeclar}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {lista.unread > 0 && <span className="sino__contador">{lista.unread > 9 ? '9+' : lista.unread}</span>}
      </span>

      {aberto && (
        <div className="sino__painel">
          <div className="sino__titulo">Notificações</div>
          {falhou && <div className="sino__vazio">Não foi possível atualizar agora.</div>}
          {!falhou && lista.items.length === 0 && <div className="sino__vazio">Nenhuma notificação.</div>}
          {lista.items.map((n) => (
            <div
              key={n.id}
              className={`sino__item${n.read ? '' : ' sino__item--nova'}`}
              role="button"
              tabIndex={0}
              onClick={() => abrir(n)}
              onKeyDown={(e) => e.key === 'Enter' && abrir(n)}
            >
              <span>{n.message}</span>
              <small>{formatarDataHora(n.createdAt)}</small>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
