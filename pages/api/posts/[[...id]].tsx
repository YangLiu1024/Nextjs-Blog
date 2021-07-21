import { ServerResponse } from "http";

export default function handler(req, res) {
    const { id } = req.query;
    const comments = new Map()
    comments.set('sg-ssr', ['sg-ssr-comment1', 'sg-ssr-comment2'])

    if (!id || !comments.has(id[0]) || comments.get(id[0]).length <= id[1]) {
        res.json({data: []})
    } else {
        res.json({data: [comments.get(id[0])[id[1]]]})
    }
}