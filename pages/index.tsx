import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/common.module.css'

export default function Home() {

  return (
    <Layout home>
      <Head>
        <title>{"Learn and Share"}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am Yang, and hello to everyone</p>

        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem} key={"posts"}>
            <Link href={"/posts"}><a>{"Posts"}</a></Link>
          </li>
          <li className={utilStyles.listItem} key={"d3-demo"}>
            <Link href={"/d3-demo"}><a>{"d3-demo"}</a></Link>
          </li>
        </ul>
      </section>
    </Layout>
  )
}
