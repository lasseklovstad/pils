import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {HashRouter} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <HashRouter>
          <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              audience={import.meta.env.VITE_AUTH0_AUDIENCE}
              redirectUri={window.location.origin}
          >
              <App />
          </Auth0Provider>
      </HashRouter>
  </React.StrictMode>
)
