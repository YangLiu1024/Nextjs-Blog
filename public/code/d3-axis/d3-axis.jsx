let svg = d3.select('svg')

let ls = d3.scaleLinear().domain([-0.9912, 0.9876]).range([0, 600])

svg.append('g')
    .call(d3.axisBottom(ls))

svg.append('g')
    .attr('transform', 'translate(0, 30)')
    .call(d3.axisBottom(ls.copy().nice()))

svg.append('g')
    .attr('transform', 'translate(0, 60)')
    .call(d3.axisBottom(ls.copy()).ticks(15, "+%"))

svg.append('g')
    .attr('transform', 'translate(0, 90)')
    .call(d3.axisBottom(ls.copy()).tickValues([-0.9,-0.5,0,0.5,0.8,0.9, 1.2]))

svg.append('g')
    .attr('transform', 'translate(0, 120)')
    .call(d3.axisBottom(ls.copy()).tickValues([-0.9,-0.5,0,0.5,0.8,0.9]).tickSize(20))

let bs = d3.scaleBand(["A", "B", "C"], [0, 400])

function drawBand(c, s) {
    c.append('g')
        .call(d3.axisLeft(s))
    c.append('g')
        .selectAll('text')
        .data(s.domain())
        .join('text')
        .attr('y', d => s(d))
        .text(d => s(d))
}
svg.append('g')
    .attr('transform', 'translate(20, 180)')
    .call(drawBand, bs)

svg.append('g')
    .attr('transform', 'translate(200, 180)')
    .call(drawBand, bs.copy().round(true))

svg.append('g')
    .attr('transform', 'translate(240, 180)')
    .call(drawBand, bs.copy().round(true).paddingInner(0.2))

svg.append('g')
    .attr('transform', 'translate(280, 180)')
    .call(drawBand, bs.copy().round(true).paddingOuter(0.2))

svg.append('g')
    .attr('transform', 'translate(320, 180)')
    .call(drawBand, bs.copy().round(true).paddingOuter(0.2).align(0.2))

let ts = d3.scaleTime().domain([new Date(2021,0,1), new Date(2021, 0, 1, 15)]).range([0, 600])

svg.append('g')
    .attr('transform', 'translate(10, 600)')
    .call(d3.axisBottom(ts))

svg.append('g')
    .attr('transform', 'translate(10, 630)')
    .call(d3.axisBottom(ts.copy()).ticks(d3.timeHour.every(2), '%I %p'))


