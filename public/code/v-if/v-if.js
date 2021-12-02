new Vue({
    el: "#root",
    template: `
    <div>
        <button @click="login = !login">{{label}}</button>
        <p v-if="login">Welcome, visitor</p>
        <p v-else>Please login</p>
    </div>
    `,
    data: {
        login: false
    },
    computed: {
        label() {
            return this.login ? 'Logout' : 'Login'
        }
    }
})