import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import eruda from 'eruda';
import WebApp from '@twa-dev/sdk'
import App from './App.jsx'
import './index.css'

// для dev-tools в mini app
eruda.init();

WebApp.ready();
WebApp.setHeaderColor('#eadce9');

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
)
