import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CHAVE_ESCOLHA = 'cookiesChoice';

// Ponto de integração com ferramentas de analytics/marketing
function aplicarCookies(preferencias) {
  if (preferencias.analytics) console.log('Analytics ativado');
  if (preferencias.marketing) console.log('Marketing ativado');
}

export default function CookieBanner({ liberado }) {
  const [bannerAberto, setBannerAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // O banner só aparece depois da tela de carregamento, se ainda não houve escolha
  useEffect(() => {
    if (liberado && !localStorage.getItem(CHAVE_ESCOLHA)) setBannerAberto(true);
  }, [liberado]);

  function salvarEscolha(preferencias) {
    localStorage.setItem(CHAVE_ESCOLHA, JSON.stringify(preferencias));
    setBannerAberto(false);
    setModalAberto(false);
    aplicarCookies(preferencias);
  }

  return (
    <>
      <div className={`cookie-banner${bannerAberto ? ' show' : ''}`}>
        <div className="cookie-content">
          <div className="cookie-text">
            <strong>Valorizamos sua privacidade</strong>
            <p>
              Utilizamos cookies para melhorar sua experiência, personalizar conteúdos e analisar o
              tráfego. Você pode aceitar, rejeitar ou personalizar.
              <br />
              <Link to="/privacidade">Política de Privacidade</Link>
            </p>
          </div>

          <div className="cookie-actions">
            <button className="btn-outline" onClick={() => setModalAberto(true)}>
              Personalizar
            </button>
            <button
              className="btn-reject"
              onClick={() => salvarEscolha({ necessary: true, analytics: false, marketing: false })}
            >
              Rejeitar
            </button>
            <button
              className="btn-accept"
              onClick={() => salvarEscolha({ necessary: true, analytics: true, marketing: true })}
            >
              Aceitar tudo
            </button>
          </div>
        </div>
      </div>

      <div
        className={`cookie-modal${modalAberto ? ' cookie-modal--aberto' : ''}`}
        onClick={(e) => e.target === e.currentTarget && setModalAberto(false)}
      >
        <div className="cookie-modal-content">
          <h2>Preferências de Privacidade</h2>
          <p>Gerencie como usamos seus dados.</p>

          <div className="cookie-option">
            <label>
              <input type="checkbox" checked disabled />{' '}
              <strong>Cookies Necessários</strong>
            </label>
            <p>Essenciais para o funcionamento do site.</p>
          </div>

          <div className="cookie-option">
            <label>
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />{' '}
              <strong>Analytics</strong>
            </label>
            <p>Coleta de dados para melhorar o site.</p>
          </div>

          <div className="cookie-option">
            <label>
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />{' '}
              <strong>Marketing</strong>
            </label>
            <p>Personalização de anúncios e campanhas.</p>
          </div>

          <div className="cookie-buttons">
            <button onClick={() => salvarEscolha({ necessary: true, analytics, marketing })}>
              Salvar preferências
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
