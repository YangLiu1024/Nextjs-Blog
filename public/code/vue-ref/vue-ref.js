const FocusInput = {
    template: `<input ref="input" placeholder="I will be focused"/>`,
    mounted() {
        this.focusInput()
    },
    methods: {
        focusInput() {
            this.$refs.input.focus()//这里的this.$refs.input 指向了原生 DOM 元素 input
        }
    }
}

new Vue({
    el: "#root",
    template: `<div><FocusInput ref="input"/><button @click="focus">Focus</button></div>`,
    methods: {
        focus() {
            this.$refs.input.focusInput()//这里的this.$refs.input 指向了自定义组件 FocusInput
        }
    },
    components: {
        FocusInput
    }
})



