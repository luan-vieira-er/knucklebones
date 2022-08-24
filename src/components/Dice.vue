<template>
    <div>
        Player {{player}} Dice: {{value}}

        <button :disabled="!isRollable" @click="roll">
            Roll
        </button>

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
            column: 0
        }
    },
    props:{
        player: Number
    },
    methods: {
        roll(){
            this.value = Math.floor(Math.random() * 6) + 1
            this.isRollable = false
            this.isAddable = true
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