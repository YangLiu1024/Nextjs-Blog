import React, {useEffect, useRef, useState} from "react";
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import dynamic from "next/dynamic";

const LogsContainer = dynamic(() => import('./LogContainer'), {ssr: false})

const Previewer = (props) => {
    const scripts = props.dependencies?.map(d => `<script src="${d}"></script>`).join('') || ''
    const type = props.type || 'babel'
    const ref = useRef(null)
    return (
        <div >
            <Tabs style={{width: '100%', height: '100%'}} forceRenderTabPanel={true}>
                <TabList>
                    <Tab>Result</Tab>
                    <Tab>Console</Tab>
                </TabList>
                <TabPanel>
                    <iframe ref={ref} style={{width: '100%', height: 600}} srcDoc={`<!DOCTYPE html>
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
                </TabPanel>
                <TabPanel>
                    <div style={{ backgroundColor: "#242424" }}>
                        <LogsContainer iframeRef={ref}/>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Previewer