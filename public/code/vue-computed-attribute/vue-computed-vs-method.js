var vm = new Vue({
    template: `
        <div>
            {{fullName}}
            <button v-on:click="add">Counter: {{count}}</button>
            <button v-on:click="change">Change</button>
            {{upperCaseName()}}
        </div>      
    `,
    data: {
        firstName: "yang",
        lastName: "liu" ,
        count : 0
    },
    computed: {
        fullName() {
            console.log('recalculate full name')
            return this.lastName + ' ' + this.firstName;
        }
    },
    methods: {
        add() {
            this.count++
        },
        upperCaseName() {
            console.log('recalculate upper case name')
            return this.lastName.toUpperCase() + ' ' + this.firstName.toUpperCase()
        },
        change() {
            this.firstName = this.firstName + this.count
        }
    },
    el: "#root"
})



