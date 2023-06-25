import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloProviderWrapper } from "../lib/apollo-wrapper";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProviderWrapper>
      <Component {...pageProps} />
    </ApolloProviderWrapper>
  );
}
