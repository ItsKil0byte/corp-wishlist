import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import eruda from 'eruda';
import WebApp from '@twa-dev/sdk'
import App from './App.jsx'
import './index.css'

// для dev-tools в mini app
// eruda.init();

WebApp.ready();
WebApp.expand();

if (WebApp.isVersionAtLeast('6.10')) {
    WebApp.setHeaderColor('#FFFFFF');
}
if (WebApp.isVersionAtLeast('7.7')) {
    WebApp.disableVerticalSwipes();
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
