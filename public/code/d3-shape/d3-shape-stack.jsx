const datas = [
    {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
    {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
    {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
    {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
];

const stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    //进入 order function 之前，默认生成的 series 数组, 现在数据还没有形成堆叠
    //[
    //data 都指向该元素的origin datum in input datas
    //[[0, 3840, data:{...}], [0, 1600, data: {...}], [0, 640, data: {...}], [0, 320, data: {...}], key: 'apples'],//the index is undefined yet
    //[[0, 1920, data:{...}], [0, 1440, data: {...}], [0, 960, data: {...}], [0, 480, data: {...}], key: 'bananas'],
    //[[0, 960, data:{...}], [0, 960, data: {...}], [0, 640, data: {...}], [0, 640, data: {...}], key: 'cherries'],
    //[[0, 400, data:{...}], [0, 400, data: {...}], [0, 400, data: {...}], [0, 400, data: {...}], key: 'dates'],
    //]
    //在 order function 里，通过返回的 order 数组，设置每个 series 的 index
    .order(d3.stackOrderNone)//stackOrderNone 会返回 [0, 1, 2, 3], 所以 series[0].index = 0, series[1].index = 1...
    //offset 函数会更新每个 series 里每个 point 的上下限，将每个 series 堆叠起来
    .offset(d3.stackOffsetNone)

let series = stack(datas)

const colors = d3.scaleOrdinal(['red', 'blue', 'yellow', 'green'])

let container = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(50, 50)')

const xs = d3.scaleUtc()
    .domain(d3.extent(datas, ({month}) => month))
    .range([0, 400])
    .nice()

const ys = d3.scaleLinear()
    .domain([0, d3.max(series, s => d3.max(s, p => p[1]))])
    .range([400, 0])
    .nice()

const area = d3.area()
    .x(p => xs(p.data.month))//注意这里使用的是 p.data.month
    .y0(p => ys(p[0]))
    .y1(p => ys(p[1]))

container.selectAll('path')
    .data(series)
    .join('path')
        .attr('d', area)
        .attr('stroke', 'steelblue')
        .attr('fill', (_, i) => colors(i))
container.append('g')
        .attr('transform', 'translate(0, 400)')
    .call(d3.axisBottom(xs).ticks(d3.utcMonth))

container.append('g')
    .call(d3.axisLeft(ys))

let legendItem = container.append('g')
        .attr('id', 'legend')
        .attr('transform', 'translate(300, 10)')
    .selectAll('g')
    .data(stack.keys())
    .join('g')
        .attr('transform', (_, i) => `translate(0, ${i * 20})`)
legendItem.append('rect')
    .attr('width', 20)
    .attr('height', 15)
    .attr('fill', (d, i) => colors(i))
legendItem.append('text')
    .attr('x', 25)
    .attr('y', 15)
    .text(d => d)