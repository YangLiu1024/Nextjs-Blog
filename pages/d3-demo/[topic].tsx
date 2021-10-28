import {getAllCodeTopics, getCodeTopic} from '../../utils/code'
import { GetStaticProps, GetStaticPaths } from 'next'
import { CodePen } from '../../components/CodePen';
import * as React from "react";
import {MDXRemote} from "next-mdx-remote";

export default function Topic({source, frontMatter}) {
    return <div style={{margin: "20px 0 20px 20px"}}>
        {/*<ScrollBottom innerRef={codePen}/>*/}
        {/*<CodePen innerRef={codePen} {...code}/>*/}
        {/*<article>*/}
        {/*    <div dangerouslySetInnerHTML={{ __html: code.md}} style={{margin: "0 0 20px 20px"}}/>*/}
        {/*</article>*/}
        {frontMatter.title && <h1>{frontMatter.title}</h1>}
        <article>
            <MDXRemote {...source} components={{CodePen}}></MDXRemote>
        </article>
    </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const names = getAllCodeTopics()
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