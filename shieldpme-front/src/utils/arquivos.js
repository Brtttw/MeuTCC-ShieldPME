// baixa pdf autenticado e salva
export async function abrirPdf(buscarBlob, nomeArquivo, { baixar = false } = {}) {
  // aba abre no clique para não ser bloqueada 
  const aba = baixar ? null : window.open('about:blank', '_blank');
  try {
    const blob = await buscarBlob();
    const url = URL.createObjectURL(blob);

    if (aba) {
      aba.location.href = url;
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = nomeArquivo || 'relatorio.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (erro) {
    if (aba) aba.close();
    throw erro;
  }
}
