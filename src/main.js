import Vue from 'vue'
import App from './App.vue'
import VueSession from 'vue-session'
import Axios from 'axios'

import Vuetify from 'vuetify/lib'

/* var global */
global.keySession = '_keySession'
global.makeToast = 'makeToast'

/* INTERCEPTOR */

const responseHandler = response => {  
  if (response.status === 401) {
    JSON.parse(sessionStorage['vue-session-key'])[global.keySession] = ''
  }
  
  return response;
};

const errorHandler = (error) => {  
  
  if(sessionStorage['vue-session-key'])JSON.parse(sessionStorage['vue-session-key'])[global.keySession] = ''    
  
  return Promise.reject(error);
};

Axios.interceptors.request.use((config) => {    
  if(sessionStorage['vue-session-key']){        
    config.headers =  {
      'x-access-token': JSON.parse(sessionStorage['vue-session-key'])[global.keySession],
      'Content-type': 'application/json'
    }
    return config
  }else{    
    return config
  }
})

Axios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

Vue.config.productionTip = false

Vue.use(VueSession)
Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    dark: true
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
