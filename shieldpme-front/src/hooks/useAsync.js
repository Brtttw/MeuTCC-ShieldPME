import { useEffect, useState } from 'react';

// Executa uma função async (normalmente um service) e devolve { dados, erro, carregando }
export default function useAsync(funcao, dependencias = []) {
  const [estado, setEstado] = useState({ dados: null, erro: null, carregando: true });

  useEffect(() => {
    let ativo = true;
    setEstado((atual) => ({ ...atual, carregando: true }));

    funcao()
      .then((dados) => ativo && setEstado({ dados, erro: null, carregando: false }))
      .catch((erro) => ativo && setEstado({ dados: null, erro, carregando: false }));

    return () => {
      ativo = false;
    };
  }, dependencias);

  return estado;
}
