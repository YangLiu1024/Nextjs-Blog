const Children = {
    template: `
        <div>I am children <button v-on:click="fire">Fire 5</button></div>
    `,
    methods: {
        fire() {
            console.log('Children fire event')
            this.$emit('event', 5)
        }
    }
}

const Parent = {
    template: `
        <div>
            <Children v-on:event="onFire"></Children>
            I am parent <button v-on:click="fire">Fire 10</button>
        </div>
    `,
    methods: {
        fire() {
            console.log('emit event by itself')
            this.$emit('event', 10)
        },
        onFire(v) {
            console.log('listen on children ', v)
        }
    },
    mounted() {
        this.$on('event', v => console.log('listen on itself ', v))
    },
    components: {
        Children
    }
}

var vm = new Vue({
    el: "#root",
    template: `<Parent/>`,
    components: {
        Parent
    }
})



