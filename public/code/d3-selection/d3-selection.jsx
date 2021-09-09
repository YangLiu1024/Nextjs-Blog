
d3.selectAll('p')
    .data(['hello', 'world'])
        .text((d, i) => `I am number ${i} paragraph: ${d}`)

