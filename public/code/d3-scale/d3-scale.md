# D3 Scale
D3 scale 主要是用来 mapping abstract data to visual representation.

# Table of contents
- [Linear Scale](#linear-scale)
- [Ordinal Scale](#ordinal-scale)
- [Time Scale](#time-scale)
- [Band Scale](#band-scale)

## Linear Scale <a name="linear-scale"></a>
Map input domain 到 output range。不仅可以做number 之间的映射，颜色等也可以。
```js
let x = d3.scaleLinear()//map [10, 130] to [0, 960] linearly
    .domain([10, 130])
    .range([0, 960]);

//shorthand
let x = d3.scaleLinear([10, 90], [0, 960])

x(20); // 80
x(50); // 320

//如果 domain 和 range 都是 numeric, 还 support invert
x.invert(80)//20
x.invert(320)//50

//当 domain 或者 range 超出设置的界限，d3 会自动通过插值来计算
x(-10)//-160
x.invert(-160)//-10

//当然也可以禁止这种行为
x.clamp(true)
x(-10)//0
x.invert(-160)//10

//对颜色做映射
var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"]);
//shorthand
var color = d3.scaleLinear([10, 100], ["brown", "steelblue"])

color(20); // "#9a3439"
color(50); // "#7b5167"
```
### d3.scaleLinear([domain[,range]])
创建一个 default 的 linear scale
### scale.domain([inputRange])
设置 input range, 如果不带参数，则返回已设置的 input range. input range 需要是 number
### scale.range([outputRange])
设置 output range, 如果不带参数，则返回已设置的 output range. output range 可以是任意类型的数组
### scale.clamp(clamp)
限制是否可以超出 domain 和 range 的界限
### scale.interpolate(interpolate)
设置 range 的插值工厂函数
### scale.ticks([count])
根据 domain 和 count, 返回一个数组，该数组元素是 human readable tick value. 数组大小可能是 count, 可能不是。
### scale.tickFormat([count[,format]])
返回 number format function which suitable for displaying a tick value.

可以通过 <code>scale.ticks(10).map(scale.tickFormat(10, "+%"))</code> 来查看 format 之后的 tick values

需要注意的是 ticks 和 tickFormat 并没有真正的改变 scale, 它们只是用来生成 tick value 数组和创建 format function
### scale.nice([count])
extend the domain so that it starts and ends on nice round values. 比如，domain 本身是 [0.201417..., 0.99667...], a nice domain might be [0.2, 1.0]

count 是 optional tick count, 指定 count 可以帮助更好的计算出新的 domain extent

## Ordinal Scale <a name="ordinal-scale"></a>
Ordinal scale 拥有离散的 domain  和离散的 range. 它更类似于一个 map, key 是任意的， value 也是任意的
```js
let lifeSpan = d3.scaleOrdinal()
  .domain(["cat", "rabbit", "dog"])
  .range([16, 2, 13])

lifeSpan("cat")//16
lifeSpan("dog")//13

//有的情况，我们不知道 domain, 只知道 range
let colors = d3.scaleOrdinal().range(['red', 'blue', 'yellow'])
//shorthand
colors = d3.scaleOrdinal(['red', 'blue', 'yellow'])
//如果传入的参数不在 domain 里，那么 scale 会把该参数加入到 domain 里，然后给它按顺序分配一个 range 里的 value
colors(1)//red, 
colors("2")//blue
colors(1)//red
colors(3)//yellow
colors(4)//red
```
### d3.scaleOrdinal([[domain,]range])
创建一个 ordinal scale with specified domain and range. if domain is not specified, its empty array by default. range by default is *undefined*

### ordinal(value)
传入 domain 数组里的 value, 返回对应的 range 里的value. 如果 value 不在 domain 里，则默认会将该 value 加入到 domain, 并且分配一个 range 里的 value
### ordinal.domain([domain])
设置 domain, domain 里的数据和 range 里的数据是一一对应的。如果domain 多于 range, 则会循环
### ordinal.range([range])
设置 range
### ordinal.unknown([value])
设置当 input 是 unknown 的时候的返回值， by default, 是将 unknown 的 input 加入到 domain, 如果设置了 unknown 值，则会返回该值，而不会添加到 domain

## Time Scale <a name="time-scale"></a>
Time scale 用来处理 domain 是 时间 instead of number 的 case
```js
var x = d3.scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
    .range([0, 960]);

x(new Date(2000, 0, 1,  5)); // 200
x(new Date(2000, 0, 1, 16)); // 640
x.invert(200); // Sat Jan 01 2000 05:00:00 GMT-0800 (PST)
x.invert(640); // Sat Jan 01 2000 16:00:00 GMT-0800 (PST)

//设置 tick
x.ticks(10);
// [Sat Jan 01 2000 00:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 03:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 06:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 09:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 12:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 15:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 18:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 21:00:00 GMT-0800 (PST),
//  Sun Jan 02 2000 00:00:00 GMT-0800 (PST)]

//同样的，我们还能通过设置 interval 来设置 ticks
var x = d3.scaleTime()
    .domain([new Date(2000, 0, 1, 0), new Date(2000, 0, 1, 2)]);

x.ticks(d3.timeMinute.every(15));
// [Sat Jan 01 2000 00:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 00:15:00 GMT-0800 (PST),
//  Sat Jan 01 2000 00:30:00 GMT-0800 (PST),
//  Sat Jan 01 2000 00:45:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:15:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:30:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:45:00 GMT-0800 (PST),
//  Sat Jan 01 2000 02:00:00 GMT-0800 (PST)]
```
time scale 拥有和 linear scale 基本相同的 api, 它的 format 会更丰富一些
### time.ticks([count])
### time.ticks([interval])
### time.tickFormat([count][,specifier])
### time.tickFormat([interval][,specifier])
count or interval 只是一个 hint, 最后的结果可能更少或者更多，取决于 domain

time scale 有以下 形式的 format
* %Y - for year boundary, such as 2011
* %B - for month boundary, such as February
* %b %d - for week boundary, such as Feb 06
* %a %d - for day boundary, such as Mon 07
* %I %p - for hour boundary, such as 01 AM
* %I:%M - for minute boundary, such as 01:23
* :%S - for second boundary, such as :45
* .%L - milliseconds for all other time, such as .012
### time.nice([count])
### time.nice([interval])
### time.scaleUtc
和 scaleTime 基本相同，只是返回 Universal time other than local time

## Band Scale <a name="band-scale"></a>
Band scale 和 ordinal scale 很像，只是 output range 是连续的并且 numeric. scale 会根据 domain size 将 range 平均分配为多个 band.

该 scale 一般用在 bar chart
```js
four = d3
  .scaleBand()
  .domain(["one", "two", "three", "four"])
  .range([0, 100])

four("one")//0, return the start of the band
four("two")//25
four("three")//50
four("four")//75

four.bandwidth()//25, return the band width, and all bands have same bandwidth by band scale definition

four.step()//25, step represent the interval between the start of a band and the start of the next band

//we can adjust the size of the gap between each band, by setting band.paddingInner(fraction)
four.paddingInner(0.2)//the fraction is [0, 1], and its a fraction of the 'step'
//assume the band scale range = width, and has N elements, then (N - 1) * step + (1- faction) * step = width => step = width / (N - fraction)
four.step()//26.315
four.bandwidth()//21.053

//we can still adjust the padding outside
four.paddingInner(0)//when padding inner equals to 0, then bandwidth = step
    .paddingOuter(0.1)//fraction * step * 2 + N * step = width => step = width / (N + 2 * fraction)

four.step() == four.bandwidth()//23.809, 100/ (4 + 0.2)

//sometimes, we want to config the distribution of outer padding, for example, to shift the bands to one side
four.align(0.5)//the fraction indicate how outer padding is distributed in the range, 0.5 means outer padding should be equally distributed before the first band and after the last band
four.align(0.2)//means the left outer padding only occupy 20% outer padding

//band rounding
//sometimes, the range can not be divided evenly, then we can round the band scale to make the results as integer value
//this will usually leave some unused space, that must be allocated to the left and right outer padding, even if those have been set to 0
testround = d3.scaleBand()
  .domain([1, 2, 3, 4, 5, 6])
  .range([0, 100])
  .round(true)

testround.bandwith()//16
testround(1)//2
```
