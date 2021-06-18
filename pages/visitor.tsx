import Layout from '../components/layout'
import utilStyles from '../styles/common.module.css'

export default function Visitor({query}) {
    return (
        <Layout home={false}>
            <section className={utilStyles.headingMd}>
                <p>Hi visitor</p>
                <ul className={utilStyles.list}>
                {
                    Object.entries(query).map(([key, value]) => (
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

export async function getServerSideProps(context) {
    const query = context.query
    return {
        props: {
            query
        }
    }
}