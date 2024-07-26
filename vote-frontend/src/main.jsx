import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'; // Import Tailwind CSS
import './styles/custom.css'; // Import your custom CSS
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
