import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from '../src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { SidebarProvider } from '../src/contexts/SidebarContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store, persistor } from '../src/redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const clientSideEmotionCache = createEmotionCache();

function TokyoApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Tokyo Free White NextJS Javascript Admin Dashboard</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <SidebarProvider>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}

export default TokyoApp;
