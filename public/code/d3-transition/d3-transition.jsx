const whiteblue = d3.interpolateRgb('#eee', 'steelblue')
const blueorange = d3.interpolateRgb('steelblue', 'orange')
const orangewhite = d3.interpolateRgb('orange', '#eee')
const count = 4000

const div = d3.select('#container')
    .selectAll('span')
    .data(d3.range(0, count))
    .join('span')
    .transition()
        //为了让不同的 span 的 transition 不同步，设置不同的 delay.
        //越靠后的 span delay 一般越高，加入 random 是为了加入随机性，让 span 之间有闪烁的效果
        .delay(d => d + Math.random() * count / 4)
        .on('start', function repeat() {
            //每一个 span 在经历自己的 delay 之后，start
            d3.active(this)
                    //by default, duration is 24ms, 在 24ms 内完成 white -> blue 的过渡
                    .styleTween('background-color', () => whiteblue)
                .transition()
                    .delay(1000)//在变成 blue 后，在当前状态停留 1s
                    .styleTween('background-color', () => blueorange)//然后在 24ms 内完成 blue -> orange
                .transition()
                    .delay(1000)//在变成 orange 后，停留 1s
                    .styleTween('background-color', () => orangewhite)//然后在 24ms 内完成 orange -> white
                .transition()
                    //在变成 white 后，停留 4s. 这是为了看起来头部在等待尾部完成 transition 才继续开始新一轮循环, 呈现流动的视觉效果
                    //不考虑随机性，比如去掉 Math.random, 每一个 span delay (d + count / 4), 所以第一个span delay 1s, 最后一个span delay 5s
                    //第一个 span 完成一整套 transition 需要 1 + 0.024 + 1 + 0.024 + 1, 约 3s, 而这个时候，最后一个 span 还没有开始自己的 transition
                    //最后一个 span 完成一整套 transition 需要约 7s. 所以在这里，每一个 span 都再次 delay count
                    //这里的 delay 当然也可以是其它任意值，只是为了视觉效果设置为 count
                    .delay(count)
                    .on('start', repeat)//进入循环
        })

