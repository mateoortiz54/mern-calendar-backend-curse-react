const moment = require('moment')

const isDate = (value, rest) =>{
    console.log(value)

    if(!value) {
        return false
    }

    const fecha = moment(value);
    console.log(`Estas es la fecha: ${fecha} `)

    if(fecha.isValid()){
        return true
    }else{
        return false
    }

}

module.exports = {
    isDate
}