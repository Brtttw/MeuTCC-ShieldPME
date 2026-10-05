import { api } from './api';
import { USE_MOCK } from '../config/env';

// POST /api/newsletter   { email, dataNascimento }
// Retorna o texto a exibir (ou null para não exibir nada, como no site original).
export async function inscreverNewsletter({ email, dataNascimento }) {
  if (USE_MOCK) return null;

  if (!email.trim()) throw new Error('Informe seu email.');

  await api.post('/newsletter', { email, dataNascimento: dataNascimento || null });
  return 'Cadastro realizado! Obrigado por assinar a newsletter.';
}
