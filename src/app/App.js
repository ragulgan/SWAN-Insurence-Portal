import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import AuthInit from './AuthInit'
// import { AuthInit } from './modules/Auth'
import { Routes } from './Routes'
import { I18nProvider } from '../_metronic/i18n'
import '../_metronic/_assets/sass/style.scss'
import { LayoutSplashScreen, MaterialThemeProvider } from '../_metronic/layout'
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
const andRoid = /Android/i.test(navigator.userAgent)
if (iOS) {
  import('../_metronic/_assets/sass/ios.scss').then((iOS) => {
  })
}
if (andRoid) {
  import('../_metronic/_assets/sass/android.scss').then((andRoid) => {
  })
}

export default function App ({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      {/* <PersistGate  loading={<LayoutSplashScreen />}> */}
      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
      {/* fallback={<LayoutSplashScreen />} */}
      <React.Suspense fallback={<LayoutSplashScreen />}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <BrowserRouter basename={basename}>
          {/* This library only returns the location that has been active before the recent location change in the current window lifetime. */}
          <MaterialThemeProvider>
            {/* Provide `react-intl` context synchronized with Redux state.  */}
            <I18nProvider>
              {/* Render routes with provided `Layout`. */}
              <AuthInit>
                <Routes />
              </AuthInit>
            </I18nProvider>
          </MaterialThemeProvider>
        </BrowserRouter>
      </React.Suspense>
      {/* </PersistGate> */}
    </Provider>
  )
}
