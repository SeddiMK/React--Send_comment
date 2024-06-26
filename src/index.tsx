import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { createRoot } from 'react-dom/client';
import * as ReactDOMClient from 'react-dom/client'
import './firebase'

import reportWebVitals from './reportWebVitals'

import App from './app/App'
import { RouterProvider } from 'react-router-dom'
import store from './store/index'

import { Provider } from 'react-redux'

const rootElem = document.getElementById('root')

//  {/* <RouterProvider router={router} /> */}

if (rootElem) {
	const root = ReactDOMClient.createRoot(rootElem)
	root.render(<App />)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
