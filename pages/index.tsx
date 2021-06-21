import Head from 'next/head'
import Link from 'next/link'
import FormatDate from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/common.module.css'
import { getSortedPostsData } from '../utils/posts'
import { GetStaticProps } from 'next'

export default function Home({allPosts}: {allPosts: {
  date: string,
  title: string,
  id: string
}[]}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am Yang, and hello to everyone</p>
        <p>{new Date().toTimeString()}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
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
  //the return value must be a object which has key 'props'
  return {
    props: {
      //the allPosts here will be passed to Home component as a prop
      allPosts
    }
  }
}