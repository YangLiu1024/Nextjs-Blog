const SubmitButton = {
    template: `<button><slot>Submit</slot></button>`
}
new Vue({
    template: `<SubmitButton>OK</SubmitButton>`,
    el: "#root",
    components: {
        SubmitButton
    }
})