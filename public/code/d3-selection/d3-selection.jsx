//d3.select, select the first element which match the selector
//d3.selectAll, select all elements that match the selector
//selection.select, select the first descendant child element that match the selector for each element in the selection. 
//    if any element in this selection could not find matched descendant child element, return null for this element in returned selection
//selection.selectAll, select all descendant child element that match the selector for each element in the selection.
//    the return selection is grouped
d3.selectAll('p')
    .data(['hello', 'world'])
        .text((d, i) => `I am number ${i} paragraph: ${d}`)

//对于 selection，我们可以通过 data 方法为selection 中的 element 绑定数据。data 为数组, 和 selection中的 element 按顺序依次一一绑定
//data 方法会返回一个新的 selection， 该 selection 默认为 update selection, 即由 selection中和 data 元素成功绑定的 element 组成