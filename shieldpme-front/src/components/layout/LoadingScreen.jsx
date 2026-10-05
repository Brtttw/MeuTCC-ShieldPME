import { useEffect, useRef } from 'react';

const QUANTIDADE_PARTICULAS = 80;

export default function LoadingScreen({ progresso, saindo }) {
  const canvasRef = useRef(null);

  // Partículas brancas atravessando a tela
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particulas = Array.from({ length: QUANTIDADE_PARTICULAS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.5,
      vy: Math.random() * 0.5,
    }));

    let frame;
    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particulas.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = 'white';
        ctx.fillRect(p.x, p.y, 2, 2);
      });

      frame = requestAnimationFrame(animar);
    }
    animar();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`loading-screen${saindo ? ' loading-screen--saindo' : ''}`}>
      <canvas ref={canvasRef} className="loading-canvas" />

      <div className="loading-container">
        <h1 className="glitch" data-text="Entrando na ShieldPME">
          Entrando na ShieldPME
        </h1>

        <div className="loading-bar">
          <div className="loading-progress" style={{ width: `${progresso}%` }} />
          <div className="loading-scan" />
        </div>

        <div>
          <span className="loading-percent">{progresso}%</span>
          <p className="loading-text" />
        </div>
      </div>
    </div>
  );
}
