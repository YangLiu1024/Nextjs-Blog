import { getAllVueTopics } from '../../utils/code'
import {GetStaticProps} from 'next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () =>  {
    const allTopics = getAllVueTopics()
    return {
        props: {
            allTopics,
        }
    }
}

const VueDemo = ({allTopics}) => {
    return <ul>
        {
            allTopics.map((t, i) => (
                <li key={i}>
                    <Link href={`/vue/${t}`}>
                        <a>{t}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
}

export default VueDemo