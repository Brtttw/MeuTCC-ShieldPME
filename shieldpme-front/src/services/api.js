import { API_URL } from '../config/env';

const CHAVE_TOKEN = 'shieldpme_token';

export const tokenStorage = {
  obter: () => localStorage.getItem(CHAVE_TOKEN),
  salvar: (token) => localStorage.setItem(CHAVE_TOKEN, token),
  limpar: () => localStorage.removeItem(CHAVE_TOKEN),
};

// Cliente HTTP único: envia JSON, anexa o JWT (se existir) e converte erros em Error(mensagem)
async function requisitar(caminho, { metodo = 'GET', corpo } = {}) {
  const token = tokenStorage.obter();

  const resposta = await fetch(`${API_URL}${caminho}`, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || erro.message || erro.detail || `Erro ${resposta.status}`);
  }

  return resposta.status === 204 ? null : resposta.json();
}

export const api = {
  get: (caminho) => requisitar(caminho),
  post: (caminho, corpo) => requisitar(caminho, { metodo: 'POST', corpo }),
  put: (caminho, corpo) => requisitar(caminho, { metodo: 'PUT', corpo }),
  delete: (caminho) => requisitar(caminho, { metodo: 'DELETE' }),
};
