import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {serialize} from "next-mdx-remote/serialize";

const codeFolder = path.join(process.cwd(), 'public', 'code')


export function getAllCodeTopics() {
    return JSON.parse(fs.readFileSync(path.join(codeFolder, 'd3-demo.json')).toString())
}

export async function getCodeTopic(topic) {
    //
    // const html =  path.join(codeFolder, topic, `${topic}.html`)
    // const jsx =  path.join(codeFolder, topic, `${topic}.jsx`)
    // const css =  path.join(codeFolder, topic, `${topic}.css`)
    // const deps =  path.join(codeFolder, topic, `${topic}.json`)
    const md = path.join(codeFolder, topic, `${topic}.mdx`)
    return loadMarkdown(md)
    // return {
    //     code: fs.existsSync(jsx) ? fs.readFileSync(jsx).toString() : '',
    //     html: fs.existsSync(html) ? fs.readFileSync(html).toString() : '',
    //     css: fs.existsSync(css) ? fs.readFileSync(css).toString() : '',
    //     dependencies: fs.existsSync(deps) ? JSON.parse(fs.readFileSync(deps).toString()) : [],
    //     md: fs.existsSync(md) ? await loadMarkdown(md) : ''
    // }
}

async function loadMarkdown(path) {
    const fileContents = fs.readFileSync(path, 'utf8')

    // Use gray-matter to parse the post metadata section
    const {content, data} = matter(fileContents)
    const source = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: []
        },
        scope: data
    })
    return {
        source,
        frontMatter: data
    }
    // // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //     .use(html)
    //     .process(matterResult.content)
    // return processedContent.toString()
}