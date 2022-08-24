<template>
    <div>
        <br>
        Player {{player}} Columns:
        <br>
        {{ColumnA[0].value}} | {{ColumnB[0].value}} | {{ColumnC[0].value}}
        <br>
        {{ColumnA[1].value}} | {{ColumnB[1].value}} | {{ColumnC[1].value}}
        <br>
        {{ColumnA[2].value}} | {{ColumnB[2].value}} | {{ColumnC[2].value}}
        <br>
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
            let total = 0
            for (let i in this.ColumnA){
                total += this.ColumnA[i].value
            }
            for (let i in this.ColumnB){
                total += this.ColumnB[i].value
            }
            for (let i in this.ColumnC){
                total += this.ColumnC[i].value
            }
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