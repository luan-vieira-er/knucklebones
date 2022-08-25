<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
     <!-- TO_DO_LOGO_CTG -->
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          :src='require("./assets/logoCTG.png")'
          transition="scale-transition"
          width="40" 
        />-->
        
          <h5 v-if="isOnMobile()">Knucklebones</h5>
          <h1 v-else>Knucklebones</h1>
      </div>

      <v-spacer></v-spacer>

      <LoginLogout ref="login" v-on:emitSnack="setSnack" v-on:login='login' />

      <v-btn
        target="_blank"
        text
      >
        <span class="mr-2">Regras</span> 
        <v-icon>mdi-open-in-new</v-icon> 
      </v-btn>
    </v-app-bar>

    <v-main>
      <HomeLogged v-if="isLogged"/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { getRoute,  } from './js/util'

import LoginLogout from './components/LoginLogout.vue'
import HomeLogged from './components/HomeLogged';

export default {
  name: 'App',

  components: {
    HomeLogged,
    LoginLogout
  },

  data: () => ({
    isLogged: false,
    snackbarActive: false,
    snackbarMessage: '',
    snackbarColor: '',
    User: null
  }),
  methods:{
    setSnack(mensagem, color) {
      this.snackbarActive = true
      this.snackbarMessage = mensagem
      this.snackbarColor = color ? color : null
    },
    login(user){
      this.isLogged = true
      this.User = user
    },
    logout(){
      this.isLogged = false
      this.User = null
    },
    validar(value) {
      this.isLogged = value || false;
      if (value) {
          this.getDadosUsuario();
      }
    },
    getDadosUsuario(){
      let vm = this
      const config = {
        headers:{
            'x-access-token': vm.$session.get(global.keySession),
            'Content-type': 'application/json'
        }
      };
        axios.get(getRoute('users/logado'), config)
        .then(response => {
            this.User = response.data.user
            this.$refs.login.setUser(this.User)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    refreshTimeline(){
      this.$refs.tl.refresh()
    },
    isOnMobile() {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          case 'sm': return true
          default: return false
      }
    },
  }
};
</script>
