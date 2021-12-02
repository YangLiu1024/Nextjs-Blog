const SubmitButton = (props) => (
    <button>{props.children || 'Submit'}</button>
)

ReactDOM.render(
    <SubmitButton/>,
    document.getElementById('root')
)