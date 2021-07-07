import Layout from '../../components/layout'
import { getAllPostId, getPostData, getPostAlias } from '../../utils/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/common.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';

export default function Post({postData}: {postData: {
  title: string,
  date: string,
  contentHtml: string
}}) {
  const router = useRouter()
  //when user input the path which not include by getStaticPaths, and fallback is true
  //nextjs will render this page with empty postData first, and router.isFallback will return true, router.query will be empty
  //when getStaticProps is resolved, nextjs will render this page again.

  //for the path in getStaticPaths, it will be {id: "pre-rendering"}, /post/[id], /post/pre-rendering
  //for the path not in getStaticPaths, the fallback version will be {}, /post/[id],/post/[id]
  //                                    the updated version willbe {id: "abc", name: "yang"},/post/[id],/post/abc?name=yang
  console.log('render post', router.query, router.pathname, router.asPath) 
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
    if (getPostAlias().includes(params.id as string)) {
      console.log('redirect')
      return {
        redirect: {destination: "/posts/sg-ssr", permanent: false}
      }
    }
    const postData = await getPostData(params.id as string)
    return {
      props: {
        postData
      }
    }
}