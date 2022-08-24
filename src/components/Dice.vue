<template>
    <div>
        Player {{player}}

        <v-progress-circular v-if="isRolling"
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        <v-btn v-if="value"
            dark
            color="indigo"
            >
            <v-icon dark >
                mdi-dice-{{value}}
            </v-icon>
        </v-btn>
        

        <v-btn
            v-if="isRollable"
            @click="roll"
            class="mx-2"
            fab
            dark
            color="indigo"
            >
                <v-icon dark>
                    mdi-dice-multiple-outline
                </v-icon>
            </v-btn>


        <div v-if="isAddable">
            <label for="columns">Coluna:</label>
            <select name="columns" id="columns" form="columns" v-model="column">
                <option :value="0">1</option>
                <option :value="1">2</option>
                <option :value="2">3</option>
            </select>

            <button :disabled="!isAddable" @click="add">
                Add
            </button>
        </div>
        
        
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
        player: Number
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
            }, 2000);
            
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
            this.$emit('MoveDone', this.player, coluna, valor)
        },
        setRollable(isRollable){
            this.isRollable = isRollable
        }
    }
}
</script>