import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'

const LogsContainer = ({iframeRef}) => {
    const [logs, setLogs] = useState([])
    useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            Hook(
                iframeRef.current.contentWindow.console,
                log => setLogs(currentLogs => [...currentLogs, log]),
                false
            )
            console.log('hook on iframe')
        }
        return () => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
                console.log('unhook iframe window')
                Unhook(iframeRef.current.contentWindow.console)
            }
        }
    }, [iframeRef])
    return <Console logs={logs} variant="dark" />
}

export default LogsContainer