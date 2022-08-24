<template>
    <div>
        <br>
        Player {{player}} Columns:
        <br>
        <v-row>
            <v-col>
                <div class="mt-1" v-for="dice in ColumnA" :key="dice">
                    <v-btn v-if="dice.value"
                        dark
                        color="indigo"
                        >
                        <v-icon dark >
                            mdi-dice-{{dice.value}}
                        </v-icon>
                    </v-btn>
                    <v-btn v-else
                        dark
                        color="indigo"
                        >
                        <v-icon dark >
                            numeric-0-circle
                        </v-icon>
                    </v-btn>
                </div>
            </v-col>
            <v-col>
                <div class="mt-1" v-for="dice in ColumnB" :key="dice">
                    <v-btn v-if="dice.value"
                        dark
                        color="indigo"
                        >
                        <v-icon dark >
                            mdi-dice-{{dice.value}}
                        </v-icon>
                    </v-btn>
                    <v-btn v-else
                        dark
                        color="indigo"
                        >
                        <v-icon dark >
                            numeric-0-circle
                        </v-icon>
                    </v-btn>
                </div>
            </v-col>
            <v-col>
                <div class="mt-1" v-for="dice in ColumnC" :key="dice">
                    <v-btn v-if="dice.value"
                        dark
                        color="indigo"
                        >
                        <v-icon dark >
                            mdi-dice-{{dice.value}}
                        </v-icon>
                    </v-btn>
                    <v-btn v-else
                        dark
                        color="indigo"
                        >
                        <v-icon dark >
                            numeric-0-circle
                        </v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        
        
    </div>
</template>

<script>
export default {
    name: 'ColumnsComponent',
    data(){
        return {
            ColumnA: [
                {value: null},
                {value: null},
                {value: null},
            ],
            ColumnB: [
                {value: null},
                {value: null},
                {value: null},
            ],
            ColumnC: [
                {value: null},
                {value: null},
                {value: null},
            ]
        }
    },
    props:{
        player: Number
    },
    methods: {
        async canAdd(column){
            if (column == 0) {
                for (let i in this.ColumnA){
                    if (this.ColumnA[i].value == null) return true
                }
            } else if (column == 1) {
                for (let i in this.ColumnB){
                    if (this.ColumnB[i].value == null) return true
                }
            } else if (column == 2) {
                for (let i in this.ColumnC){
                    if (this.ColumnC[i].value == null) return true
                }
            }
            return false
        },
        add(column, value) {
            if (column == 0) {
                for (let i in this.ColumnA){
                    if (this.ColumnA[i].value == null){
                        this.ColumnA[i].value = value
                        this.AtualizaPlacar()
                        return
                    }
                }
            } else if (column == 1) {
                for (let i in this.ColumnB){
                    if (this.ColumnB[i].value == null){
                        this.ColumnB[i].value = value
                        this.AtualizaPlacar()
                        return
                    }
                }
            } else if (column == 2) {
                for (let i in this.ColumnC){
                    if (this.ColumnC[i].value == null){
                        this.ColumnC[i].value = value
                        this.AtualizaPlacar()
                        return
                    }
                }
            }
        },
        destroy(column, value) {
            if (column == 0) {
                for (let i in this.ColumnA){
                    if (this.ColumnA[i].value == value){
                        this.ColumnA[i].value = null
                    }
                }
            } else if (column == 1) {
                for (let i in this.ColumnB){
                    if (this.ColumnB[i].value == value){
                        this.ColumnB[i].value = null
                    }
                }
            } else if (column == 2) {
                for (let i in this.ColumnC){
                    if (this.ColumnC[i].value == value){
                        this.ColumnC[i].value = null
                    }
                }
            }
            this.AtualizaPlacar()
        },
        async AtualizaPlacar(){
            let total = 0, totalMulti = 0, totalIndependente = 0

            for (let i in this.ColumnA){
                if(this.ColumnA[i].value){
                    totalIndependente += this.ColumnA[i].value
                }
            }

            if(this.ColumnA[0].value == this.ColumnA[1].value && this.ColumnA[0].value == this.ColumnA[2].value){
                totalMulti = this.ColumnA[0].value * 3
                totalMulti += totalMulti
            } else {
                if(this.ColumnA[0].value == this.ColumnA[1].value || this.ColumnA[0].value == this.ColumnA[2].value){
                    totalMulti = this.ColumnA[0].value * 2
                } else {
                    if(this.ColumnA[1].value == this.ColumnA[2].value){
                        totalMulti = this.ColumnA[1].value * 2
                    }
                }
            }

            total += totalIndependente + totalMulti
            totalMulti = 0, totalIndependente = 0

            for (let i in this.ColumnB){
                if(this.ColumnB[i].value){
                    totalIndependente += this.ColumnB[i].value
                }
            }

            if(this.ColumnB[0].value == this.ColumnB[1].value && this.ColumnB[0].value == this.ColumnB[2].value){
                totalMulti = this.ColumnB[0].value * 3
            } else {
                if(this.ColumnB[0].value == this.ColumnB[1].value || this.ColumnB[0].value == this.ColumnB[2].value){
                    totalMulti = this.ColumnB[0].value * 2
                } else {
                    if(this.ColumnB[1].value == this.ColumnB[2].value){
                        totalMulti = this.ColumnB[1].value * 2
                    }
                }
            }

            total += totalIndependente + totalMulti
            totalMulti = 0, totalIndependente = 0

            for (let i in this.ColumnC){
                if(this.ColumnC[i].value){
                    totalIndependente += this.ColumnC[i].value
                }
            }

            if(this.ColumnC[0].value == this.ColumnC[1].value && this.ColumnC[0].value == this.ColumnC[2].value){
                totalMulti = this.ColumnC[0].value * 3
            } else {
                if(this.ColumnC[0].value == this.ColumnC[1].value || this.ColumnC[0].value == this.ColumnC[2].value){
                    totalMulti = this.ColumnC[0].value * 2
                } else {
                    if(this.ColumnC[1].value == this.ColumnC[2].value){
                        totalMulti = this.ColumnC[1].value * 2
                    }
                }
            }

            total += totalIndependente + totalMulti

            this.$emit('AtualizaPlacar', this.player, total)
            this.verifyAll()
        },
        async verifyAll(){
            let Done1 = true, Done2 = true, Done3 = true
            for (let i in this.ColumnA){
                if (this.ColumnA[i].value == null)Done1 = false
            }
            for (let i in this.ColumnB){
                if (this.ColumnB[i].value == null) Done2 = false
            }
            for (let i in this.ColumnC){
                if (this.ColumnC[i].value == null) Done3 = false
            }
            if (Done1 && Done2 && Done3){
                this.$emit('FimDeJogo')
            }
        }
    }
}
</script>
