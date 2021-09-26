import {getAllCodeTopics, getCodeTopic} from '../../utils/code'
import { GetStaticProps, GetStaticPaths } from 'next'
import { CodePen } from '../../components/CodePen';
import {useRef} from "react";
import ScrollBottom from "../../components/ScrollBottom";
import * as React from "react";

export default function Topic({code}) {
    const codePen = useRef(null)
    return <div>
        <ScrollBottom innerRef={codePen}/>
        <CodePen innerRef={codePen} {...code}/>
        <article>
            <div dangerouslySetInnerHTML={{ __html: code.md}} style={{margin: "0 0 20px 20px"}}/>
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
         code
      }
    }
}