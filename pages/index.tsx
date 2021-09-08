import Head from 'next/head'
import Link from 'next/link'
import FormatDate from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/common.module.css'
import { getSortedPostsData } from '../utils/posts'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router';

export default function Home({allPosts, env}: {allPosts: {
  date: string,
  title: string,
  id: string
}[], env: {
  title: string,
  mode: string
}}) {
  const router = useRouter()
  console.log('home page', router.asPath, router.isReady)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am Yang, and hello to everyone</p>
        <p>Client Side could access public enviroment directly, such as {process.env.NEXT_PUBLIC_ENVIRONMENT}</p>
        <p>data fetching method could access all environments, add pass to Component as props, such as</p>
        <ul className={utilStyles.list}>
          {
            Object.keys(env).map(key => (
              <li className={utilStyles.listItem} key={key}>
                {key}: {env[key]}
              </li>
            ))
          }
        </ul>
        <p>Time: {new Date().toLocaleString()}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p><button onClick={() => router.push({pathname: "/visitor", query: {name: "yang"}}, "/visitor-yang")}>Go to Visitor </button></p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            allPosts.map(({id, title, date}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br/>
                {id}
                <br/>
                <FormatDate dateString={date}/>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () =>  {
  //here, allPosts is a array which hold all posts information, including id, meta information
  const allPosts = getSortedPostsData()
  //the environment can only be access in data fetchting methods, such as getStaticProps, and API routes
  //note that the process.env here is not a JS object actually, Nextjs will replace the whole string "process.env.*" to real value at build time
  const env = {title: process.env.TITLE, mode: process.env.MODE}
  //the return value must be a object which has key 'props'
  return {
    props: {
      //the allPosts here will be passed to Home component as a prop
      allPosts,
      env
    },
    revalidate: 10,
    notFound: false
  }
}