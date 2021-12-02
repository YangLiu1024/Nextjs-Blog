new Vue({
    el: "#root",
    template: `
    <div>
        <button @click="useName = !useName">Toggle</button><br/>
        <template v-if="useName">
            <span>User Name</span><input placeholder="input user name"/>
        </template>
        <template v-else>
            <span>Email</span><input placeholder="input email"/>
        </template>
    </div>
    `,
    data: {
        useName: true
    }
})