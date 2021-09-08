export const fetchStatic = (url: string, toJson = false) => {
    const api= `${process.env.HOST_PATH}${url}`
    console.log('api', api)
    return fetch(api)
        .then(r => {
            let data = toJson ? r.json() : r.text()
            console.log('ok', r.ok)
            if (r.ok) {
                return data
            } else {
                return ''
            }
        })
}