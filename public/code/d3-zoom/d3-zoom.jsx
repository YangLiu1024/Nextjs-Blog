const width = 800
const height = 450
const marginLeft = 30
const marginBottom = 30
const marginTop = 10
const marginRight = 10
const chartWidth = width - marginLeft - marginRight
const chartHeight = height - marginTop - marginBottom

const svg = d3.select('#chart')
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
//d3.randomNormal(mu, sigma) use normal Gaussian distribution
const randomX = d3.randomNormal((chartWidth) / 2, 80)
const randomY = d3.randomNormal((chartHeight) / 2, 80)
let datas = Array.from({length: 500}, () => [randomX(), randomY()])

const xs = d3.scaleLinear().domain([0, chartWidth]).range([0, chartWidth])
const ys = d3.scaleLinear().domain([0, chartHeight]).range([chartHeight, 0])
//basic chart
let chart = svg.append('g')
    .attr('id', 'chart')
    .attr('transform', `translate(${marginLeft} ${marginTop})`)

let xaxis = chart.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0 ${chartHeight})`)
    .call(d3.axisBottom(xs))

let yaxis = chart.append('g')
    .attr('id', 'y-axis')
    .call(d3.axisLeft(ys))

//现在还有一个问题，那就是当 zoom 的时候， scatter 会穿过 x, y 轴
//这是因为x, y 轴外部仍然属于 svg 范围，而且我们只 zoom 了 scatter, 对于 x, y 轴只是更新了 scale, 并没有改变位置
//为了解决这个问题，引入 clipPath
chart.append('defs')
    .append('clipPath')
    .attr('id', 'myClip')
    .append('rect')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
let scatter = chart.append('g')
    .attr('id', 'scatter')
    .attr('clip-path', 'url("#myClip")')

let circles = drawCircles()

function drawCircles() {
    return scatter.selectAll('circle')
        .data(datas)
        //第一次绘制 circle 时，其 cx,cy,r 都为0， 所以表现形式都是从原点过渡到指定地点
        //只有第一次 enter 时，enter.size() = 500, refresh 时，即使 datas 重新生成，但 circle 节点早已存在
        .join(enter => enter.append('circle').attr('r', 2).attr('fill', (_, i) => d3.interpolateRainbow(i / 360)))
            //在后续的绘制时，因为每一个 circle 可能已经经过了缩放，已经具有 transform 属性
            //在改变它 cx,cy 属性的同时，当前 transform 也会起作用，看起来，就是在当前坐标系下调整了点的位置
            //如果将点的 transform 属性置为 null, 则相当于对点进行 reset
            //.attr('transform', null)
        .transition()
            .delay((d, i) => i * 20)
            .attr('cx', d => xs(d[0]))
            .attr('cy', d => ys(d[1]))
        .selection()//需要返回 selection instead of transition, 因为 zoomed function 要使用
}
function zoomed({transform}, d, i) {
    //除了 zoom chart, x, y 轴也应该随着变化
    let nxs = transform.rescaleX(xs)//计算当前 transform 下的 x axis scale
    let nys = transform.rescaleY(ys)
    xaxis.call(d3.axisBottom(nxs))
    yaxis.call(d3.axisLeft(nys))
    //这里必须把 scatter 和 circles 区分开
    //因为 clip path 是添加到 scatter 上面的，我们希望它保持不变，所以我们只 apply transform 到 circles
    //否则 clip path 也会进行缩放，就起不到我们想要的效果了
    circles.attr('transform', transform)
    //similar to below code, 但是本质不一样， transform 是创建了新的了坐标系，且将该属性存在了 circle node 里
    //下面的code 还是在当前坐标系下进行绘制
    // circles.attr('cx', d => nxs(d[0]))
    //     .attr('cy', d => nys(d[1]))
    //     .attr('r', d => 2 * transform.k)
}
//start to add zoom behavior
const zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', zoomed)
svg.call(zoom)//svg is zoom base which is responsible for receiving user input

initToolbar()
function initToolbar() {
    d3.select('#refresh').on('click', () => {
        datas = Array.from({length: 500}, () => [randomX(), randomY()])
        drawCircles()
    })
    d3.select('#reset').on('click', () => svg
        .transition()
        .duration(2000)
        .call(zoom.transform, d3.zoomIdentity))
    d3.select('#zoom-in').on('click', () => svg
        .transition()
        .duration(750)
        .call(zoom.scaleBy, 2))
    d3.select('#zoom-out').on('click', () => svg
        .transition()
        .duration(750)
        .call(zoom.scaleBy, 0.5))
    d3.select('#pick').on('click', () => {
        let [x, y] = datas[Math.floor(Math.random() * datas.length)]
        svg.transition()
            .duration(1500)
            //先平移到 client area 中心，然后改变 scale, 然后在当前坐标系下，平移到 -xs(x), -ys(y) 上。 那么在这个坐标系下绘制 xs(x), ys(y) 时，它就会被绘制在 client area 中心。
            //最后的结果看起来就像是该点被平移到了 client area 中心并且放大了
            .call(zoom.transform, d3.zoomIdentity.translate(chartWidth / 2, chartHeight / 2).scale(40).translate(-xs(x), -ys(y)))
    })
    //还可以只注销 wheel.zoom 或者 dblclick 事件 listener
    d3.select('#clear').on('click', () => svg.on('.zoom', null))
}
