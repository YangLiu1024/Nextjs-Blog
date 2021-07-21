
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
    const id = params.id
    const commentId = params.comment
    const content = await fetch(`http://localhost:3000/api/posts/${id}/${commentId}`)
    const text = await content.text()

    return {
        props: {
            title: id,
            comment: text
        }
    }
}