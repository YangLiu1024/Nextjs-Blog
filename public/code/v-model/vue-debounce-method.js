function debounce(fn, delay) {
    var timeoutId;
    return function() {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, arguments), delay)
    }
}

const DebounceText = {
    template: `<div><input @input="handleChange($event.target.value)"/>{{debounceFilter}}</div>`,
    data() {
        return {
            debounceFilter: ''
        }
    },
    methods: {
        handleChange: debounce(function (value) {
            this.debounceFilter = value
        }, 500)
    }
}
new Vue({
    el: "#root",
    template: `<div><DebounceText ref="text1"/><DebounceText ref="text2"/></div>`,
    mounted() {
        this.$refs.text1.handleChange('hello')
        this.$refs.text2.handleChange('world')
    },
    components: {
        DebounceText
    }
})



