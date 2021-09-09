# Selection Method
* d3.select, 选择第一个满足 selector 的元素
* d3.selectAll, 选择所有满足 selector 的元素
* selection.select, 对 selection 里每一个元素选择其第一个满足 selector 的子元素，如果不存在，则返回 null, 如果存在，且当前元素有绑定数据，则该数据会被传递给子元素
* selection.selectAll, 对 selection 里每一个元素选择其所有满足 selector 的子元素，返回的selection 是 grouped, 且元素数据不会被传递给选中的子元素

# Selection Type
对于 selection，我们可以通过 <code>selection.data(datums)</code> 方法为selection 中的 element 绑定数据。

datums 为数组, 和 selection中的 element 按顺序依次一一绑定. 当为 grouped selection 调用 data 方法时，该 data 数组会传递给 each group

data 方法会返回一个新的 selection， 该 selection 为 update selection, 即由 selection中和 data 元素成功绑定的 element 组成

当 datums 的size > selection.size(), 绑定的数据多于当前的selection node size, 可以通过 <code>enter()</code> 进入 enter selection.

通常，enter selection 后会 <code>append()</code> 元素， 注意，对于 enter selection, 这些 append 元素会按照顺序添加到 parent selection 的末尾
```js
d3.select('div')
    .selectAll('p')
    .data([1, 2, 3])
    .enter()
    .append('p')//新添加的 p 会一一添加到 div 末尾
        .text((d, i) => d + '' + i)
```
对于update selection, <code>append()</code> 会将元素作为当前 selection 元素的最后一个子元素添加

当datums size < selection.size(), 可以通过 <code>exit()</code> 进入 exit selection, 该 selection 通常后跟 <code>remove()</code> 来删除没有绑定数据的nodes

实际使用中，通常会需要三种 selection
```js
//update selection
let ps = d3.select('div')
    .selectAll('p')
    .data([1, 2, 3, 4, 5])
ps.text((d, i) => d + '' + i)//update text for update selection

//enter selection
ps.enter()
    .append('p')
        .text((d, i) => d + '' + i)//update text for enter selection
//exiting
ps.exit()
    .remove()
```
为了简化上面的写法，可以直接使用 <code>join()</code>
```js
d3.select('div')
    .selectAll('p')
    .data([1, 2, 3, 4, 5])
    .join('p')//相当于call enter, 然后 merge update and enter selection
        .text((d, i) => d + '' + i)
```
有的时候，也会需要将 parent selection的 datum 传递给 child selection, 即使使用的是 selection.selectAll
```js
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
d3.selectAll('p')
    .data(matrix)
    .selectAll('b')//因为是 selection.selectAll(), selection 的 datum 并不会自动传递给子 selection
    .data((d, i) => d)//这里的 d 会是 当前 b selection 的 parent selection, 即 p selection 的 datum
        .text((d, i) => d)
```
# Modify Selection
* text(value)
* attr('name', value)
* style('name', value)
* classed('name', value), the value is boolean expression, if true, add the class, if false, remove the class
* append(type)
* insert(type[,before]), insert element before specified selector
* remove()
* clone([deep]), if deep truthy, clone all descendant children nodes too

对于 value, 可以是静态常量，也可以是函数，如果是函数，传入该函数的参数一般为 (datum, index, nodes). 

datum 为当前元素绑定的数据，index 为其索引，nodes 为当前selection的所有元素的 node, 且函数中的 this 会绑定为当前元素的 node

# Control Flow
* selection.each(function), 为当前选择的每个元素，调用指定函数，传递当前 datum, index, this 绑定为当前元素的 node
* selection.call(function[, arguments]), 为当前selection的每个元素调用指定函数，该函数第一个参数为 元素 selection, 且可以传递任意其它参数
* selection.nodes(), 返回当前 selection 的所有 non-null 的element 的 node
* selection.node(), 返回当前 selection 的第一个non-null element 的 node