import { api } from './api';
import { USE_MOCK } from '../config/env';

const EMAIL_CONTATO = 'contato@shieldpme.com.br';

// POST /api/contatos   { nome, email, assunto, mensagem }
// Retorna o texto que a tela mostra ao usuário.
export async function enviarContato({ nome, email, assunto, mensagem }) {
  if (USE_MOCK) {
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`
    );
    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${corpo}`;
    return `Obrigado, ${nome}! Sua mensagem foi preparada. Verifique seu cliente de email para enviar.`;
  }

  await api.post('/contatos', { nome, email, assunto, mensagem });
  return `Obrigado, ${nome}! Sua mensagem foi enviada. Nossa equipe retornará em breve.`;
}
