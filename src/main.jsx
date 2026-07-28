import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ImageLightboxProvider } from './components/ImageLightbox'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ImageLightboxProvider>
          <App />
        </ImageLightboxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
