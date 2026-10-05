import { Fragment, useState } from 'react';
import PaginaInterna from '../components/shared/PaginaInterna';
import ContentSection from '../components/shared/ContentSection';
import { enviarContato } from '../services/contatoService';
import { paginaContato, informacoesContato, motivosContato } from '../data/contato';

const CAMPOS_VAZIOS = { nome: '', email: '', assunto: '', mensagem: '' };

export default function Contato() {
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);

  function alterar(e) {
    setCampos((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  async function enviar(e) {
    e.preventDefault();

    const dados = {
      nome: campos.nome.trim(),
      email: campos.email.trim(),
      assunto: campos.assunto.trim(),
      mensagem: campos.mensagem.trim(),
    };

    if (Object.values(dados).some((valor) => !valor)) {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    try {
      alert(await enviarContato(dados));
      setCampos(CAMPOS_VAZIOS);
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <PaginaInterna titulo={paginaContato.titulo} introducao={paginaContato.introducao}>
      <div className="contact-layout">
        <div className="contact-form-wrapper">
          <h2>Envie uma Mensagem</h2>

          <form className="contact-form" onSubmit={enviar}>
            <div className="input-group">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                value={campos.nome}
                onChange={alterar}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={campos.email}
                onChange={alterar}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="assunto"
                placeholder="Assunto"
                value={campos.assunto}
                onChange={alterar}
                required
              />
            </div>
            <div className="input-group">
              <textarea
                name="mensagem"
                placeholder="Digite sua mensagem..."
                value={campos.mensagem}
                onChange={alterar}
                required
              />
            </div>
            <button type="submit">Enviar Mensagem</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Informações de Contato</h2>

          {informacoesContato.map(({ icone, titulo, linhas }) => (
            <div className="contact-info-item" key={titulo}>
              <h4>
                <i className={`fa-solid ${icone}`}></i> {titulo}
              </h4>
              <p>
                {linhas.map((linha, i) => (
                  <Fragment key={linha}>
                    {i > 0 && <br />}
                    {linha}
                  </Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ContentSection
        titulo={motivosContato.titulo}
        texto={motivosContato.texto}
        itens={motivosContato.itens}
        style={{ marginTop: '60px' }}
      />
    </PaginaInterna>
  );
}
