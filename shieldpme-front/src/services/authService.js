import { api, tokenStorage } from './api';

// POST /api/auth/login   { email, password } -> { token, expiresInSeconds, user: { id, email, role, companyName } }
export async function login({ email, senha }) {
  const { token, user } = await api.post('/auth/login', { email, password: senha });
  tokenStorage.salvar(token);
  return user;
}

// POST /api/auth/register   -> 201. O backend cria SEMPRE uma conta de cliente (o papel não é enviado).
export async function cadastrar({ empresa, cnpj, email, telefone, senha }) {
  return api.post('/auth/register', {
    companyName: empresa,
    cnpj,
    email,
    phone: telefone || '',
    password: senha,
  });
}

// GET /api/auth/me
export function obterSessao() {
  return api.get('/auth/me');
}

export function sair() {
  tokenStorage.limpar();
}

// O backend ainda não tem endpoint de login com Google (fora do escopo desta versão).
export async function loginComGoogle() {
  throw new Error('O login com Google ainda não está disponível. Use e-mail e senha.');
}
