import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
    title?: string
}

const Layout: React.SFC<Props> = ({ children, title = 'TV Shows' }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <header>
            <Link href='/'>
                <a>Home</a>
            </Link>{' | '}
            <Link href='/about-us'>
                <a>About</a>
            </Link>
        </header>
        <main>
            {children}
        </main>
    </div>
)

export default Layout