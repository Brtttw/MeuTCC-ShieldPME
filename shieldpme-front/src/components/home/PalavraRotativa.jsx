import { useEffect, useState } from 'react';

const PALAVRAS = ['segura', 'avançada', 'inteligente', 'confiável'];
const INTERVALO_TROCA_MS = 7000;
const ATRASO_POR_LETRA_S = 0.1;

export default function PalavraRotativa() {
  const [indice, setIndice] = useState(0);
  const [palavraBranca, setPalavraBranca] = useState(null);
  const palavra = PALAVRAS[indice];

  useEffect(() => {
    const timer = setInterval(() => setIndice((i) => (i + 1) % PALAVRAS.length), INTERVALO_TROCA_MS);
    return () => clearInterval(timer);
  }, []);

  // Depois que as letras aparecem, a palavra vira branca
  useEffect(() => {
    const timer = setTimeout(() => setPalavraBranca(palavra), palavra.length * 100 + 500);
    return () => clearTimeout(timer);
  }, [palavra]);

  return (
    <span className="troca">
      {palavra.split('').map((letra, i) => (
        <span
          key={`${palavra}-${i}`}
          className={`letra${palavraBranca === palavra ? ' branco' : ''}`}
          style={{ animationDelay: `${i * ATRASO_POR_LETRA_S}s` }}
        >
          {letra}
        </span>
      ))}
    </span>
  );
}
