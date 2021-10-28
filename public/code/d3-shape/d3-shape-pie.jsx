const datas = [
    {
        name: 'China',
        count: 50,
        color: 'red'
    },
    {
        name: 'USA',
        count: 38,
        color: 'yellow'
    },
    {
        name: 'Japan',
        count: 25,
        color: 'blue'
    }
]
const pie = d3.pie().value(d => d.count).padAngle(Math.PI / 6)
const arc = d3.arc().innerRadius(0).outerRadius(100)

const gs = d3.select('svg')
    .append('g')
        .attr('transform', 'translate(250, 250)')
    .selectAll('g')
    .data(pie(datas))
    .join('g')

gs.append('path')
    .attr('d', d => arc(d))
    //.attr('d', arc) is more simpler
    .attr('fill', d => d.data.color)
gs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .style('text-anchor', 'middle')
    .text(d => d.data.name)
