import '../styles/global.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChangeStart = (url, { shallow }) => {
            console.log(`App URL is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`)
        }

        router.events.on('routeChangeStart', handleRouteChangeStart)
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [])
    return <Component {...pageProps} />
}