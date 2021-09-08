export const fetchStatic = (url: string, toJson = false) => {
    const api= `${process.env.HOST_PATH}${url}`
    console.log(api)
    return fetch(api)
        .then(r => {
            let data = toJson ? r.json() : r.text()
            if (r.ok) {
                return data
            } else {
                return ''
            }
        })
}