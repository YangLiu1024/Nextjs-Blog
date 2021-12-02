Vue.component('Counter', {
    template: `<button>{{count}}</button>`,
    props: {
        count: {
            type: Number,
            required: true,
            validator: v => v >= 0
        }
    }
})

new Vue({
    el: "#root",
    template: `<Counter :count="-1"/>`
})