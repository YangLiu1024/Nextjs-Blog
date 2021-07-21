import Layout from '../components/layout'
import utilStyles from '../styles/common.module.css'
import { useRouter } from 'next/router'

export default function Visitor() {
    const router = useRouter()
    console.log('visitor', router.isFallback, router.isReady, router.pathname, router.query, router.asPath)
    return (
        <Layout home={false}>
            <section className={utilStyles.headingMd}>
                <p>Hi visitor</p>
                <ul className={utilStyles.list}>
                {
                    Object.entries(router.query).map(([key, value]) => (
                        <li className={utilStyles.listItem} key={key}>
                            {key} = {value}
                        </li>
                    ))
                }
                </ul>
            </section>
        </Layout>
    )
}

// export async function getServerSideProps(context) {
//     const query = context.query
//     return {
//         props: {
//             query
//         }
//     }
// }