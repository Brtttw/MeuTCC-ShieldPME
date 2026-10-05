import { api } from './api';
import { USE_MOCK } from '../config/env';
import { pixMock } from '../data/pix';

// POST /api/pagamentos/pix   { planoCodigo }   -> { copiaECola, qrCodeData? }
export async function gerarPix(planoCodigo) {
  if (USE_MOCK) {
    return {
      copiaECola: pixMock[planoCodigo],
      qrCodeData: `ShieldPME-${planoCodigo.toUpperCase()}-Pagamento`,
    };
  }

  const pix = await api.post('/pagamentos/pix', { planoCodigo });
  return { copiaECola: pix.copiaECola, qrCodeData: pix.qrCodeData ?? pix.copiaECola };
}

// POST /api/assinaturas
// {
//   planoCodigo, cliente: { nome, email, telefone, cpf, empresa },
//   pagamento: { metodo: 'credito'|'debito'|'pix'|'boleto', parcelas, dados: { ... } }
// }
export async function finalizarAssinatura(assinatura) {
  if (USE_MOCK) return null;

  return api.post('/assinaturas', assinatura);
}
