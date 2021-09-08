import fs from 'fs'
import path from 'path'
const codeFolder = path.join(process.cwd(), 'public', 'code')


export function getAllCodeTopics() {
    return fs.readdirSync(codeFolder)
}

export function getCodeTopic(topic) {

    const html =  path.join(codeFolder, topic, `${topic}.html`)
    const jsx =  path.join(codeFolder, topic, `${topic}.jsx`)
    const css =  path.join(codeFolder, topic, `${topic}.css`)
    const deps =  path.join(codeFolder, topic, `${topic}.json`)

    return {
        code: fs.existsSync(jsx) ? fs.readFileSync(jsx).toString() : '',
        html: fs.existsSync(html) ? fs.readFileSync(html).toString() : '',
        css: fs.existsSync(css) ? fs.readFileSync(css).toString() : '',
        dependencies: fs.existsSync(deps) ? JSON.parse(fs.readFileSync(deps).toString()) : []
    }
}