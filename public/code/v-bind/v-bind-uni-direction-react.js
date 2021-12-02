const Count = ({count}) => (
    <button onClick={() => count = count + 1}>{count}</button>
)

const App = () => {
    const [count, setCount] = React.useState(0)
    return (
        <Count count={count} handleClick={() => setCount(c => c + 1)}/>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)