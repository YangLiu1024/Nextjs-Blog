# D3 Shape
有的图形比较简单，比如矩形，可以直接通过 rect 创建，但是对于其它较为复杂的图形，比如 pie, stack 等，可以通过 d3-shape 来创建

## Arcs
### d3.arc()
创建一个弧形 generator, with default setting, such  as <code>const arc = d3.arc()</code>
### arc(...arguments)
使用传入的参数创建弧形
```js
const arc = d3.arc()

let d = arc({
    innerRadius: 0,
    outerRadius: 100,
    startAngle: 0,
    endAngle: Math.PI / 2
})

//equals to
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2)

let d = arc()

d3.select('svg')
    .append('path')
        .attr('d', d)
```
需要注意的是，创建的 arc 总是以 (0, 0) 为 origin, 如果需要平移，则需要使用 transform

### arc.innerRadius([value])
设置 innerRadius, 返回 arc generator, 如果不带参数，则返回当前 innerRadius

### arc.outerRadius([value])
设置 outerRadius, 返回 arc generator, 如果不带参数，返回当前 outerRadius

### arc.startAngle([angle])
设置 start angle, 以弧度为单位，且以12 o'clock 方向为 0 弧度

### arc.endAngle([angle])
设置 end angle, 以弧度为单位，且以12 o'clock 方向为 0 弧度

### arc.centroid(arguments)
通过传入的参数计算该弧形对应的中心点， 通常用来计算在弧形上放置 label 的位置

## Pie
Pie generator 并不会直接生成图形，instead, 它会根据传入的数据计算出每个 pie 的 startAngle, endAngle 等等，这些数据接下来就可以传给 arc generator 来生成图形
### d3.pie()
创建 pie generator with default setting
### pie(data)
data 是数据数组，数组元素可以是数字或者 object. 返回值也是数组，长度和 data 一样，且元素一一对应。返回值数组元素满足以下格式
* data, the input datum, 即传入的数组中对应的元素
* value, 该 pie 所对应的 value, 越大，所占的角度越大
* index, by default, 所有的 pie 会根据 value 降序排序， value 越大的 pie 排在越前面，即 startAngle 越小 
* startAngle， start angle
* endAngle, end angle
* padAngle, pad angle

for example, 
```js
const data = [1, 1, 2, 3, 5, 8, 13, 21];
const arcs = d3.pie()(data);

//arcs
[
  {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
  {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
  {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
  {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
  {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
  {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
  {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
  {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
]
```
### pie.value([value])
设置每一个 pie 的 value accessor, by default, it will be
```js
//pass the datum, index, and the data array
pie.value((d, i, datas) => d)//return the datum directly
```
如果传入的数组元素是 object, 则可以在这里指定 value accessor

### pie.sort([compare])
指定 datum comparator, sort all pies according to it. by default, datum comparator is null, it will sort by value in descending order.

如果显式指定了 datum comparator, 会将 value comparator 置为 null。

需要注意的是，sort 本身不会改变返回值数组元素的顺序，它始终保持和输入数组的一一对应。sort 改变的是每一个 pie 的 index 属性，以及它对应的 startAngle 和 endAngle.

且如果你想 d1 排在 d2 前面，则 compare(d1, d2) 需要返回 negative value

### pie.sortValues([compare])
指定 value comparator, 它比较的是 value instead of datum, by default, 
```js
function compare(v1, v2) {
    return v2 - v1;//descending order by default, bigger value, smaller index
}
```
### pie.startAngle([value])
设置全局 start angle, by default, its 0

### pie.endAngle([angle])
设置全局 end angle, by default, its Math.PI * 2

### pie.padAngle([angle])
pad angle 是指每个pie 之间的 angle, 如果指定了，则相邻的 pie 之间会有间隔。

因为设置了 pad angle, 那么所有 pie 加起来所占的角度则为 (endAngle - startAngle) - size * padAngle

### pie chart demo
```js
const data = [
  {
  	name: 'China',
    value: 41
  },
  {
  	name: 'USA',
    value: 39
  },
  {
  	name: 'Japan',
    value: 28
  }
]
//pies 是一个数组，每个元素具有 data,value,index,startAngle,endAngle,padAngle
const pies = d3.pie().value(d => d.value).padAngle(Math.PI / 6)(data)

//创建弧形 generator, 只设置了 innerRadius, outerRadius, 还没有设置 startAngle, endAngle
const arc = d3.arc().innerRadius(0).outerRadius(100)
const colors = d3.scaleOrdinal(['red', 'blue', 'yellow'])

let pie = d3.select('svg')
    .append('g')
        .attr('transform', 'translate(250, 250)')
    .selectAll('g')
    .data(pies)
    .join('g')

pie.append('path')
    .attr('d', arc)//arc 是一个函数，等价于 d => arc(d), 且 d 含有 startAngle, endAngle, 所以返回值是 path 的定义
    .attr('fill', (_, i) => colors(i))

pie.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)//同样，arc.centroid 也是一个函数，返回该弧形对应的中心点
    .style('text-anchor', 'middle')
    .text(d => d.data.name)//注意为了传入数据的 name, 需要通过 d.data.name, 因为这里的 d 是pies 数组里的元素， d.data 才是输入数组里的datum
```

## Line
line generator 用来生成线条
### d3.line([x][,y])
创建一个 line generator with default setting, 如果指定了x or y, 则设置对应的 x, y accessor
### line(data)
data 是数组，by default, 该数组元素应该是含有2个元素的数组[x, y]. 通过该数组和设置的 x, y accessor 生成线条
### line.x([x])
设置 x accessor. by default, it is <code>(d, i, datas) => d[0]</code>
### line.y([y])
设置 y accessor. by default, it is <code>(d, i, datas) => d[1]</code>
### line.curve([curve])
设置该线条的 curve, by default, its d3.curveLinear, 即数据点之间通过直线连接

### d3.lineRadial()
创建一个 line generator with default setting, 该 generator 和 d3.line() 的区别在于，该 generator 不是使用 (x,y) 坐标，而是使用 (angle, radius)

且 angle 使用弧度
### lineRadial(data)
similar with line(data), 区别在于，d[0] 是 angle, d[1] 是 radius
### lineRadial.angle([angle])
similar with line.x()
### lineRadial.radius([radius])
similar with line.y()

### line demo
```js
const spiral = Array.from({length: 75}, (_, i) => [
    (Math.PI / 3) * i,
    2 * i
])

d3.select('svg')
    .append('path')
        .attr('transform', 'translate(250, 250)')
        .attr('fill', 'none')
        .attr('d', d3.lineRadial()(spiral))
        .attr('stroke', 'steelblue')
```

## Area
区域图形是指有两条bounding line 围成的区域。通常，这两条线条有相同的 x value, 即 x0 = x1, 并且 y0 != y1. y0 通常设为常量 0
### d3.area([x][,y0][,y1])
创建一个区域图形 generator with default setting. 
### area(data)
data 是数据数组，通过该数组以及对应的 x, y accessor 生成 area.
### area.x([x])
设置 x accessor, 如果指定，则将 x0 accessor 设为 x, 将 x1 accessor 置为 null, 返回 area generator. 如果不指定参数，返回 x0 accessor
### area.x0([x])
设置 x0 accessor, by default, its <code>(d, i, datas) => d[0]</code>
### area.x1([x])
设置 x1 accessor, by default, its null, 表示 x0 accessor 的返回值也作为 x1 使用
### area.y([y])
类似于 area.x([x])
### area.y0([y])
设置 y0 accessor, by default, return 0
### area.y1([y])
设置 y1 accessor, by default, its <code>(d, i, datas) => d[1]</code>
### area.defined([defined])
有的时候，有些数据可能不合法或者不想要，可以通过该方法来过滤掉。 by default, its <code>(d, i, datas) => true</code>
### area.curve([curve])
设置该 area 的 curve 工厂函数

### d3.areaRadial()
类似与 d3.area, 只是不再使用 x, y 坐标，而是使用 angle, radius
### areaRadial(data)
类似与 area(data)
### areaRadial.angle([angle])
类似于 area.x()
### areaRadial.startAngle([angle])
类似于 area.x0()
### areaRadial.endAngle([angle])
类似于 area.x1()
### areaRadial.radius([radius])
类似于 area.y()
### areaRadial.innerRadius([radius])
类似于 area.y0()
### areaRadial.outerRadius([radius])
类似于 area.y1()

### area demo
```js
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
        .attr('transform', 'translate(30, 10)')

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
```

## Curve
line 被定义为一组 (x, y) 点的连线，area 被定义为 topline 和 baseline 之间的区域，除此之外，还有一个很重要的工作，那就是怎么连接离散的点。 换句话说，就是在离散的点之间怎么进行插值。

d3 定义了很多插值函数，可以被 line 或者 area 这种 generator 直接使用，比如 line.curve(d3.curveLinear) 或者 area.curve(d3.curveCatmullRom)

## Stack
有的时候我们需要使用 stack chart, 比如将多个 area chart 堆叠起来。
### d3.stack()
创建一个 stack generator with default setting, d3.stack() 类似于 d3.pie(), 它们都不直接生成图形，而是生成数据，以供其它generator 使用 

### stack(data[,arguments])
data 是数据数组，返回 series 数组。

一般，data 数组中每个元素包含了一列的数据，即该纵列可能包含多个 key, 每个 key 有自己的 value。

返回的 series 数组中每个元素也是一个数组，它则包含了一行的数据，该行数据属于同一个 key. 
```js
//第一层 layer(series)
[
    [0, 100, data: {...}],//第一个 datum 中 apple 对应的高度， 0 是 y0, 100 是 y1, d[apple] = 100
    [0, 50, data: {...}],//第二个 datum 中 apple 对应的高度
    [0, 80, data: {...}],
    key: 'apple',
    index: 0
],
//第二层 layer
[
    [100, 150, data: {...}],//第一个 datum 中 banana 对应的高度， 100 是 y0, 150 是 y1, d[banana]=50
    [50, 90, data: {...}],//第二个 datum 中 banana 对应的高度
    [80, 130, data: {...}],
    key: 'banana',
    index: 1
]
```

### stack.keys([keys])
keys 用来指定每一个 layer(series) 的 key, 一般是字符串。每一个 key 都会生成对应的 layer.
### stack.value([value])
设置 value accessor, by default, it assume datum is object, key is named property, d[key] return numerical value, <code>(d, key, i, datas) => d[key]</code>. 
### stack.order([order])
同样，stack chart 也包含多层 layer, 也涉及到排序的问题，by default, its d3.stackOrderNone, 表示和 keys 保持相同的顺序

如果指定 order function, 它会传入生成好的 series 数组，然后该函数必须返回一个index 数组
```js
//the order function define the order for each series
//by default, series order keep consistent with keys order
//after the order is computed, set the order as index property for each series
function orderNone(series) {
  let n = series.length;
  return Array.from({length: n}, (_, i) => i)
}
```
order function 在 offset 之前执行，这个时候，所有点的 lower value 还是 0， order 完成后，会更新所有 series 的 index
### stack.offset([offset])
该函数用来更新所有点的 lower and upper value, by default, its d3.stackOffsetNone, it will use zero baseline

该函数接收生成的 series 数组，以及 order 函数生成的 order 数组
```js
function offsetNone(series, order) {
    if (!((n = series.length) > 1)) return;
    
    for (let i = 1, s0, s1 = series[order[0]], m = s1.length; i < n; ++i) {
        s0 = s1, s1 = series[order[i]];
        for (let j = 0; j < m; ++j) {
            s1[j][1] += s1[j][0] = s0[j][1];//将每个点的 lower value 更新为上一个layer 的 upper value, 然后将自己的 upper value 更新为 上一个layer 的upper value 加上自己本身的 value
        }   
    }
}
```
### stack demo
```js
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
        .attr('transform', 'translate(50, 10)')

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
```

## Symbol
d3 提供了一些基础的 symbol, 比如圆，十字形，菱形，五角星等。这些 symbol 通常用于 scatter plot
### d3.symbol([type][,size])
创建一个 symbol generator with default setting. by default, type is circle, size is 64
### symbol(...arguments)
通过参数创建一个 symbol path definition, 如果指定参数，该参数会传入 symbol 的 type accessor 和 size accessor
### symbol.type([type])
指定 type accessor, by default, return circle
### symbol.size([size])
指定 size accessor, by default, return 64
### d3.symbols
返回一个包含所有 built-in symbol type 的数组， 包含: circle, cross, diamond, square, star, triangle, wye
### d3.symbolCircle
返回 circle symbol type
### d3.symbolCross
返回 cross symbol type

### symbol demo
```js
d3.select('svg')
    .selectAll('path')
    .data(d3.symbols)
    .join('path')
        .attr('d', d => d3.symbol().type(d).size(100)())
        .attr('transform', (_, i) => `translate(${i * 20}, 50)`)
```



