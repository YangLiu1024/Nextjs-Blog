import Layout from '../../components/layout'
import { getAllPostId, getPostData } from '../../utils/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/common.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/dist/client/router';

export default function Post({postData}: {postData: {
  title: string,
  date: string,
  contentHtml: string
}}) {
  const router = useRouter()
  //when user input the path which not include by getStaticPaths, and fallback is true
  //nextjs will render this page with empty postData first, and router.isFallback will return true
  //when getStaticProps is resolved, nextjs will render this page again.
  console.log('render post')
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return <Layout home={false}>
      <Head>
          <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
  </Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostId()
    return {
      paths,
      fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params })  => {
    console.log('query post data for ', params.id)
    const postData = await getPostData(params.id as string)
    return {
      props: {
        postData
      }
    }
}