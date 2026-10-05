import useAsync from '../../hooks/useAsync';
import { listarServicos } from '../../services/servicoService';

export default function Services() {
  const { dados: servicos } = useAsync(listarServicos);

  return (
    <section className="services" id="services">
      <h2>Nossos Serviços</h2>

      <p className="text-services">
        Na ShieldPME, oferecemos
        <br />
        uma gama completa de <span className="text-white">nossos serviços</span>
        <br />
        de cibersegurança, incluindo
        <br />
        monitoramento, firewalls corporativos
        <br />
        e soluções avançadas de proteção
        <br />
        contra ameaças digitais.
        <br />
        Esses serviços são projetados para
        <br />
        garantir a segurança e integridade
        <br />
        dos seus dados empresariais,
        <br />
        prevenindo ataques cibernéticose
        <br />
        minimizando riscos.
      </p>

      <div className="cards">
        {(servicos ?? []).map((servico) => (
          <div className="card" key={servico.id}>
            <img src={`/imagens/${servico.icone}`} alt={servico.textoAlternativo} />
            <h3>{servico.titulo}</h3>
            <p>{servico.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
