<template>
    <div>
        <v-btn v-if="!isSignIn" target="_blank" text @click="dialogLogin = true">
            <v-icon>mdi-account</v-icon> <span class="mr-2">Login</span> 
        </v-btn>
        <v-menu offset-y v-else-if="User">
            <template v-slot:activator="{ on, attrs }">
                <v-btn  target="_blank" text v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>  <span class="mr-2">{{User.login}}</span> 
                </v-btn>
            </template>
        </v-menu>
        <v-btn v-if="User" @click="efetuarLogout" target="_blank" text>
            <v-icon>mdi-logout</v-icon> 
        </v-btn>
        
        <v-dialog v-model="dialogLogin" max-width="600">
            <v-card>
                <v-banner single-line v-if="messageErro">
                    <v-icon slot="icon" color="danger" size="36">
                        mdi-close-octagon
                    </v-icon>
                    {{messageErro}}
                </v-banner>
                <v-card-title class="text-h5">
                    Login
                </v-card-title>

                <v-card-text >
                    <v-text-field v-model="username" label="Username"></v-text-field>
                    <v-text-field v-model="password" label="Senha" :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="mostrarPassword ? 'text' : 'password'" @click:append="mostrarPassword = !mostrarPassword"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="abrirCadastro">
                        Não tem conta? Cadastre-se
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialogLogin = false">
                        Fechar
                    </v-btn>

                    <v-btn color="green darken-1" text @click="efetuarLogin">
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCadastro" max-width="600">
            <v-card>
                <v-banner single-line v-if="messageErro">
                    <v-icon slot="icon" color="danger" size="36">
                        mdi-close-octagon
                    </v-icon>
                    {{messageErro}}
                </v-banner>
                <v-card-title class="text-h5">
                    Cadastro
                </v-card-title>

                <v-card-text >
                    <v-text-field v-model="username" label="Username"></v-text-field>
                    <v-text-field v-model="email" label="E-mail"></v-text-field>
                    <v-text-field v-model="password" label="Senha" :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="mostrarPassword ? 'text' : 'password'" @click:append="mostrarPassword = !mostrarPassword"></v-text-field>
                    <v-text-field v-model="passwordConfirm" label="Senha" :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="mostrarPassword ? 'text' : 'password'" @click:append="mostrarPassword = !mostrarPassword"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogCadastro = false">
                        Fechar
                    </v-btn>

                    <v-btn color="green darken-1" text @click="efetuarCadastro">
                        Cadastrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import { getRoute } from '../js/util'

export default {
    name: 'LoginLogout',
    components: {
    },
    data () {
        return {
            isSignIn: null,
            dialogLogin: false,
            dialogCadastro: false,
            username: null,
            password: null,
            passwordConfirm:null,
            email: null,
            User: null,
            mostrarPassword: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            messageErro: null
        }
    },
    methods: {
        async efetuarCadastro(){
            await axios.post(getRoute('users/create'), {
                login: this.username,
                email: this.email,
                senha: this.password,
                senhaConfirm: this.passwordConfirm,
            }).then( response => {
                console.log(response.data)
                this.dialogCadastro = false
                this.emitSnack('Cadastro efetuado com sucesso.')
            }).catch(err => {      
                console.log(err.response.data)  
                this.messageErro = err.response.data
                setTimeout(() => {
                    this.messageErro = null
                }, 2000);
            })
        },
        async abrirCadastro(){
            this.dialogLogin = false
            this.dialogCadastro = true
        },
        emitSnack(mensagem){
            this.$emit('emitSnack', mensagem)
        },
        async efetuarLogin(){
            let vm = this
            await axios.post(getRoute('users/login'), {
                login: this.username,
                senha: this.password
            }).then( response => {
                this.User = response.data.user
                vm.$session.set(global.keySession,response.data.dados.token)
                this.$emit('login', this.User)
                this.isSignIn = true
                this.dialogLogin = false
            }).catch(err => {      
                console.log(err) 
                vm.$session.remove(global.keySession)
                this.messageErro = err.response.data
                setTimeout(() => {
                    this.messageErro = null
                }, 2000);
            })
        },
        async efetuarLogout(){
            let vm = this
            this.User = null
            this.isSignIn = false
            axios.post(getRoute("users/logout"))
                .then((response) => {
                    vm.$session.set(global.keySession, response.data.token);
                    vm.$emit("validar", false);
                    this.$emit('logout')
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async setUser(user){
            this.User = user
            this.isSignIn = true
        }
    }
}
</script>

<style scoped>
    .v-list:hover{
        cursor: pointer;
    }
</style>