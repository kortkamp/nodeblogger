
function formatDateTime(dateTime){
    let date = new Date(dateTime)
    let day =  date.getDate(dateTime)
    let monthIndex = date.getMonth(dateTime)
        let month = ['Janeiro',
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
                    'Dezembro'][monthIndex]
    let year = date.getFullYear(dateTime)

    let hours = date.getHours(dateTime)
    let minutes =  date.getMinutes(dateTime)

    formatedDate = day + " de " + month + " de " + year + " " + hours + ":" + String(minutes).padStart(2, '0') ;

    return formatedDate;
    
}

module.exports = {formatDateTime};