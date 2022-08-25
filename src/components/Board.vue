<template>
    <div>

        <v-overlay :value="isLoading">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        
        <v-row>
            <v-col>
                <v-btn
                    v-if="!isGoing && !OngoingMatch"
                    @click="NewGame"
                    class="mx-2 black--text"
                    dark
                    color="white"
                    > Novo Jogo
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    v-if="!isGoing && !OngoingMatch"
                    @click="ShowMyGames"
                    class="mx-2 black--text"
                    dark
                    color="white"
                    > Meus jogos
                        <v-icon dark>
                            mdi-magnify
                        </v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row v-if="!isGoing && !OngoingMatch">
            <v-data-table v-if="myMatches.length > 0"
                :headers="[{
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },{
                    text: 'Data',
                    align: 'start',
                    sortable: false,
                    value: 'data',
                },{
                    text: 'Player 1',
                    align: 'start',
                    sortable: false,
                    value: 'player1',
                },{
                    text: 'Player 2',
                    align: 'start',
                    sortable: false,
                    value: 'player2',
                }]"
                :items="myMatches"
                :items-per-page="15"
                class="elevation-1"
            ></v-data-table>
        </v-row>
        

        <br>

        <v-card>
            <v-row v-if="OngoingMatch">
                <v-col>
                    <v-text-field v-model="OngoingMatch.Match.id" disabled
                        label="Partida Id"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field v-model="OngoingMatch.Match.token" disabled
                        label="Token"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field v-text="'Aguardando 2° Player'" disabled v-if="OngoingMatch.Match.status == 0"
                        label="Status"
                    ></v-text-field>
                    <v-text-field v-text="'Em andamento'" disabled v-else-if="OngoingMatch.Match.status == 1"
                        label="Status"
                    ></v-text-field>
                    <v-text-field v-text="'Partida finalizada'" disabled v-else-if="OngoingMatch.Match.status == 2"
                        label="Status"
                    ></v-text-field>
                    <v-text-field v-text="'Partida expirada'" disabled v-else-if="OngoingMatch.Match.status == 3"
                        label="Status"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row v-if="OngoingMatch">
                <v-data-table v-if="OngoingMatch.Events"
                :headers="[{
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },{
                    text: 'Descrição',
                    align: 'start',
                    sortable: false,
                    value: 'description',
                }]"
                :items="OngoingMatch.Events"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
            </v-row>
        </v-card>

        <div v-if="isFinished">
            FIM DE JOGO!
            {{Player1.Placar}} x {{Player2.Placar}}

            <p v-if="Player1.Placar > Player2.Placar">{{Player1.Name}} Venceu</p>
            <p v-else-if="Player2.Placar > Player1.Placar">{{Player2.Name}}  Venceu</p>
            <p v-else>Empate</p>
        </div>

        <br>

        <div v-show="isGoing">
            {{Player1.Placar}} x {{Player2.Placar}}
            <br>
            <DiceComponent :Player="Player1" ref="DicePlayer1" v-on:MoveDone="MoveDone" />
            <DiceComponent :Player="Player2" ref="DicePlayer2" v-on:MoveDone="MoveDone" />
            <br>
            <ColumnsComponent :Player="Player1" ref="ColumnsPlayer1" v-on:FimDeJogo="FimDeJogo" v-on:AtualizaPlacar="AtualizaPlacar" />
            <ColumnsComponent :Player="Player2" ref="ColumnsPlayer2" v-on:FimDeJogo="FimDeJogo" v-on:AtualizaPlacar="AtualizaPlacar" />
            <br>
        </div>
    </div>
</template>

<script>
import ColumnsComponent from './Colums.vue'
import DiceComponent from './Dice.vue'

import axios from 'axios'

import { getRoute } from '../js/util'

export default {
    name: 'BoardComponent',
    data(){
    return {
      dice: true,
      playerStarting: null,
      Player1: {
        id: 0,
        Name: null,
        Placar: 0
      },
      Player2: {
        id: 1,
        Name: null,
        Placar: 0
      },
      isGoing: false,
      isFinished: false,

      isLoading: false,

      OngoingMatch: null,
      MatchId: null,
      myMatches: []
    }
    },
    props:{
      User: Object
    },
    components: {
        ColumnsComponent,
        DiceComponent
    },
    methods:{
        async NewGame(){
            this.isLoading = true
            await axios.post(getRoute('match/create'), {
                player: this.User.id
            }).then( response => {
                this.MatchId = response.data.id
                setInterval(() => {
                    this.getOngoingMatch(this.MatchId)                    
                }, 2500);
            }).catch(err => {      
                console.log(err.response.data)  
                this.isLoading = false
            })
        },
        async ShowMyGames(){
            this.isLoading = true
            await axios.post(getRoute('match/read'), {
                player1: this.User.id
            }).then( response => {
                this.myMatches = response.data
                this.isLoading = false
            }).catch(err => {      
                console.log(err.response.data)  
                this.isLoading = false
            })
        },
        async getOngoingMatch(id){
            await axios.post(getRoute('match/readone'), {
                id: id
            }).then( response => {
                console.log(response.data)
                this.OngoingMatch = response.data
                this.isLoading = false
            }).catch(err => {      
                console.log(err.response.data)  
                this.isLoading = false
            })
        },
        StartGame(){
            if(!this.Player1.Name || !this.Player2.Name){
                console.log('erro')
                return
            }
            this.isGoing = true
            this.isFinished = false
            this.playerStarting = Math.floor(Math.random() * 2)
            this.EnableDice(this.playerStarting)
        },
        EnableDice(player){
            if (player == 0){
                this.$refs.DicePlayer1.setRollable(true)
            } else {
                this.$refs.DicePlayer2.setRollable(true)
            }
            this.dice = !this.dice
        },
        DisableDice(player){
            if (player == 0){
                this.$refs.DicePlayer1.setRollable(false)
            } else {
                this.$refs.DicePlayer2.setRollable(false)
            }
            this.dice = !this.dice
        },
        addColumn(player, column, value){
            if (player == 0){
                this.$refs.ColumnsPlayer1.add(column, value)
                this.$refs.ColumnsPlayer2.destroy(column, value)
            } else {
                this.$refs.ColumnsPlayer2.add(column, value)
                this.$refs.ColumnsPlayer1.destroy(column, value)
            }
        },
        async verifyColumn(player, column, value) {
            if (player == 0){
                if (await this.$refs.ColumnsPlayer1.canAdd(column)) {
                    this.addColumn(player, column, value)
                    this.$refs.DicePlayer1.moveOk(true)
                    return true
                } else {
                    this.$refs.DicePlayer1.moveOk(false)
                    return false
                }
            } else {
                if (await this.$refs.ColumnsPlayer2.canAdd(column)) {
                    this.addColumn(player, column, value)
                    this.$refs.DicePlayer2.moveOk(true)
                    return true
                } else {
                    this.$refs.DicePlayer2.moveOk(false)
                    return false
                }
            }
        },
        async MoveDone(player, column, value){
            this.DisableDice(0)
            this.DisableDice(1)

            let isOk = await this.verifyColumn(player, column, value)
            if (!isOk) {
                return
            }
            if (player == 0){
                this.EnableDice(1)
            } else {
                this.EnableDice(0)
            }
        },
        FimDeJogo(){
            this.DisableDice(0)
            this.DisableDice(1)
            this.isGoing = false
            this.isFinished = true
        },
        AtualizaPlacar(player, placar){
            if (player == 0){
                this.Player1.Placar = placar
            } else {
                this.Player2.Placar = placar
            }
        }
    }
    
    
}
</script>