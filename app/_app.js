import React from 'react'
import '../styles/globals.css'
import Head from 'next/head'


export default function MyApp({ Component, pageProps }) {

    return (
      <>
      <Head>
        <title>Almost Done</title>
        <meta name="description" content="Almost Done, a chill space where analog snaps take center stage. Forget the digital noise; this is about pure, old-school vibes and capturing moments the retro way. Kick back and explore some genuine photo feels." />
      </Head>
    <Component {...pageProps} />

      </>
    )
  }