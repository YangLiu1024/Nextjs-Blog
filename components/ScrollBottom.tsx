function ScrollBottom({innerRef}) {

    function scrollToBottom() {
        innerRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    return <svg onClick={scrollToBottom} style={{position:"fixed", right: 20, bottom : 55, width: 40, height: 40, padding: 0, cursor: 'pointer', 'borderRadius': 10, border: '2px solid steelblue'}}>
        <path fill={"steelblue"} d={"M 18 35 h 4 v -20 h 4 L 20 5 L 14 15 h 4 Z"}></path>
    </svg>
}
export  default ScrollBottom