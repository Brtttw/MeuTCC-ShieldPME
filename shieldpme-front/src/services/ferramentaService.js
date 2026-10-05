import { api } from './api';
import { USE_MOCK } from '../config/env';
import { ferramentas } from '../data/ferramentas';

// GET /api/ferramentas
export async function listarFerramentas() {
  if (USE_MOCK) return ferramentas;

  return api.get('/ferramentas');
}
