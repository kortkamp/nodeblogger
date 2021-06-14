function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate(dateTime);
  const monthIndex = date.getMonth(dateTime);
  const month = ['Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'][monthIndex];
  const year = date.getFullYear(dateTime);

  const hours = date.getHours(dateTime);
  const minutes = date.getMinutes(dateTime);

  const formatedDate = `${day} de ${month} de ${year} ${hours}:${String(minutes).padStart(2, '0')}`;

  return formatedDate;
}

module.exports = { formatDateTime };
