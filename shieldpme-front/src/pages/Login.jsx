import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/forms/GoogleLoginButton';
import { login, loginComGoogle } from '../services/authService';

const CAMPOS_VAZIOS = { email: '', senha: '' };

export default function Login() {
  const navigate = useNavigate();
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erros, setErros] = useState({});

  function alterar(e) {
    setCampos((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  async function enviar(e) {
    e.preventDefault();

    const novosErros = {
      email: campos.email.trim() === '',
      senha: campos.senha.trim() === '',
    };
    setErros(novosErros);
    if (novosErros.email || novosErros.senha) return;

    try {
      await login({ email: campos.email.trim(), senha: campos.senha });
      alert('Login realizado!');
      setCampos(CAMPOS_VAZIOS);
      navigate('/');
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function aoEntrarComGoogle(resposta) {
    try {
      const usuario = await loginComGoogle(resposta.credential);
      alert('Bem-vindo ' + usuario.nome);
      console.log('Email:', usuario.email);
      console.log('Foto:', usuario.foto);
      navigate('/');
    } catch (erro) {
      alert(erro.message);
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
          type="text"
          name="email"
          placeholder="Email ou usuário"
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
          value={campos.senha}
          onChange={alterar}
        />
        <div className={`error${erros.senha ? ' error--visible' : ''}`}>Preencha este campo</div>
      </div>

      <button type="submit" className="btn">
        Entrar
      </button>

      <p className="link">
        Não tem conta? <Link to="/cadastro">Criar conta</Link>
      </p>
    </form>
  );
}
