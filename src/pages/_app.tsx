import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/apolloClient";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ShoppingCartProvider>
        <Component {...pageProps} />
      </ShoppingCartProvider>
    </ApolloProvider>
  );
}

export default MyApp;
