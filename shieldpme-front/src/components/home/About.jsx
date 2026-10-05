import {
  paragrafosSobre,
  missao,
  diferenciais,
  estatisticas,
  valores,
} from '../../data/sobre';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>Sobre a ShieldPME</h2>

          <div className="about-description">
            {paragrafosSobre.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}

            <h3>Nossa Missão</h3>
            <p>{missao}</p>

            <h3>O Que Nos Diferencia</h3>
            <ul>
              {diferenciais.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="about-stats">
            {estatisticas.map(({ valor, rotulo }) => (
              <div className="stat" key={rotulo}>
                <h3>{valor}</h3>
                <p>{rotulo}</p>
              </div>
            ))}
          </div>

          <div className="about-values">
            {valores.map(({ titulo, descricao }) => (
              <div className="value-card" key={titulo}>
                <h3>{titulo}</h3>
                <p>{descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
