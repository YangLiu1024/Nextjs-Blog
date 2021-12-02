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
    template: `<div><DebounceText/></div>`,
    components: {
        DebounceText
    }
})



