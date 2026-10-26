// Textos de exibição dos status devolvidos pela API
export const ROTULO_STATUS = {
  PENDING: 'Pendente',
  RUNNING: 'Em atendimento',
  ACTIVE: 'Em atendimento',
  COMPLETED: 'Concluída',
  CANCELLED: 'Cancelada',
};

export const rotuloStatus = (status) => ROTULO_STATUS[status] ?? status;

export function formatarDataHora(iso) {
  if (!iso) return '—';
  const data = new Date(iso);
  return Number.isNaN(data.getTime()) ? '—' : data.toLocaleString('pt-BR');
}

export function formatarData(iso) {
  if (!iso) return '—';
  const [a, m, d] = String(iso).split('-');
  return d && m && a ? `${d}/${m}/${a}` : iso;
}

export function formatarCnpj(cnpj) {
  const d = String(cnpj ?? '').replace(/\D/g, '');
  return d.length === 14 ? d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5') : cnpj;
}
