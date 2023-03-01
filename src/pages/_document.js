import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <script src="https://cdn.socket.io/4.6.0/socket.io.min.js"></script>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
