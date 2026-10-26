import { API_URL } from '../config/env';

const CHAVE_TOKEN = 'shieldpme_token';

export const EVENTO_SESSAO_EXPIRADA = 'shieldpme:sessao-expirada';

export const tokenStorage = {
  obter: () => localStorage.getItem(CHAVE_TOKEN),
  salvar: (token) => localStorage.setItem(CHAVE_TOKEN, token),
  limpar: () => localStorage.removeItem(CHAVE_TOKEN),
};

// Junta os erros de validação do backend (campo -> mensagem) numa frase só
function mensagemDeErro(erro, status) {
  const campos = erro?.validationErrors ? Object.values(erro.validationErrors).join(' ') : '';
  return campos || erro?.mensagem || erro?.message || erro?.detail || `Erro ${status}`;
}

// Cliente HTTP único: envia JSON (ou FormData), anexa o JWT e converte erros em Error(mensagem)
async function requisitar(caminho, { metodo = 'GET', corpo, formData, blob = false } = {}) {
  const token = tokenStorage.obter();
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (corpo !== undefined) headers['Content-Type'] = 'application/json';

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers,
      body: formData ?? (corpo !== undefined ? JSON.stringify(corpo) : undefined),
    });
  } catch {
    throw new Error('Não foi possível se comunicar com o servidor. Verifique sua conexão e tente novamente.');
  }

  if (resposta.status === 401 && token) {
    // Token vencido/inválido: encerra a sessão local
    tokenStorage.limpar();
    window.dispatchEvent(new Event(EVENTO_SESSAO_EXPIRADA));
  }

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(mensagemDeErro(erro, resposta.status));
  }

  if (blob) return resposta.blob();
  return resposta.status === 204 ? null : resposta.json();
}

export const api = {
  get: (caminho) => requisitar(caminho),
  post: (caminho, corpo) => requisitar(caminho, { metodo: 'POST', corpo }),
  put: (caminho, corpo) => requisitar(caminho, { metodo: 'PUT', corpo }),
  delete: (caminho) => requisitar(caminho, { metodo: 'DELETE' }),
  upload: (caminho, formData) => requisitar(caminho, { metodo: 'POST', formData }),
  baixar: (caminho) => requisitar(caminho, { blob: true }),
};
