import { api, tokenStorage } from './api';
import { USE_MOCK } from '../config/env';
import { decodificarJwt } from '../utils/jwt';

// POST /api/auth/login   { email, senha }      -> { token, usuario: { nome, email, foto } }
export async function login({ email, senha }) {
  if (USE_MOCK) return null;

  const { token, usuario } = await api.post('/auth/login', { email, senha });
  tokenStorage.salvar(token);
  return usuario;
}

// POST /api/auth/cadastro   { nome, email, senha }
export async function cadastrar({ nome, email, senha }) {
  if (USE_MOCK) return null;

  return api.post('/auth/cadastro', { nome, email, senha });
}

// POST /api/auth/google   { credential }   (o backend valida o ID token do Google)
export async function loginComGoogle(credential) {
  if (USE_MOCK) {
    const dados = decodificarJwt(credential);
    return { nome: dados.name, email: dados.email, foto: dados.picture };
  }

  const { token, usuario } = await api.post('/auth/google', { credential });
  tokenStorage.salvar(token);
  return usuario;
}
