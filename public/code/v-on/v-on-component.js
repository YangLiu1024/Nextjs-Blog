const Counter = {
    template: `<button @click="add">{{count}}</button>`,
    data() {
        return {
            count : 0
        }
    },
    methods: {
        add() {
            this.count = this.count + 1;
            this.$emit('add', this.count)
        }
    }
}

var vm = new Vue({
    template: `
     <div>
        Sum: {{sum}}
        <div>Counter 1: <Counter @add="addToSum"/> Counter 2: <Counter @add="addToSum"/></div>       
     </div>
    `,
    data: {
      sum: 0
    },
    methods: {
       addToSum(value) {
           this.sum += value
       }
    },
    components: {
        Counter
    },
    el: "#root"
})



