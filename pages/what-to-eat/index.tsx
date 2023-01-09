import {useState} from "react";

export default function whatToEat() {
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    return (
        <div className={'w-full h-screen flex flex-col items-center justify-center'}>
            <button
                className={'border rounded border-gray-200 hover:bg-blue-200'}
                onClick={() => {
                    setLoading(true);
                    setReady(false);
                    setTimeout(() => {
                        setLoading(false);
                        setReady(true);
                    }, 1000)
                }}
            >
                Pick
            </button>
            {loading && <span>Picking</span>}
            {ready && <span>有啥吃啥</span>}
        </div>
    )
}