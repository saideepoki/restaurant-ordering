import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './components/Router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <NavBar/> */}
    <Router/>
  </React.StrictMode>,
)
