new Vue({
    el: "#root",
    template: `
    <div>
        <button @click="login = !login">{{label}}</button>
        <template v-if="login">
            <p>Welcome, visitor</p>
            <a href="#">Account</a>
        </template>
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