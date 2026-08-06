import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ImageLightboxProvider } from './components/ImageLightbox'
import App from './App.jsx'
import './index.css'
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ImageLightboxProvider>
          <App />
          <Analytics />
        </ImageLightboxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
