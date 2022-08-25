<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
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

      <LoginLogout ref="login" v-on:emitSnack="setSnack" v-on:login='login' v-on:logout='logout' />

      <v-btn
        target="_blank"
        text
        @click="OpenRegras"
      >
        <span class="mr-2">Regras</span> 
        <v-icon>mdi-open-in-new</v-icon> 
      </v-btn>
    </v-app-bar>

    <v-main>
      <HomeLogged v-if="isLogged" :User="User"/>
    </v-main>

    <v-dialog v-model="dialogRegras">
      <v-card dark>
        <v-card-title class="text-h6" v-text="'Regras'">
        </v-card-title>
        <v-card-text>
            <br>
            
            <p class="text-block">Cada jogador possui um tabuleiro 3x3 (Colunas A, B e C, com 3 linhas cada).</p>
            <br>
            <p class="text-block">A cada turno, um dos jogadores rola um dado de seis lados e o coloca em um dos espaços no seu tabuleiro.</p>
            <br>
            <p class="text-block">O placar é a soma de todos os dados que o jogador colocou no tabuleiro.</p>
            <br>
            <p class="text-block">Além disso, combinações de dois dados iguais na mesma coluna valem o dobro. Três dados iguais valem o triplo.</p>
            <br>
            <p class="text-block">Ao colocar o dado em uma das colunas, se o adversário tiver dados com o mesmo número naquela mesma coluna, os dados do adversário são eliminados.</p>
            <br>
            <p class="text-block">O jogo termina quando um dos jogadores preencher todos os espaços no seu tabuleiro.</p>
            <br>
            <p class="text-block">Vence quem tiver mais pontos.</p>
            <br>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'
import { getRoute, validarSessao } from './js/util'

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
    User: null,
    dialogRegras: false,
  }),
  created(){
    validarSessao(this)
  },
  methods:{
    OpenRegras(){
      this.dialogRegras = true
    },
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
      console.log('logout')
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
