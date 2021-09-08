const Previewer = (props) => {
    const scripts = props.dependencies?.map(d => `<script src="${d}"></script>`).join('') || ''
    const type = props.type || 'babel'
    return (
        <iframe style={{width: '100%', height: '100%'}} srcDoc={`<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    ${scripts}
                    <style type="text/css">
                        ${props.css}
                    </style>
                    <title></title>
                </head>
                <body>
                    ${props.html}
                    <script type="javascript">
                        window.onerror = error => console.log(error)
                    </script>
                    <script type="text/${type}">
                        try {
                            ${props.code}
                        } catch (e) {
                          console.log(e.message)
                        }
                    </script>
                </body>
            </html>
        `}/>
    )
}

export default Previewer