# SVG Basic Elements
SVG(Scalable Vector Graphic) 可以绘制多种形状，比如 line, rectangle, circle, ellipse, path, etc
## Line
<code>line</code>具有属性*x1*, *y1*, *x2*, *y2*, (x1, y1)表示起点坐标, (x2, y2) 表示终点坐标

create a line, start at point (10, 10), end at (100, 100), through HTML
```html
<svg>
    <line x1="10" y1="10" x2="100" y2="100"></line>
</svg>
```
通过 d3, 
```js
d3.select('svg')
    .append('line')
        .attr('x1', 10)
        .attr('y1', 10)
        .attr('x2', 100)
        .attr('y2', 100)
```
## rect
矩形具有属性 *x*, *y*, *width*, *height*, (x, y) 表示矩形左上角点坐标，width 表示矩形宽度，height 表示矩形高度

## circle
<code>circle</code> 具有属性 *cx*, *cy*, *r*. cx 表示中心点 x 坐标，cy 表示中心点 y 坐标， r 表示圆的半径

## ellipse
<code>ellipse</code> 和 <code>circle</code> 类似，只是同时具备 *rx* 和 *ry* 表示 x, y 方向上的半径

## text
<code>text</code> 具有属性 *x*, *y*, *dx*, *dy* 等，(x, y) 表示该文本的start point 坐标， dx, dy 表示 x, y 方向上的偏移
```js
d3.select('svg')
    .append('text')
        .attr('x', 100)
        .attr('y', 100)
        .attr('dx', 10)
        .attr('dy', '.5em')
        .text('hello world')
```

## g
*g* 是 container 元素， 用来 group 其它 SVG 元素。 且 g 上的 transformation 会 apply 给 group 里所有子元素， g 的属性也会被子元素继承
## image
<code>image</code> 用来显示 jpeg/png/gif and other svg files, 它有 *x*, *y*, *width*, *height*, *href* 等属性。 (x, y) 是图像左上角坐标，width, height 是图像显示大小，required
## path
<code>path</code> 通过各种命令组合来绘制基础 shape. All basic shapes can be created with a path element. *path* 具有 属性 *d*, *d* 定义了怎样绘制该 shape
* M, move to, 移动到指定位置，但并不会画线，需要指定 x, y
* L, line to, 从当前位置画线到指定位置，需要指定 x, y
* H, horizontal line to, 从当前位置画水平线到指定 x
* V, vertical line to, 从当前位置画垂直线到指定 y
* C, curve to
* S, smooth curve to
* Q, quadratic bezier curve
* T, smooth quadratic bezier curve
* A, elliptical arc
* Z, close path, 从当前位置画线到起点

上述命令可以大写，可以小写，大写表示绝对定位，小写表示相对定位.

```js
d3.select('svg')
    .append('path')
        .attr('d', 'M 10 10 H 90 V 90 H 10 L 10 10')//equals to 'M 10 10 H 90 V 90 H 10 Z'

//equals to
d3.select('svg')
    .append('path')
        .attr('d', 'M 10 10 h 80 v 80 h -80 z')
```
### d3-path
d3 对 svg path 也有适配
```js
let path = d3.path()//创建一个 path 对象

path.moveTo(0, 0)
path.lineTo(10, 10)
path.arcTo(x1, y1, x2, y2, radius)
path.arc(x, y, radius, startAngle, endAngle)
path.rect(x, y, w, h)
path.closePath()

path.toString()//return the string representation of this path
```
## title
<code>title</code> 用来给 container element or graphic element 添加 tooltip
```html
<circle cx="10" cy="10" r="5">
    <title>I am a circle</title>
</circle>
```

# SVG viewport VS viewBox
SVG 元素具有 *x*, *y*, *width*, *height*, *preserveAspectRatio* 等属性。 x, y 用在内嵌 SVG 元素上，表示偏移。

width, height 表示该 SVG 元素的 viewport 大小。 

preserveAspectRatio 用来指定当 viewport 和 viewBox aspect ratio 不一致时的 align 策略

## viewport & viewBox
viewport 相当于视窗，viewBox 用来裁剪用户坐标系上的区域，最后映射到 viewport 坐标系上。

它们之间的关系，简单来说，首先，当我们在 SVG 画布上绘制一系列元素时，我们使用的是用户坐标系，即我们会为元素指定位置，比如
```html
<rect x="10" y="10" width="20" height="30"></rect>
```
该坐标系 x, y 轴都是无穷大的，意味着我们可以在该画布上绘制任意位置的元素。viewBox 用来在用户坐标系选取区域，minx, miny 是左上角坐标，
width, height 是选取区域的宽度和高度。 最后，将选取的区域映射到 viewport 上。 没有被裁剪到的区域，就不会映射到 viewport 上，最后 invisible。 

在做映射的时候，让我们先考虑viewport 和 viewBox aspect ratio 相同的情况，

比如 svg *width* = 300, *height* = 400, 然后 viewBox 的值为 “0 0 600 800”, 即我们要将 (0 0 600 800) 区域的图像映射到 (0 0 300 400)， 那么看起来，我们选取的区域就像是被缩小了一倍一样。
 
同样，如果viewBox 为 “0 0 150 200”， 那么我们要将 (0 0 150 200)区域的图像映射到 (0 0 300 400)， 那么看起来，我们选取的区域就像是被放大了一倍一样。

另外，minx,miny 也可以是任意值，当不为0时，最后的结果看起来就像是进行了平移。

可以得出，viewBox 的 minx, miny 属性控制平移，width,height 用来控制缩放。
## preserveAspectRatio
当 aspect ratio 相同的时候，可以看出选取的 viewBox 是整个完整的填充 viewport 的，但是当 aspect ratio 不同的时候，又该怎么处理呢？

这就要用到属性 preserveAspectRatio 了，这个属性的默认值是 "xMidYMid meet". *xMidYMid* 是一种 align 策略，还有其它的 “xMinYMin, xMaxYMax” 等等。

第二个值 *meet* 是指 viewBox 是否只需要进行最小程度的缩放，以满足某一个方向 fill 就行，而不用两个方向都 fill, 类似于 CSS 里的 ”background-size:contain“

它还有另一个选项 *slice*, 表示两个方向都要 fill, 如果某个方向有溢出，则裁剪掉溢出部分。类似于 CSS 里的 "background-size:cover"
 
 至于 align 策略，简单来说，比如 xMid, 即表示 viewBox x 方向的 mid 要和 viewport x 方向的 mid 重叠，即viewBox 的中心要和 viewport 的 中心线重合。
 
 xMin 则表示 viewBox 的最左边要和 viewport 的最左边对齐。 其它的策略类似。
 
 preserveAspectRatio 还可以为 *none*, 即表示不保留纵横比，总是将 viewBox 完整的映射到 viewport，即使会导致失真。
 
 需要注意的是，
 * 当既不指定 viewport, 也不指定 viewBox 时，svg 默认大小是 (300, 100), viewBox 与 viewport 保持一致
 * 当只指定 viewport 时，viewBox 与 viewport 保持一致
 * 当只指定 viewBox 时，viewport 默认使用 *width: 100%*, 纵横比和 viewBox 保持一致
 * 当既指定 viewport, 又指定 viewBox 时，按照上面所述的规则进行缩放和平移
 * 当svg 中元素宽度和高度使用百分比时，它是指 viewBox 宽度和高度的百分比
 
# SVG transform
SVG transformation 能够 translate/scale/rotate/skew element.

需要注意的是，transformation 总是建立一个新的坐标系，然后在该坐标系下绘制图形。

所以，实际上并没有真正的发生图形之间的 translate/scale/rotate/skew, 改变的是坐标系，图形只是在新的坐标系下进行绘制。

而且 transformation 是可以级联的，且前后顺序是有意义的
## translate(tx[,ty])
在当前坐标系下平移(tx, ty), 如果 ty 缺省，默认值为 0
## scale(sx[,sy])
在当前坐标系下对element 进行拉伸或者压缩，如果 sy 缺省，默认与 sx 相同
## skew
通过 <code>skewX(angle)</code>, 沿着 x axis skew

通过 <code>skewY(angle)</code>, 沿着 y axis skew.

angle 的单位默认为 degrees
## rotate(angle [cx, cy])
沿着当前坐标系下的 (cx, cy) 点旋转 angle, angle 单位是 degrees。 如果 (cx, cy) 缺省，则默认为当前坐标系下的 origin. 

在 SVG 中，cx,cy 必须是绝对坐标，这点和 CSS 有一定区别

# SVG Establishing New Viewport
## Nesting svg Elements
有的时候，我们需要将 *svg* 元素内嵌到另一个 *svg* 中
```html
<svg>
    <!-- some SVG content-->
    <svg>
        <!-- some inner SVG content-->
    </svg>
</svg>
```
内嵌的 svg 元素会创建一个新的 viewport 以及对应的用户坐标系。相比于 svg 作为container,我们当然也可以使用 g 元素。

但是 g 元素必须设置 transform 属性，而 svg 可以直接使用 x, y 属性，而且 svg 还接受 width, height 属性，而 g 不可以。

通过设置 width, height(创建新的 viewport), 我们可以限制 svg 里的内容必须 inside of the viewport bounds. 超出该 viewport 的内容都将被剪切。

如果不设置 x, y, 默认值会为 0, 如果不设置 width, height, 默认值会为 100% of parent svg width and height.

内嵌 svg 在我们想让 svg 里的不同部分拥有不同的 flexibility 时特别有用，因为如果没有内嵌，整个 svg content 都会随着外部容器大小的改变同步改变，但是如果有了内嵌 svg, 情况就可以不同

```html
<svg width="100%"  height="100%" style="background-color:steelblue">
  <svg viewBox="0 0 200 100"  preserveAspectRatio="xMidYMax meet">
	<rect width="100%" height="100%" fill="aliceblue"></rect>
    <circle cx="50%" cy="60%" r="30"/>
  </svg>
  <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMin meet">
	<rect width="100%" height="100%" fill="lightskyblue"></rect>
    <circle cx="50%" cy="40%" r="30"/>
  </svg>
</svg>
```
# References
[SVG Coordinate System and Transformation](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
