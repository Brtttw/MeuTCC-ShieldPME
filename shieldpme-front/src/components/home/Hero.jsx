import PalavraRotativa from './PalavraRotativa';
import { SPLINE_HOME_URL } from '../../config/env';

export default function Hero() {
  return (
    <section className="home" id="home">
      <spline-viewer
        url={SPLINE_HOME_URL}
        style={{ marginLeft: '500px', display: 'block', width: '100%', marginTop: '87px' }}
      />

      <h1>
        Protegendo o seu site,
        <br />
        de forma <PalavraRotativa />
      </h1>

      <p>
        A ShieldPME oferece soluções modernas de cibersegurança para proteger dados, servidores e
        infraestrutura digital contra ameaças cibernéticas.
      </p>
    </section>
  );
}
