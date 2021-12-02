const DebounceText = {
    template: `<div><input @input="handleChange($event.target.value)"/>{{debounceFilter}}</div>`,
    data() {
        return {
            debounceFilter: ''
        }
    },
    methods: {
        handleChange(value) {
            if (this.timeoutID) clearTimeout(this.timeoutID)
            this.timeoutID = setTimeout(() => this.debounceFilter = value, 500)
        }
    }
}
new Vue({
    el: "#root",
    template: `<div><DebounceText/></div>`,
    components: {
        DebounceText
    }
})