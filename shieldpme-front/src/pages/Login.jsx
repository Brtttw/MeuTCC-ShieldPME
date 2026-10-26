import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/forms/GoogleLoginButton';
import { ROTA_POR_PAPEL, useAuth } from '../context/AuthContext';
import { loginComGoogle } from '../services/authService';

const CAMPOS_VAZIOS = { email: '', senha: '' };

export default function Login() {
  const navigate = useNavigate();
  const { entrar } = useAuth();
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [enviando, setEnviando] = useState(false);

  function alterar(e) {
    setCampos((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  async function enviar(e) {
    e.preventDefault();
    setErroGeral('');

    const novosErros = {
      email: campos.email.trim() === '',
      senha: campos.senha.trim() === '',
    };
    setErros(novosErros);
    if (novosErros.email || novosErros.senha) return;

    setEnviando(true);
    try {
      const usuario = await entrar({ email: campos.email.trim(), senha: campos.senha });
      navigate(ROTA_POR_PAPEL[usuario.role] ?? '/');
    } catch (erro) {
      setErroGeral(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  async function aoEntrarComGoogle(resposta) {
    try {
      await loginComGoogle(resposta.credential);
    } catch (erro) {
      setErroGeral(erro.message);
    }
  }

  return (
    <form className="form" onSubmit={enviar}>
      <h2>Entrar</h2>

      <div className="google-login">
        <GoogleLoginButton aoReceberCredencial={aoEntrarComGoogle} />
      </div>

      <p style={{ textAlign: 'center', margin: '15px 0', color: '#aaa' }}>ou</p>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          value={campos.email}
          onChange={alterar}
        />
        <div className={`error${erros.email ? ' error--visible' : ''}`}>Preencha este campo</div>
      </div>

      <div className="input-group">
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          autoComplete="current-password"
          value={campos.senha}
          onChange={alterar}
        />
        <div className={`error${erros.senha ? ' error--visible' : ''}`}>Preencha este campo</div>
      </div>

      {erroGeral && (
        <p className="form-mensagem form-mensagem--erro" role="alert">
          {erroGeral}
        </p>
      )}

      <button type="submit" className="btn" disabled={enviando}>
        {enviando ? 'Entrando...' : 'Entrar'}
      </button>

      <p className="link">
        Não tem conta? <Link to="/cadastro">Criar conta</Link>
      </p>
    </form>
  );
}
