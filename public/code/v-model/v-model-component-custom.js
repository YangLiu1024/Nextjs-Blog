const Counter = {
    props: ['count'],
    model: {
        prop: 'count',//自定义 v-model 绑定的参数名
        event: 'add'//自定义参数值改变时触发的事件名
    },
    template: `<button @click="change">{{count}}</button>`,
    methods: {
        change() {
            this.$emit('add', this.count + 1)
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



