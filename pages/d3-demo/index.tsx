import { getAllCodeTopics } from '../../utils/code'
import {GetStaticProps} from 'next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () =>  {
    const allTopics = getAllCodeTopics()
    return {
      props: {
        allTopics,
      }
    }
  }

const D3Demo = ({allTopics}) => {
    return <ul>
        {
            allTopics.map((t, i) => (
                <li key={i}>
                    <Link href={`/d3-demo/${t}`}>
                        <a>{t}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
}

export default D3Demo