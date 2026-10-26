import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar } from '../services/authService';

const CAMPOS_VAZIOS = { empresa: '', cnpj: '', email: '', telefone: '', senha: '' };

const MENSAGENS = {
  empresa: 'Informe o nome da empresa',
  cnpj: 'Informe um CNPJ com 14 dígitos',
  email: 'Informe um e-mail válido',
  senha: 'A senha precisa de 8+ caracteres, com letras e números',
};

// Regras de apoio na tela; a validação definitiva (incluindo CNPJ e e-mail duplicado) é do backend
function validar(campos) {
  const digitos = campos.cnpj.replace(/\D/g, '');
  return {
    empresa: campos.empresa.trim() === '',
    cnpj: digitos.length !== 14,
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(campos.email.trim()),
    senha: !(campos.senha.length >= 8 && /[A-Za-z]/.test(campos.senha) && /\d/.test(campos.senha)),
  };
}

export default function Register() {
  const navigate = useNavigate();
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function alterar(e) {
    setCampos((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  async function enviar(e) {
    e.preventDefault();
    setErroGeral('');

    const novosErros = validar(campos);
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    setEnviando(true);
    try {
      await cadastrar({
        empresa: campos.empresa.trim(),
        cnpj: campos.cnpj.trim(),
        email: campos.email.trim(),
        telefone: campos.telefone.trim(),
        senha: campos.senha,
      });
      setSucesso(true);
      setTimeout(() => navigate('/login'), 1800);
    } catch (erro) {
      setErroGeral(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  function campo(nome, rotulo, tipo = 'text', extra = {}) {
    return (
      <div className="input-group">
        <input type={tipo} name={nome} placeholder={rotulo} value={campos[nome]} onChange={alterar} {...extra} />
        {MENSAGENS[nome] && (
          <div className={`error${erros[nome] ? ' error--visible' : ''}`}>{MENSAGENS[nome]}</div>
        )}
      </div>
    );
  }

  return (
    <form className="form form--larga" onSubmit={enviar}>
      <h2>Criar Conta</h2>

      {campo('empresa', 'Nome da empresa', 'text', { autoComplete: 'organization', maxLength: 150 })}
      {campo('cnpj', 'CNPJ', 'text', { inputMode: 'numeric', maxLength: 18 })}
      {campo('email', 'Email', 'email', { autoComplete: 'email', maxLength: 100 })}
      {campo('telefone', 'Telefone (opcional)', 'tel', { autoComplete: 'tel', maxLength: 20 })}
      {campo('senha', 'Senha', 'password', { autoComplete: 'new-password', maxLength: 72 })}

      {erroGeral && (
        <p className="form-mensagem form-mensagem--erro" role="alert">
          {erroGeral}
        </p>
      )}
      {sucesso && (
        <p className="form-mensagem form-mensagem--ok" role="status">
          Cadastro realizado com sucesso! Redirecionando para o login...
        </p>
      )}

      <button type="submit" className="btn" disabled={enviando || sucesso}>
        {enviando ? 'Cadastrando...' : 'Cadastrar'}
      </button>

      <p className="link">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}
