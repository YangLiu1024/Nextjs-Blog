var vm = new Vue({
    el: "#root",
    template: `
    <div>
        <p>使用 v-bind 单向绑定数据</p>
        <input type="text" v-bind:value="text"/>
        <input type="checkbox" v-bind:checked="checked" />
        <input type="number" v-bind:value="number"/>
        <select :value="language" key="">
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="python">Python</option>
        </select>
        <p>使用 v-model 双向绑定数据</p>
        <input type="text" v-model="text"/>
        <input type="checkbox" v-model="checked"/>
        <input type="number" v-model="number"/>
        <select v-model="language">
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="python">Python</option>
        </select>
        <div>Text: {{text}}, Checked: {{checked}}, Number: {{number}}, Language: {{language}}</div>
    </div>`,
    data: {
        text: 'hello vue',
        checked: true,
        number: 0,
        language: 'java'
    }
})


