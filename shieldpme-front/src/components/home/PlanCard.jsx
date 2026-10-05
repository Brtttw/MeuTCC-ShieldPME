import { useNavigate } from 'react-router-dom';
import { formatarReais } from '../../utils/formatadores';

// Ajuste visual: largura da caixa de benefícios de cada plano (padding à direita, em px)
const PADDING_DIREITA_LISTA = { plus: 177, pro: 147, ultra: 140 };

export default function PlanCard({ plano }) {
  const navigate = useNavigate();
  const paddingDireita = PADDING_DIREITA_LISTA[plano.codigo] ?? 140;

  return (
    <div className={`plan${plano.destaque ? ' featured' : ''}`}>
      {plano.destaque && <div className="badge">Mais Popular</div>}

      <h3>{plano.nome}</h3>

      <br />

      <p className="description">{plano.descricao}</p>

      <div className="price">
        {formatarReais(plano.precoMensal)}
        <span style={{ fontSize: '16px' }}>/mês</span>
      </div>

      <p className="price-anual" style={{ fontSize: '17px' }}>
        Anual Avista: <span className="text-white">{formatarReais(plano.precoAnual)}</span>
      </p>

      <br />
      <br />

      <button onClick={() => navigate(`/checkout/${plano.codigo}`)}>Escolher Plano</button>

      <br />
      <br />
      <br />

      <p className="garanta">
        Participe do plano <span style={{ color: '#bdbdbd' }}>{plano.nome}</span> e garanta:
      </p>

      <ul style={{ padding: `10px ${paddingDireita}px 10px 10px` }}>
        {plano.beneficios.map((beneficio) => (
          <li key={beneficio}>
            <img src="/imagens/correto.png" alt="Correto" width="15" /> {beneficio}
          </li>
        ))}
      </ul>
    </div>
  );
}
