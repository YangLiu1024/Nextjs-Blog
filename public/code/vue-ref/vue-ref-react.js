const FocusInput = (props) => {
    return (
        <input placeholder={"I will be focused"} ref={props.topRef}/>
    )
}

const App = () => {
    const iref = React.useRef(null)

    React.useEffect(() => focusInput(), [])

    function focusInput() {
        if (iref.current) {
            iref.current.focus()
        }
    }

    return (
        <div><FocusInput topRef={iref}/><button onClick={focusInput}>Focus</button></div>
    )
}
ReactDOM.render(
    <App/>,
    document.getElementById('root')
)


