export default function handler(req, res) {
    const { id } = req.query;
    if (id) {
        res.end(`Post: ${id.join(',')}`)
    } else {
        res.end('Empty')
    }
}