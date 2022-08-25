const axios = require('axios')

function getRoute(route){
    //return 'http://localhost:3000/'.concat(route)
    return 'https://k-back.herokuapp.com/'.concat(route)
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

module.exports = { getRoute, validarSessao }