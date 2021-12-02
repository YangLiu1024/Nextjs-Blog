const App = () => {
    const [useName, setUseName] = React.useState(false)
    return (
        <div>
            <button onClick={() => setUseName(l => !l)}>Toggle</button><br/>
            {useName ?
                <><span>User Name: </span><input placeHolder="input user name"/></> :
                <><span>Email: </span><input placeHolder="input email"/></>}
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);