import { api } from './api';
import { USE_MOCK } from '../config/env';
import { servicos } from '../data/servicos';

// GET /api/servicos
export async function listarServicos() {
  if (USE_MOCK) return servicos;

  return api.get('/servicos');
}
