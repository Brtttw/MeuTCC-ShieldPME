import { useEffect, useState } from 'react';

const PASSO_PROGRESSO = 10;
const INTERVALO_PROGRESSO_MS = 40;
const INICIO_SAIDA_MS = 300;
const FIM_SAIDA_MS = 1200;

// Fases: carregando -> preparando -> saindo -> pronto
// A barra é "falsa" (10% a cada 40ms); a tela só sai quando a barra chega a 100% e a página termina de carregar.
export default function useTelaDeCarregamento() {
  const [progresso, setProgresso] = useState(0);
  const [paginaCarregada, setPaginaCarregada] = useState(false);
  const [fase, setFase] = useState('carregando');

  useEffect(() => {
    let atual = 0;
    let timer;

    function avancar() {
      atual = Math.min(atual + PASSO_PROGRESSO, 100);
      setProgresso(atual);
      if (atual < 100) timer = setTimeout(avancar, INTERVALO_PROGRESSO_MS);
    }

    avancar();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setPaginaCarregada(true);
      return;
    }
    const aoCarregar = () => setPaginaCarregada(true);
    window.addEventListener('load', aoCarregar);
    return () => window.removeEventListener('load', aoCarregar);
  }, []);

  useEffect(() => {
    if (fase === 'carregando' && progresso === 100 && paginaCarregada) setFase('preparando');
  }, [fase, progresso, paginaCarregada]);

  useEffect(() => {
    if (fase === 'preparando') {
      const timer = setTimeout(() => setFase('saindo'), INICIO_SAIDA_MS);
      return () => clearTimeout(timer);
    }
    if (fase === 'saindo') {
      const timer = setTimeout(() => setFase('pronto'), FIM_SAIDA_MS - INICIO_SAIDA_MS);
      return () => clearTimeout(timer);
    }
  }, [fase]);

  // Durante a transição a página não rola
  useEffect(() => {
    if (fase === 'preparando') document.body.style.overflow = 'hidden';
    if (fase === 'pronto') document.body.style.overflow = 'auto';
  }, [fase]);

  return { fase, progresso };
}
