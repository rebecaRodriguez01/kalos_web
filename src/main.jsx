import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/italiana/400.css";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/dm-sans";
import "./styles/index.css";
import App from './App.jsx'

import "@fontsource-variable/jost";
import "@fontsource/windsong";
import "@fontsource/mrs-saint-delafield";
import '@fontsource/allura';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
