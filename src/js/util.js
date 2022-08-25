const axios = require('axios')

function getIconTipoItem(tipo){
    switch (tipo) {
        case 'fogo':
            return 'mdi-fire'
        case 'alimentacao':
            return 'mdi-silverware-variant'
        case 'online':
            return 'mdi-wifi'
        case 'quadro':
            return 'mdi-image-frame'
        case 'oficina':
            return 'mdi-human-male-board'
        case 'musica':
            return 'mdi-music'
        default:
            return 'mdi-fire'
    }
}

function getRoute(route){
    //return 'http://localhost:3000/'.concat(route)
    return 'https://app-pm-back.herokuapp.com/'.concat(route)
}

function getColor(tipo, i){
    switch(tipo){
        case 'HEX':
            return getColorHex(i)
        case 'DESC':
            return getColorDesc(i)
        default:
            return getColorHex(i)
    }
}

function getColorHex(i) {
    return (i + 1) % 3 == 0 ? '#FFCB05' : (i + 2) % 3 == 0 ? '#EE312F' : '#00AB4E'
}

function getColorDesc(i) {
    return (i + 1) % 3 == 0 ? 'yellow' : (i + 2) % 3 == 0 ? 'red' : 'green'
}    

function validarSessao(vm) {
    const config = {
        headers:{
            'x-access-token': vm.$session.get(global.keySession),
            'Content-type': 'application/json'
        }
      };

    axios.get(getRoute('validarsessao'), config)
        .then(response => {
            vm.$session.set(global.keySession, response.headers.refreshtoken)
            vm.validar(true)
        })
        .catch((err) => {
            console.log(err)
            vm.validar(false)
        })
}

module.exports = { getIconTipoItem, getColor, getRoute, validarSessao }