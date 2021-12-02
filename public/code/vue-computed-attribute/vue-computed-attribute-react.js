const Demo = () => {
    const [firstName, setFirstName] = React.useState('yang')
    const [lastName, setLastName] = React.useState('liu')
    const [count, setCount] = React.useState(0)

    const fullName = React.useMemo(() => {
        console.log('recalculate full name')
        return firstName + ' ' + lastName
    }, [firstName, lastName])

    function upperCaseName() {
        console.log('recalculate upper case name')
        return lastName.toUpperCase() + ' ' + firstName.toUpperCase()
    }
    return (
        <div>
            {fullName}
            <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>
            <button onClick={() => setFirstName(n => n + count)}>Change</button>
            {upperCaseName()}
        </div>
    )
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
);



