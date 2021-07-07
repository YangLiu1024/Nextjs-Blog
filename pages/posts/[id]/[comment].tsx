import { getPostData } from "../../../utils/posts"

export default function Comment({comment, title}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{comment}</p>
        </div>
    )
}

export const getServerSideProps = async ({params}) => {
    console.log('get server side props for comment', params)
    const data = await getPostData(params.id as string)
    return {
        props: {
            title: data.title,
            comment: 'comment:' + params.comment
        }
    }
}