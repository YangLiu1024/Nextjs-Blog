import {getAllVueTopics, getCodeTopic} from '../../utils/code'
import { GetStaticProps, GetStaticPaths } from 'next'
import { CodePen } from '../../components/CodePen';
import * as React from "react";
import {MDXRemote} from "next-mdx-remote";
import Link from "next/link";
import {useRef} from "react";
import ScrollBottom from "../../components/ScrollBottom";

export default function Topic({source, frontMatter}) {
    const innerRef = useRef(null)
    function getName(path) {
        let names = path.split('/').filter(s => s)
        return names[names.length - 1]
    }
    return <div style={{margin: "20px 20px 20px 20px"}}>
        <ScrollBottom innerRef={innerRef}/>
        {/*<CodePen innerRef={codePen} {...code}/>*/}
        {/*<article>*/}
        {/*    <div dangerouslySetInnerHTML={{ __html: code.md}} style={{margin: "0 0 20px 20px"}}/>*/}
        {/*</article>*/}
        {frontMatter.title && <h1>{frontMatter.title}</h1>}
        <article ref={innerRef}>
            <MDXRemote {...source} components={{CodePen}}></MDXRemote>
        </article>
        <div style={{border: "1px solid steelblue", width: "100%", display:"flex", justifyContent:"space-between", marginTop: "20px"}}>
            {frontMatter.pre && <Link href={frontMatter.pre}><a>{"<<"} {getName(frontMatter.pre)}</a></Link>}
            {frontMatter.parent && <Link href={frontMatter.parent}><a>{"<<"} {getName(frontMatter.parent)} {">>"}</a></Link>}
            {frontMatter.next && <Link href={frontMatter.next}><a>{getName(frontMatter.next)} {">>"}</a></Link>}
        </div>
    </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const names = getAllVueTopics()
    const paths = names.map(n => {
        return {
            params: {
                topic: n
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params })  => {
    let topic = params.topic
    const code = await getCodeTopic(topic)
    return {
        props: {
            ...code
        }
    }
}