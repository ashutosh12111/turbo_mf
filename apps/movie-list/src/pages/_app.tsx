import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { AppThemeProvider } from "@repo/ui";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </AppCacheProvider>
  );
}
