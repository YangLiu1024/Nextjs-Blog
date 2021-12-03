var vm = new Vue({
    el: "#root",
    template: `
        <div>
            <button @click="active = !active">Active</button><button @click="error = !error">Error</button><button @click="fontSize = fontSize + 2">Large</button>
            <p class="static" :class="{active: active, 'text-danger': error}" :style="{fontSize: fontSize + 'px'}">
                I am first paragraph
            </p>
            <p :class="['static', classObject]">
                I am second paragraph
            </p>
        </div>
    `,
    data() {
        return {
            active: true,
            error: false,
            fontSize: 30
        }
    },
    computed: {
        classObject() {
            return {
                active: this.active,
                'text-danger': this.error
            }
        },
        styleObject() {
            return {
                fontSize: this.fontSize + 'px'
            }
        }
    }
})



