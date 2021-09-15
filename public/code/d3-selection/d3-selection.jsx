d3.selectAll('p')
    .data(['hello', 'world', 'javascript'])
    .selectAll('b')
    .data(d => d)
    .enter()
    .each(function(d, i, nodes) {
        console.log(d, i, nodes.length)
    })

