import Fonts from "@/components/Atoms/Fonts";
import { persistor, store } from "@/states/store";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/Atoms/ErrorFallback";

const customTheme = extendTheme({
  colors: {
    brand: {
      green: "#2E4924",
      lightGreen: "#6BA43A",
      orange: "#F65438",
      pink: "#D593C5",
      cream: "#FFFEE5",
      cream200: "#E7E6D0",
      brown: "#AB7D55",
      crete: "#747E2F",
      jaffa: "#F08945",
      deepCerulean: "#007FA4",
      tropicalRainForest: "#007761",
      tallPoppy: "#B5242D",
      option: "#C0BE9A",
      chetwodeBlue: "#7FA2D7",
    },
  },
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Avenir Next", sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={customTheme}>
          <Fonts />
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error) => {
              console.error(error.message);
            }}
          >
            <Component {...pageProps} />
          </ErrorBoundary>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
