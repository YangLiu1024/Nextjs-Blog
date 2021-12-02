import React, {useState, useEffect} from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import dynamic from 'next/dynamic'
import 'react-tabs/style/react-tabs.css'
import Previewer from "./Previewer";
import useSWR from 'swr'

import {useDebounce} from "react-use";

//next.js try to pre-render each page at server side.
//but AceEditor depend on the 'window' object which only exist at browser side
//so when render this page on server side, node.js has no idea of 'window', then it will popup error
//to fix this issue, we need to load Editor component dynamically, then it will not be rendered at server side
const Editor = dynamic(
    () => import('./Editor'),
    {ssr: false}
)

function fetchText(url) {
    return fetch(url).then(r => {
        if (r.ok) {
            return r.text()
        } else {
            return ''
        }
    })
}
export const CodePen = (props) => {
    const {data: icode} = useSWR(props.code, fetchText)
    const {data: ihtml} = useSWR(props.html, fetchText)
    const {data: icss} = useSWR(props.css || null, fetchText)
    const {data: deps} = useSWR(props.deps || null, fetchText)

    const [code, setCode] = useState(icode)
    const [html, setHtml] = useState(ihtml)
    const [css, setCss] = useState(icss)

    useEffect(() => {
        setCode(icode)
        setHtml(ihtml)
        setCss(icss)
    }, [icode, ihtml, icss])

    const [debounceValue, setDebounceValue] = useState({code, css, html})
    const [_, cancel] = useDebounce(() => {
            setDebounceValue({
                code,
                html,
                css
            })
        },
        2000,
        [code, html, css])

    return (
        <div ref={props.innerRef} style={{width: '100%', height: 600,  padding: 0, display: 'flex', 'flexDirection': 'row', overflow: 'hidden'}}>
            <div style={{flex: '60%'}}>
                <Tabs style={{width: '100%', height: '100%'}} defaultIndex={1}>
                    <TabList>
                        <Tab>HTML</Tab>
                        <Tab>JavaScript</Tab>
                        <Tab>CSS</Tab>
                    </TabList>
                    <TabPanel>
                        <Editor mode="html" code={html} onCodeChange={setHtml}/>
                    </TabPanel>
                    <TabPanel>
                        <Editor mode="javascript" code={code} onCodeChange={setCode}/>
                    </TabPanel>
                    <TabPanel>
                        <Editor mode="css" code={css} onCodeChange={setCss}/>
                    </TabPanel>
                </Tabs>
            </div>
            <div style={{flex: '40%'}}>
                <Previewer code={debounceValue.code || ''}
                           html={debounceValue.html || ''}
                           css={debounceValue.css || ''}
                           dependencies={(deps && JSON.parse(deps)) || []}
                            type={props.type || 'javascript'}/>
            </div>
        </div>
    )

}