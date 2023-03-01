import { Html, Head, Main, NextScript  } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Script  src="https://cdn.socket.io/4.6.0/socket.io.min.js"></Script >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
