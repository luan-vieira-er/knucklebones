<template>
    <div>
        <br>
        {{Player.Name}}:
        <br>
        <v-row>
            <v-col>
                <div class="mt-1" v-for="(dice, index) in ColumnA" :key="index">
                    <v-btn v-if="dice.value"
                        dark
                        :color="dice.color"
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
                <div class="mt-1" v-for="(dice, index) in ColumnB" :key="index">
                    <v-btn v-if="dice.value"
                        dark
                        :color="dice.color"
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
                <div class="mt-1" v-for="(dice, index) in ColumnC" :key="index">
                    <v-btn v-if="dice.value"
                        dark
                        :color="dice.color"
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
                {
                    value: null,
                    color:"indigo"
                },
                {
                    value: null,
                    color:"indigo"
                },
                {
                    value: null,
                    color:"indigo"
                },
            ],
            ColumnB: [
                {
                    value: null,
                    color:"indigo"
                },
                {
                    value: null,
                    color:"indigo"
                },
                {
                    value: null,
                    color:"indigo"
                },
            ],
            ColumnC: [
                {
                    value: null,
                    color:"indigo"
                },
                {
                    value: null,
                    color:"indigo"
                },
                {
                    value: null,
                    color:"indigo"
                },
            ]
        }
    },
    props:{
        Player: Object
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
                        this.ColumnA[i].color = "blue"
                        this.AtualizaPlacar()
                        return
                    }
                }
            } else if (column == 1) {
                for (let i in this.ColumnB){
                    if (this.ColumnB[i].value == null){
                        this.ColumnB[i].value = value
                        this.ColumnB[i].color = "blue"
                        this.AtualizaPlacar()
                        return
                    }
                }
            } else if (column == 2) {
                for (let i in this.ColumnC){
                    if (this.ColumnC[i].value == null){
                        this.ColumnC[i].value = value
                        this.ColumnC[i].color = "blue"
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
                        this.ColumnA[i].color = "indigo"
                    }
                }
            } else if (column == 1) {
                for (let i in this.ColumnB){
                    if (this.ColumnB[i].value == value){
                        this.ColumnB[i].value = null
                        this.ColumnB[i].color = "indigo"
                    }
                }
            } else if (column == 2) {
                for (let i in this.ColumnC){
                    if (this.ColumnC[i].value == value){
                        this.ColumnC[i].value = null
                        this.ColumnC[i].color = "indigo"
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

                this.ColumnA[0].color = "red"
                this.ColumnA[1].color = "red"
                this.ColumnA[2].color = "red"
            } else {
                if (this.ColumnA[0].value == this.ColumnA[1].value){
                    totalMulti = this.ColumnA[0].value * 2
                    this.ColumnA[0].color = "green"
                    this.ColumnA[1].color = "green"
                } else if (this.ColumnA[0].value == this.ColumnA[2].value){
                    totalMulti = this.ColumnA[0].value * 2
                    this.ColumnA[0].color = "green"
                    this.ColumnA[2].color = "green"
                } else if(this.ColumnA[1].value == this.ColumnA[2].value){
                    totalMulti = this.ColumnA[1].value * 2
                    this.ColumnA[1].color = "green"
                    this.ColumnA[2].color = "green"
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
                totalMulti += totalMulti

                this.ColumnB[0].color = "red"
                this.ColumnB[1].color = "red"
                this.ColumnB[2].color = "red"
            } else {
                if (this.ColumnB[0].value == this.ColumnB[1].value){
                    totalMulti = this.ColumnB[0].value * 2
                    this.ColumnB[0].color = "green"
                    this.ColumnB[1].color = "green"
                } else if (this.ColumnB[0].value == this.ColumnB[2].value){
                    totalMulti = this.ColumnB[0].value * 2
                    this.ColumnB[0].color = "green"
                    this.ColumnB[2].color = "green"
                } else if(this.ColumnB[1].value == this.ColumnB[2].value){
                    totalMulti = this.ColumnB[1].value * 2
                    this.ColumnB[1].color = "green"
                    this.ColumnB[2].color = "green"
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
                totalMulti += totalMulti

                this.ColumnC[0].color = "red"
                this.ColumnC[1].color = "red"
                this.ColumnC[2].color = "red"
            } else {
                if (this.ColumnC[0].value == this.ColumnC[1].value){
                    totalMulti = this.ColumnC[0].value * 2
                    this.ColumnC[0].color = "green"
                    this.ColumnC[1].color = "green"
                } else if (this.ColumnC[0].value == this.ColumnC[2].value){
                    totalMulti = this.ColumnC[0].value * 2
                    this.ColumnC[0].color = "green"
                    this.ColumnC[2].color = "green"
                } else if(this.ColumnC[1].value == this.ColumnC[2].value){
                    totalMulti = this.ColumnC[1].value * 2
                    this.ColumnC[1].color = "green"
                    this.ColumnC[2].color = "green"
                }
            }

            total += totalIndependente + totalMulti

            this.$emit('AtualizaPlacar', this.Player.id, total)
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
