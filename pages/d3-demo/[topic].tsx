import {getAllCodeTopics, getCodeTopic} from '../../utils/code'
import { GetStaticProps, GetStaticPaths } from 'next'
import { CodePen } from '../../components/CodePen';

export default function Topic({code}) {
    return <CodePen {...code}/>
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
    const code = getCodeTopic(topic)
    console.log(code)
    return {
      props: {
         code
      }
    }
}