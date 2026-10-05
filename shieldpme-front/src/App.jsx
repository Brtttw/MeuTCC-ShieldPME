import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import useTelaDeCarregamento from './hooks/useTelaDeCarregamento';
import LoadingScreen from './components/layout/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';
import Home from './pages/Home';
import AuthLayout from './pages/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import PaginaLegal from './pages/PaginaLegal';
import Contato from './pages/Contato';
import MinhaConta from './pages/MinhaConta';
import Blog from './pages/Blog';
import Ferramentas from './pages/Ferramentas';
import Checkout from './pages/Checkout';
import { privacidade, termos } from './data/paginasLegais';

const CLASSE_DO_SITE = {
  carregando: '',
  preparando: 'site-content--preparado',
  saindo: 'site-content--preparado',
  pronto: 'site-content--visivel',
};

export default function App() {
  const { pathname } = useLocation();
  const emHome = pathname === '/';
  const { fase, progresso } = useTelaDeCarregamento();

  useEffect(() => {
    if (!emHome) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {fase !== 'pronto' && <LoadingScreen progresso={progresso} saindo={fase === 'saindo'} />}

      {/* Canvas de fundo (ainda sem desenho). Mantê-lo muda a composição de camadas e o antialiasing do texto */}
      <canvas />

      <Navbar />

      {/* A home continua montada (só escondida) para não recarregar o robô 3D a cada navegação */}
      <div
        className={`site-content ${CLASSE_DO_SITE[fase]}`}
        style={emHome ? undefined : { display: 'none' }}
      >
        <Home />
      </div>

      {emHome && <Footer />}

      <Routes>
        <Route path="/" element={null} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
        </Route>

        <Route path="/privacidade" element={<PaginaLegal conteudo={privacidade} />} />
        <Route path="/termos" element={<PaginaLegal conteudo={termos} />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/ferramentas" element={<Ferramentas />} />
        <Route path="/checkout/:plano" element={<Checkout />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CookieBanner liberado={fase === 'pronto'} />
    </>
  );
}
