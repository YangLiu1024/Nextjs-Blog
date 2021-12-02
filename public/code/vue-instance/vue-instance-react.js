const Children = ({onHandleFire}) => {
    return (
        <div>I am Children <button onClick={(e) => onHandleFire && onHandleFire(5)}>Fire 5</button></div>
    )
}

const Parent = () => {
    const [clicked, setClicked] = React.useState(false)

    function handleChildrenClick(value) {
        console.log('handle children click', value)
    }

    function handleFire() {
        console.log('handle click itself ', 10)
        setClicked(true)
    }
    return (
        <div>
            <Children onHandleFire={handleChildrenClick}/>
            I am parent<button onClick={clicked ? null: handleFire}>Fire 10</button>
        </div>
    )
}

ReactDOM.render(
    <Parent/>,
    document.getElementById('root')
);



