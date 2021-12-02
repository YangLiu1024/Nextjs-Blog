const HelloWorld = () => {
    const [message, setMessage] = React.useState("Hello React")
    const [tooltip, setTooltip] = React.useState(new Date().toLocaleString())

    return (
        <span title={tooltip}>
            {message}
        </span>
    )
}

ReactDOM.render(
    <HelloWorld/>,
    document.getElementById('root')
)