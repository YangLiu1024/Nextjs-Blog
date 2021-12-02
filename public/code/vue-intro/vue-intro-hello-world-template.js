var vm = new Vue({
    el: "#root",
    template: `
        <span v-bind:title="tooltip">{{message}}</span>
    `,
    data: {
        message: "Hello Vue!",
        tooltip: new Date().toLocaleString()
    }
})