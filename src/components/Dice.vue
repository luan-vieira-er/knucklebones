<template>
    <div>
        <h1 v-if="isRollable || isAddable">Rodada de {{Player.Name}}</h1>
        <v-row>
            <v-col>
                <v-progress-circular v-if="isRolling"
                    :size="50"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                <v-btn v-if="value"
                    dark
                    color="indigo"
                    >
                    Dado Sorteado:   <v-icon dark >
                        mdi-dice-{{value}}
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    v-if="isRollable"
                    @click="roll"
                    class="mx-2"
                    dark
                    color="indigo"
                    > Rolar 
                        <v-icon dark>
                            mdi-dice-multiple-outline
                        </v-icon>
                    </v-btn>
            </v-col>
            <v-col v-if="isAddable">
                <v-select
                    :items="[{text:'A', value:0},{text:'B', value:1},{text:'C', value:2}]"
                    filled
                    v-model="column"
                    label="Coluna"
                    ></v-select>
            </v-col>
            <v-col v-if="isAddable">
                <v-btn
                    :disabled="!isAddable" @click="add"
                    class="mx-2"
                    fab
                    dark
                    color="indigo"
                    >
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
export default {
    name: 'DiceComponent',
    data(){
        return {
            value: 0,
            isRollable: false,
            isAddable: false,
            column: 0,
            isRolling: false
        }
    },
    props:{
        Player: Object
    },
    methods: {
        roll(){
            this.value == 0
            this.isRollable = false
            this.isRolling = true
            setTimeout(() => {
                this.value = Math.floor(Math.random() * 6) + 1
                this.isAddable = true
                this.isRolling = false
            }, 1000);
            
        },
        moveOk(isOk){
            if (isOk){
                this.value = 0
                this.column = 0
                this.isAddable = false
            }
            
        },
        add(){
            const valor = this.value;
            const coluna = this.column;
            this.isRollable = false
            this.$emit('MoveDone', this.Player.id, coluna, valor)
        },
        setRollable(isRollable){
            this.isRollable = isRollable
        }
    }
}
</script>