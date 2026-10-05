const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// 122 -> "R$122" | 40.667 (2 casas) -> "R$40,67"
export function formatarReais(valor, casasDecimais = 0) {
  return 'R$' + valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
}

// "2026-01-05" (formato da coluna DATE / JSON do Spring) -> "05 de Janeiro de 2026"
export function formatarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia} de ${MESES[Number(mes) - 1]} de ${ano}`;
}
