const App = () => {
    const [active, setActive] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [fontSize, setFontSize] = React.useState(30)

    const className = React.useMemo(() => {
        let names = 'static'
        if(active) {
            names += ' active'
        }
        if(error) {
            names += ' text-danger'
        }
        return names
    }, [active, error])

    const styleObject = React.useMemo(() => (
        {
            fontSize: fontSize + 'px'
        }
    ), [fontSize])
    return (
        <div>
            <button onClick={() => setActive(a => !a)}>Active</button>
            <button onClick={() => setError(e => !e)}>Error</button>
            <button onClick={() => setFontSize(s => s + 2)}>Large</button>
            <p className={className} style={styleObject}>
                I am first paragraph
            </p>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)