const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function formatarReais(valor, casasDecimais = 0) {
  return 'R$' + valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
}

export function formatarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia} de ${MESES[Number(mes) - 1]} de ${ano}`;
}
