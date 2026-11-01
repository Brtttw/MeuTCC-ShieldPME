import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EVENTO_SESSAO_EXPIRADA, tokenStorage } from '../services/api';
import { login as loginApi, obterSessao, sair as sairApi } from '../services/authService';

const AuthContext = createContext(null);

export const ROTA_POR_PAPEL = {
  CLIENT: '/area-cliente',
  EMPLOYEE: '/area-funcionario',
};

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(() => Boolean(tokenStorage.obter()));

  // Restaura a sessão a partir do token salvo
  useEffect(() => {
    if (!tokenStorage.obter()) return;
    let ativo = true;
    obterSessao()
      .then((dados) => ativo && setUsuario(dados))
      .catch(() => tokenStorage.limpar())
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  // Token vencido em qualquer chamada -> volta ao estado deslogado
  useEffect(() => {
    const aoExpirar = () => setUsuario(null);
    window.addEventListener(EVENTO_SESSAO_EXPIRADA, aoExpirar);
    return () => window.removeEventListener(EVENTO_SESSAO_EXPIRADA, aoExpirar);
  }, []);

  const entrar = useCallback(async (credenciais) => {
    const dados = await loginApi(credenciais);
    setUsuario(dados);
    return dados;
  }, []);

  const sair = useCallback(() => {
    sairApi();
    setUsuario(null);
  }, []);

  const valor = useMemo(() => ({ usuario, carregando, entrar, sair }), [usuario, carregando, entrar, sair]);
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return contexto;
}
