import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script defer src="/Krpano_AOH_Web/tour.js"></script>
          {/* <script defer src="/Krpano_AOH_Web/initpano.js"></script> */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <svg width="0" height="0">
            <linearGradient id="lgrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{
                  stopColor: "rgba(246, 84, 56, 1)",
                  stopOpacity: 1,
                }}
              />
              {/* <stop
                offset="100%"
                style={{
                  stopColor: "rgba(255, 135, 108, 1)",
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: "rgba(255, 188, 108, 1)",
                  stopOpacity: 1,
                }}
              /> */}
            </linearGradient>
          </svg>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
