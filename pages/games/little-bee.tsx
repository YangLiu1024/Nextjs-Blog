import { useRef, useEffect } from "react";

export default function LittleBee() {
    let canRef = useRef(null)

    useEffect(() => {
        let canvas = canRef.current;
        const ctx = canvas.getContext('2d')
        let step = 10;
        let starty = 30;
        let startx = 100;
        let id = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawText(ctx, "hello canvas", 'green', startx, starty)
            starty += step
            if (starty > canvas.height) {
                starty = 0
            }
        }, 1000)
        return () => clearInterval(id)
    }, [])

    function drawText(ctx, text, color, x, y) {
        ctx.font = '10px serif'
        ctx.fillStyle = color;
        ctx.textAlign = 'left'
        ctx.fillText(text, x, y);
    }
    return <div>
        <canvas ref={canRef} style={{height:500}}></canvas>
    </div>
}