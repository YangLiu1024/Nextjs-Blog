const datas = d3.range(0, Math.PI * 2, Math.PI / 10)

const xs = d3.scaleLinear()
    .domain(d3.extent(datas))
    .range([0, 400])

const ys = d3.scaleLinear()
    .domain([-1, 1])
    .range([400, 0])

const area = d3.area()
    .x(d => xs(d))
    .y0(d => ys(Math.sin(d)))
    .y1(d => ys(Math.cos(d)))
    .defined(d => d != Math.PI)

let g = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(50, 50)')

g.append('path')
    .attr('d', area(datas))
    .attr('fill', 'steelblue')

g.append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0, 400)')
    .call(d3.axisBottom(xs))

g.append('g')
    .attr('id', 'y-axis')
    .call(d3.axisLeft(ys))

g.selectAll('circle')
    .data(datas)
    .join('circle')
        .attr('cx', xs)
        .attr('cy', d => ys(Math.sin(d)))
        .attr('r', 3)
        .attr('fill', 'white')
        .attr('stroke', 'lightsteelblue')
    .clone()
        .attr('cy', d => ys(Math.cos(d)))