new Vue({
    el: "#root",
    data: {
        languages: ['Java', "C++", "Python"]
    },
    template: `
    <ul>
        <li v-for="(item, index) in languages" :key="index">{{item}} ranked {{index}}</li>
    </ul>
    `
})