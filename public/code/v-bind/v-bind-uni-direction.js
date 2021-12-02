const Count = {
    template: `<button @click="count = count + 1">{{count}}</button>`,
    props: ['count']
}
var vm = new Vue({
    el: "#root",
    template: `<div><Count :count="count"/><button @click="refresh">Refresh</button></div>`,
    data: {
        count: 0
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    components: {
        Count
    }
})



