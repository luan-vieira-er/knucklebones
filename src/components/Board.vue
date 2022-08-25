<template>
    <div>
        <v-btn
            v-if="!isGoing && !showNames"
            @click="NewGame"
            class="mx-2"
            dark
            color="indigo"
            > Novo Jogo
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>

        <br>

        <v-row v-if="showNames">
            <v-col
            cols="12"
            sm="6"
            md="3"
            >
            <v-text-field v-model="Player1.Name"
                label="Player 1"
            ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="6"
            md="3"
            >
            <v-text-field v-model="Player2.Name"
                label="Player 2"
            ></v-text-field>
            </v-col>
            <v-col>
                <v-btn
                @click="StartGame"
                class="mx-2"
                dark
                color="indigo"
                > Novo Jogo
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>


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
      showNames: false,
    }
    },
    components: {
        ColumnsComponent,
        DiceComponent
    },
    methods:{
        NewGame(){
            this.showNames = true
        },
        StartGame(){
            if(!this.Player1.Name || !this.Player2.Name){
                console.log('erro')
                return
            }
            this.showNames = false
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