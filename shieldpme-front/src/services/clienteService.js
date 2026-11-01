import { api } from './api';

// Sempre usa a API real (não depende de VITE_USE_MOCK)

// GET /api/catalog -> { services: [{id,name,description,basePrice}], frequencies: [{id,name}] }
export const obterCatalogo = () => api.get('/catalog');

// POST /api/client/requests
export const criarSolicitacao = (dados) => api.post('/client/requests', dados);

// GET /api/client/requests -> [{id,status,createdAt,siteUrl,serviceNames}]
export const listarSolicitacoes = () => api.get('/client/requests');

// GET /api/client/requests/{id}
export const obterSolicitacao = (id) => api.get(`/client/requests/${id}`);

// GET /api/client/reports -> relatórios liberados da empresa
export const listarRelatorios = () => api.get('/client/reports');

// GET /api/client/reports/{id}/file -> Blob (PDF)
export const baixarRelatorio = (id) => api.baixar(`/client/reports/${id}/file`);
