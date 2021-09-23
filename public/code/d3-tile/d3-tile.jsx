const width = 800
const height = 600

const svg = d3.select('#container')
    .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

const tiler = d3.tile()
    .extent([[0, 0], [width, height]])

const zoom = d3.zoom()
    .scaleExtent([1 << 8, 1 << 22])
    .extent([[0, 0], [width, height]])
    .on('zoom', ({transform}) => zoomed(transform))

let tileGroup = svg.append('g')
    .attr('pointer-events', 'none')
    .attr('font-family', 'var(--sans-serif)')
    .attr('font-size', 16)

svg.call(zoom)
    .call(zoom.transform, d3.zoomIdentity
        .translate(width/2, height/2)
        .scale(1 << 9))

function zoomed(transform) {
    const tiles = tiler(transform)//通过当前 transform 计算出当前 visible tiles， such as [0,0,1],[0,1,1],[1,0,1],[1,1,1]
    //tiles.scale 和 tiles.translate 是 tiles 整体的缩放和平移，且需要先 scale, 再平移
    tileGroup.attr('transform', `scale(${tiles.scale}) translate(${tiles.translate[0]} ${tiles.translate[1]})`)
    tileGroup.selectAll('g')
        .data(tiles)
        .join('g')
        //整体的坐标系已经被缩放，现在 scale 较大，为了在之后添加 rect 和 text 时使用正常的 scale, 先缩小 256 倍
            .attr('transform', ([x,y]) => `translate(${x}, ${y}) scale(${1/256})`)
        .call(g => g.selectAll('*').remove())//对于先前已经存在的 g, 需要先删除所有它已有的 children, 否则children会一直叠加
        .call(g => g.append('rect')
            .attr('fill', 'steelblue')
            .attr('fill-opacity', 0.5)
            .attr('stroke', 'black')
            .attr('width', 256)//这里的宽度是 256, 是因为我们已经人为缩小了 scale 256 倍。所以最后 rect 的宽度就会是 tiles.scale
            .attr('height', 256))//如果不预先缩小 scale, 那么这里的 width 和 height 就应该为 1, 且还要配置 stroke 宽度
        .call(g => g.append('text')
            .attr('x', '0.4em')//如果不预先缩小 scale, 那么这里的 0.4em 就会在 tiles.scale 下面进行缩放，字体就会过大
            .attr('y', '1.4em')
            .text(d => d.join('/')))
}