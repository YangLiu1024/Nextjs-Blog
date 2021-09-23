const spiral = Array.from({length: 75}, (_, i) => [
    (Math.PI / 3) * i,
    2 * i
])

function drawLine(selection) {
    selection.append('path')
        .attr('d', d3.lineRadial()(spiral))
}

let svg = d3.select('#root')
    .append('svg')
        .attr('width', 800)
        .attr('height', 400)
        .attr('viewBox', "0 0 800 400")
svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')

svg.append('g')
        .call(drawLine)
        .attr('transform', "translate(150 150)")