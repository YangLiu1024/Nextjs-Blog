const Layout = {
    template: `
    <div>
       <header><slot name="header"></slot></header> 
       <main><slot></slot></main>
       <footer><slot name="footer"></slot></footer>
    </div>
    `
}

new Vue({
    template: `
    <Layout>
    <template v-slot:header>
        <h1>I am header</h1>
        <p>This is a brief introduction to Vue</p>
    </template>
    <h1>I am Body</h1>
    <p>Vue 声明式语法让 Vue 看起来清晰明了</p>
    <template v-slot:footer>
        <a href="#">ASML</a>
    </template>    
    </Layout>
    `,
    el: "#root",
    components: {
        Layout
    }
})



