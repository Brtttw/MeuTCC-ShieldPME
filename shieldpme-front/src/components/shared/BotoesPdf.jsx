import { useState } from 'react';
import { abrirPdf } from '../../utils/arquivos';

// Botões "Visualizar" e "Baixar" de um relatório PDF (o download usa o token do usuário logado)
export default function BotoesPdf({ buscarBlob, nomeArquivo }) {
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');

  async function acionar(baixar) {
    setErro('');
    setOcupado(true);
    try {
      await abrirPdf(buscarBlob, nomeArquivo, { baixar });
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <span className="botoes-pdf">
      <button type="button" className="mini-btn" disabled={ocupado} onClick={() => acionar(false)}>
        Visualizar
      </button>
      <button type="button" className="mini-btn" disabled={ocupado} onClick={() => acionar(true)}>
        Baixar PDF
      </button>
      {erro && (
        <span className="area-erro" role="alert">
          {erro}
        </span>
      )}
    </span>
  );
}
