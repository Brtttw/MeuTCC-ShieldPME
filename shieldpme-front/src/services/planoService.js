import { api } from './api';
import { USE_MOCK } from '../config/env';
import { planos } from '../data/planos';

// GET /api/planos
export async function listarPlanos() {
  if (USE_MOCK) return planos;

  return api.get('/planos');
}

// GET /api/planos/{codigo}
export async function buscarPlano(codigo) {
  if (USE_MOCK) {
    const plano = planos.find((p) => p.codigo === codigo);
    if (!plano) throw new Error('Plano não encontrado');
    return plano;
  }

  return api.get(`/planos/${codigo}`);
}
