import { useState } from 'react';
import { Link } from 'react-router-dom';
import { inscreverNewsletter } from '../../services/newsletterService';

const COLUNAS = [
  {
    titulo: 'EMPRESA',
    links: [
      { rotulo: 'Sobre', para: '/#about' },
      { rotulo: 'Serviços', para: '/#services' },
      { rotulo: 'Planos', para: '/#pricing' },
    ],
  },
  {
    titulo: 'SUPORTE',
    links: [
      { rotulo: 'Contato', para: '/contato' },
      { rotulo: 'Minha Conta', para: '/minha-conta' },
    ],
  },
  {
    titulo: 'EXPLORAR',
    links: [
      { rotulo: 'Blog', para: '/blog' },
      { rotulo: 'Ferramentas', para: '/ferramentas' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  async function cadastrar() {
    try {
      const mensagem = await inscreverNewsletter({ email, dataNascimento });
      if (!mensagem) return;
      alert(mensagem);
      setEmail('');
      setDataNascimento('');
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <footer className="footer-loreal">
      <div className="newsletter">
        <div className="newsletter-left">
          <div className="footer-logo">ShieldPME</div>

          <br />

          <p>Cadastre-se para receber novidades, atualizações e conteúdos sobre cibersegurança</p>

          <div className="inputs">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          <button onClick={cadastrar}>CADASTRAR</button>

          <p className="terms">
            Ao se cadastrar, você concorda com nossos <Link to="/termos">Termos</Link> e{' '}
            <Link to="/privacidade">Política de Privacidade</Link>
          </p>
        </div>

        <div className="newsletter-right">
          {COLUNAS.map(({ titulo, links }) => (
            <div key={titulo}>
              <h4>{titulo}</h4>
              {links.map(({ rotulo, para }) => (
                <Link key={rotulo} to={para}>
                  {rotulo}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="links-bottom">
          <a href="#">Mapa do Site</a>
          <Link to="/privacidade">Privacidade</Link>
          <Link to="/termos">Termos</Link>
        </div>

        <p>© 2026 ShieldPME</p>
      </div>
    </footer>
  );
}
