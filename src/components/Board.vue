<template>
    <div>
        <v-btn
            v-if="!isGoing"
            @click="NewGame"
            class="mx-2"
            fab
            dark
            color="indigo"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>

        <br>

        <div v-if="isFinished">
            FIM DE JOGO!
            {{placar0}} x {{placar1}}

            <p v-if="placar0 > placar1">Player 0 Venceu</p>
            <p v-else-if="placar1 > placar0">Player 0 Venceu</p>
            <p v-else>Empate</p>
        </div>

        <br>

        <div v-show="isGoing">
            {{placar0}} x {{placar1}}
            <br>
            <ColumnsComponent :player="0" ref="ColumnsPlayer1" v-on:FimDeJogo="FimDeJogo" v-on:AtualizaPlacar="AtualizaPlacar" />
            <ColumnsComponent :player="1" ref="ColumnsPlayer2" v-on:FimDeJogo="FimDeJogo" v-on:AtualizaPlacar="AtualizaPlacar" />
            <br>
            <DiceComponent :player="0" ref="DicePlayer1" v-on:MoveDone="MoveDone" />
            <DiceComponent :player="1" ref="DicePlayer2" v-on:MoveDone="MoveDone" />
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
      placar0:0,
      placar1:0,
      isGoing: false,
      isFinished: false,
    }
    },
    components: {
        ColumnsComponent,
        DiceComponent
    },
    methods:{
        NewGame(){
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
                this.placar0 = placar
            } else {
                this.placar1 = placar
            }
        }
    }
    
    
}
</script>