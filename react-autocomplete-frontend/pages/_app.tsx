import type { AppProps /*, AppContext */ } from 'next/app';
import React from 'react';
import Head from 'next/head';
import './index.scss';
import { PAGE_TITLE } from '@constants/common';

function MyApp({ Component, pageProps }: AppProps) {
    return <div>
        <Head>
            <title>{PAGE_TITLE}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
    </div>;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;