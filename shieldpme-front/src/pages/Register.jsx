import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [campos, setCampos] = useState({ nome: '', email: '', senha: '' });
  const [erros, setErros] = useState({});

  function alterar(e) {
    setCampos((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  async function enviar(e) {
    e.preventDefault();

    const novosErros = {
      nome: campos.nome.trim() === '',
      email: campos.email.trim() === '',
      senha: campos.senha.trim() === '',
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    try {
      await cadastrar({ nome: campos.nome.trim(), email: campos.email.trim(), senha: campos.senha });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <form className="form" onSubmit={enviar}>
      <h2>Criar Conta</h2>

      <div className="input-group">
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={campos.nome}
          onChange={alterar}
        />
        <div className={`error${erros.nome ? ' error--visible' : ''}`}>Preencha este campo</div>
      </div>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        Cadastrar
      </button>

      <p className="link">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}
