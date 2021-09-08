import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/theme-monokai"
import React from "react";

 const Editor = (props) => {
    const { mode, code, onCodeChange} = props;
    return <AceEditor
        mode={mode}
        theme={"monokai"}
        value={code}
        fontSize={18}
        style={{width: 'auto', height: '600px'}}
        onChange={onCodeChange}
        setOptions={{
            wrap: true
        }}/>
}

export default Editor