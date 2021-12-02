new Vue({
    template: `
        <div @click.self="rootClick">
            <button v-on:click.prevent="doThis">Click</button>
            <input v-on:keyup.enter.once="doThat($event)"></input>
        </div>
    `,
    methods: {
        doThis() {
            console.log('do this')
        },
        doThat({target: {value}}) {
            console.log(value)
        },
        rootClick() {
            console.log('click on root')
        }
    },
    el: "#root"
})



