let container = d3.select('#container')
container.append('p')
    .text('i am the last paragraph of container')

let ps = container.selectAll('p')
    .data(['hello', 'world', 'javascript'])
    .append('span')
    .text(d => d)

ps.selectAll('b')
    .data(d => d)//pass the parent selection node datum to current selection node
    .enter()
    .each(function(d, i, nodes) {
        console.log(d, i, nodes.length)
    })

