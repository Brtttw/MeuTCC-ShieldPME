import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Só renderiza a página para quem está logado com o papel exigido (a autorização real é feita no backend)
export default function RotaProtegida({ papel, children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return null;
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.role !== papel) return <Navigate to="/" replace />;
  return children;
}
