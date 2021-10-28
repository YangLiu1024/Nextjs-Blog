const points = [
    [0, 0],
    [20, -20],
    [-20, -20],
    [-20, 20],
    [20, 20]
]
const line = d3.line()

let svg = d3.select('svg')

svg.append('g')
        .attr('transform', 'translate(100, 100)')
    .append('path')
        .attr('d', line(points))
        .style('stroke-width', 1)
        .style('stroke', 'steelblue')
        .style('fill', 'none')

const spiral = Array.from({length:76}, (_, i) => [
    (Math.PI / 3) * i,
    2 * i
])

svg.append('g')
        .attr('transform', 'translate(350, 300)')
    .append('path')
        .attr('d', d3.lineRadial()(spiral))
        .style('fill', 'none')
        .style('stroke', 'black')