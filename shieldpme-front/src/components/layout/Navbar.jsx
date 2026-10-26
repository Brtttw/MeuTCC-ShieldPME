import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROTA_POR_PAPEL, useAuth } from '../../context/AuthContext';
import NotificacoesSino from './NotificacoesSino';

const LINKS = [
  { rotulo: 'Início', secao: 'home' },
  { rotulo: 'Sobre', secao: 'about' },
  { rotulo: 'Serviços', secao: 'services' },
  { rotulo: 'Planos', secao: 'pricing' },
];

const ROLAGEM_PARA_ENCOLHER_PX = 20;

export default function Navbar() {
  const navigate = useNavigate();
  const { usuario, sair } = useAuth();
  const [encolhida, setEncolhida] = useState(false);

  useEffect(() => {
    const aoRolar = () => setEncolhida(window.scrollY > ROLAGEM_PARA_ENCOLHER_PX);
    window.addEventListener('scroll', aoRolar);
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  function aoSair(e) {
    e.preventDefault();
    sair();
    navigate('/');
  }

  const rotaDaArea = usuario ? ROTA_POR_PAPEL[usuario.role] : null;

  return (
    <nav className={encolhida ? 'scrolled' : ''}>
      <div className="logo">ShieldPME</div>

      <ul>
        {LINKS.map(({ rotulo, secao }) => (
          <li key={secao}>
            <Link to={`/#${secao}`}>{rotulo}</Link>
          </li>
        ))}

        {usuario ? (
          <>
            {usuario.role === 'EMPLOYEE' && <NotificacoesSino />}
            {rotaDaArea && (
              <li>
                <Link to={rotaDaArea}>Minha área</Link>
              </li>
            )}
            <li>
              <a href="/" className="nav-sair" onClick={aoSair}>
                Sair
              </a>
            </li>
          </>
        ) : (
          <li>
            <button type="button" onClick={() => navigate('/login')}>
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
