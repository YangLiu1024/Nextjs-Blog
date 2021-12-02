const App = () => {
    const languages = ['Java', 'Python', 'C++']

    return (
        <ul>
            {languages.map((v, index) => <li key={index}>{v} ranked {index}</li>)}
        </ul>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);