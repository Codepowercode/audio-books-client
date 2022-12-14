import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux'
import './main.css'
import './i18n'

const root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="...is loading">
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
)
