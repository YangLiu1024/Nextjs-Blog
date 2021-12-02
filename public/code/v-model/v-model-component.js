const Counter = {
    props: ['value'],
    template: `<button @click="change">{{value}}</button>`,
    methods: {
        change() {
            this.$emit('input', this.value + 1)
        }
    }
}

var vm = new Vue({
    el: "#root",
    template: `<Counter v-model="count"/>`,
    data: {
        count: 0
    },
    components: {
        Counter
    }
})