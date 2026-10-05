import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { buscarPlano } from '../services/planoService';
import { finalizarAssinatura, gerarPix } from '../services/assinaturaService';
import { formatarReais } from '../utils/formatadores';

const METODOS = [
  { id: 'credito', rotulo: '💳 Cartão de Crédito' },
  { id: 'debito', rotulo: '💳 Cartão de Débito' },
  { id: 'pix', rotulo: '⚡ PIX' },
  { id: 'boleto', rotulo: '📄 Boleto' },
];

const PARCELAS = [1, 2, 3, 6, 12];

const CAMPOS_PESSOAIS = ['nome', 'email', 'telefone', 'cpf', 'empresa'];

// Campos obrigatórios de cada forma de pagamento
const CAMPOS_PAGAMENTO = {
  credito: ['cartaoNumero', 'cartaoNome', 'cartaoValidade', 'cartaoCvv'],
  debito: [
    'debitoNumero', 'debitoNome', 'debitoValidade', 'debitoCvv',
    'debitoBanco', 'debitoAgencia', 'debitoConta',
  ],
  pix: [],
  boleto: ['boletoCpf', 'boletoEndereco', 'boletoCep', 'boletoCidade'],
};

const DADOS_INICIAIS = {
  ...Object.fromEntries(
    [...CAMPOS_PESSOAIS, ...Object.values(CAMPOS_PAGAMENTO).flat()].map((campo) => [campo, ''])
  ),
  cartaoParcelas: '1',
};

const URL_QRCODE = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=';

const estaVazio = (valor) => valor.trim() === '';
const selecionar = (dados, campos) => Object.fromEntries(campos.map((c) => [c, dados[c].trim()]));

export default function Checkout() {
  const { plano: codigoPlano } = useParams();
  const navigate = useNavigate();
  const { dados: plano, erro } = useAsync(() => buscarPlano(codigoPlano), [codigoPlano]);

  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [metodo, setMetodo] = useState('credito');
  const [camposInvalidos, setCamposInvalidos] = useState([]);
  const [pix, setPix] = useState(null);

  // A cobrança PIX só é gerada quando o usuário escolhe essa forma de pagamento
  useEffect(() => {
    if (metodo !== 'pix' || pix) return;
    gerarPix(codigoPlano)
      .then(setPix)
      .catch((e) => alert(e.message));
  }, [metodo]);

  if (erro) return <Navigate to="/" replace />;
  if (!plano) return null;

  function alterar(e) {
    setDados((atual) => ({ ...atual, [e.target.name]: e.target.value }));
  }

  async function confirmar(e) {
    e.preventDefault();

    const pessoaisVazios = CAMPOS_PESSOAIS.filter((campo) => estaVazio(dados[campo]));
    setCamposInvalidos(pessoaisVazios);
    if (pessoaisVazios.length) {
      alert('Preencha todos os dados pessoais.');
      return;
    }

    const pagamentoVazios = CAMPOS_PAGAMENTO[metodo].filter((campo) => estaVazio(dados[campo]));
    setCamposInvalidos(pagamentoVazios);
    if (pagamentoVazios.length) {
      alert('Preencha todos os dados do pagamento.');
      return;
    }

    try {
      await finalizarAssinatura({
        planoCodigo: plano.codigo,
        cliente: selecionar(dados, CAMPOS_PESSOAIS),
        pagamento: {
          metodo,
          parcelas: metodo === 'credito' ? Number(dados.cartaoParcelas) : 1,
          dados: selecionar(dados, CAMPOS_PAGAMENTO[metodo]),
        },
      });
      alert('Pagamento aprovado! ✅\n\nSua proteção ShieldPME foi ativada!');
      navigate('/');
    } catch (erroApi) {
      alert(erroApi.message);
    }
  }

  function copiarPix() {
    navigator.clipboard.writeText(pix.copiaECola);
    alert('Chave PIX copiada!');
  }

  const rotuloParcela = (n) =>
    `${n}x de ${formatarReais(plano.precoMensal / n, 2)}${n === 1 ? ' (à vista)' : ''}`;

  // Campo de texto ligado ao estado; fica com borda vermelha quando inválido
  const campo = (nome, placeholder, extras) => (
    <div className="input-group">
      <input
        type="text"
        name={nome}
        placeholder={placeholder}
        value={dados[nome]}
        onChange={alterar}
        style={camposInvalidos.includes(nome) ? { borderColor: '#ff4d4d' } : undefined}
        {...extras}
      />
    </div>
  );

  const grupo = (id) => `field-group${metodo === id ? ' active' : ''}`;

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Finalizar Assinatura — Plano {plano.nome}</h1>
          <p>Complete seus dados para ativar a proteção ShieldPME na sua empresa.</p>
        </div>

        <div className="checkout-layout">
          <div className="checkout-summary">
            <h2>Resumo do Plano</h2>
            <div className="plan-price">
              {formatarReais(plano.precoMensal)}
              <span>/mês</span>
            </div>
            <p style={{ color: '#a7a7a7', fontSize: '14px' }}>
              Anual à vista: {formatarReais(plano.precoAnual)}
            </p>
            <ul>
              {plano.beneficios.map((beneficio) => (
                <li key={beneficio}>{beneficio}</li>
              ))}
            </ul>
          </div>

          <div className="checkout-form-wrapper">
            <h2>Dados Pessoais</h2>

            <form className="checkout-form" onSubmit={confirmar}>
              {campo('nome', 'Nome completo', { required: true })}
              {campo('email', 'Email', { type: 'email', required: true })}
              {campo('telefone', 'Telefone', { type: 'tel', required: true, maxLength: 11 })}
              {campo('cpf', 'CPF', { required: true, maxLength: 11 })}
              {campo('empresa', 'Nome da Empresa', { required: true })}

              <h2 style={{ marginTop: '30px' }}>Forma de Pagamento</h2>

              <div className="payment-methods">
                {METODOS.map(({ id, rotulo }) => (
                  <div
                    key={id}
                    className={`payment-method${metodo === id ? ' active' : ''}`}
                    onClick={() => setMetodo(id)}
                  >
                    {rotulo}
                  </div>
                ))}
              </div>

              <div className="payment-fields">
                <div className={grupo('credito')}>
                  {campo('cartaoNumero', 'Número do cartão')}
                  {campo('cartaoNome', 'Nome no cartão')}
                  <div className="field-row">
                    {campo('cartaoValidade', 'Validade MM/AA')}
                    {campo('cartaoCvv', 'CVV')}
                  </div>
                  <div className="input-group">
                    <select name="cartaoParcelas" value={dados.cartaoParcelas} onChange={alterar}>
                      {PARCELAS.map((n) => (
                        <option key={n} value={n}>
                          {rotuloParcela(n)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={grupo('debito')}>
                  {campo('debitoNumero', 'Número do cartão')}
                  {campo('debitoNome', 'Nome no cartão')}
                  <div className="field-row">
                    {campo('debitoValidade', 'Validade MM/AA')}
                    {campo('debitoCvv', 'CVV')}
                  </div>
                  {campo('debitoBanco', 'Banco')}
                  <div className="field-row">
                    {campo('debitoAgencia', 'Agência')}
                    {campo('debitoConta', 'Conta')}
                  </div>
                </div>

                <div className={grupo('pix')}>
                  <p>Escaneie o QR Code ou copie a chave PIX para realizar o pagamento.</p>
                  {pix && (
                    <>
                      <img
                        src={URL_QRCODE + pix.qrCodeData}
                        className="pix-qr"
                        alt="QR Code PIX"
                      />
                      <div className="pix-chave" onClick={copiarPix}>
                        {pix.copiaECola}
                      </div>
                    </>
                  )}
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '10px' }}>
                    Após o pagamento, clique em Confirmar.
                  </p>
                </div>

                <div className={grupo('boleto')}>
                  {campo('boletoCpf', 'CPF ou CNPJ')}
                  {campo('boletoEndereco', 'Endereço completo')}
                  <div className="field-row">
                    {campo('boletoCep', 'CEP')}
                    {campo('boletoCidade', 'Cidade / UF')}
                  </div>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '10px' }}>
                    O boleto será enviado para o email informado.
                  </p>
                </div>
              </div>

              <button type="submit" className="checkout-btn">
                Confirmar Pagamento
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
