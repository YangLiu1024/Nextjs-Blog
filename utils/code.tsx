
import {fetchStatic} from './fetch'

export async function getAllCodeTopics() {
    return await fetchStatic('/code/demos.json', true)
}

export async function getCodeTopic(topic) {

    const html =  `/code/${topic}/${topic}.html`
    const jsx = `/code/${topic}/${topic}.jsx`
    const css = `/code/${topic}/${topic}.css`
    const deps = `/code/${topic}/${topic}.json`

    return {
        code: await fetchStatic(jsx) ,
        html: await fetchStatic(html),
        css: await fetchStatic(css),
        dependencies: await fetchStatic(deps, true)
    }
}