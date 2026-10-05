import useAsync from '../../hooks/useAsync';
import { listarPlanos } from '../../services/planoService';
import PlanCard from './PlanCard';

export default function Pricing() {
  const { dados: planos } = useAsync(listarPlanos);

  return (
    <section className="pricing" id="pricing">
      <section className="text-pricing">
        <h2>Escolha o plano ideal para sua empresa</h2>

        <p className="p1">
          Nossos <span className="text-white">planos de serviço</span> são projetados para oferecer
          proteção abrangente contra ameaças cibernéticas, ajudando empresas de todos os tamanhos a
          manterem a segurança de seus dados e operações. Desde monitoramento básico até soluções
          enterprise avançadas, nossos planos garantem tranquilidade e conformidade com as melhores
          práticas de segurança.
        </p>
      </section>

      <br />
      <br />

      <div className="pricing-cards">
        {(planos ?? []).map((plano) => (
          <PlanCard key={plano.id} plano={plano} />
        ))}
      </div>
    </section>
  );
}
