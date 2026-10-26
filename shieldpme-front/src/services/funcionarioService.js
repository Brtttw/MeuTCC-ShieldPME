import { api } from './api';

// GET /api/staff/requests
export const listarSolicitacoes = () => api.get('/staff/requests');

// GET /api/staff/requests/{id}
export const obterSolicitacao = (id) => api.get(`/staff/requests/${id}`);

// POST /api/staff/executions/{id}/claim  (assume o atendimento)
export const assumirExecucao = (id) => api.post(`/staff/executions/${id}/claim`);

// POST /api/staff/executions/{id}/report  (multipart: file, title)
export function enviarRelatorio(execucaoId, arquivo, titulo) {
  const form = new FormData();
  form.append('file', arquivo);
  if (titulo && titulo.trim()) form.append('title', titulo.trim());
  return api.upload(`/staff/executions/${execucaoId}/report`, form);
}

// GET /api/staff/reports/{id}/file -> Blob (PDF)
export const baixarRelatorio = (id) => api.baixar(`/staff/reports/${id}/file`);

// GET /api/staff/notifications -> { unread, items: [{id,type,message,contractId,read,createdAt}] }
export const listarNotificacoes = () => api.get('/staff/notifications');

// POST /api/staff/notifications/{id}/read
export const marcarNotificacaoLida = (id) => api.post(`/staff/notifications/${id}/read`);
