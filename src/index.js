import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
    (
        <HashRouter>
            {/**<Auth0Provider domain="dev-j59ro02a.us.auth0.com" clientId="HxLfDU0vvDJ9lwG58ypYZpuNz0aFWcYO" redirectUri={window.location.origin}> **/}
              <React.StrictMode>
                <App />
              </React.StrictMode>
        </HashRouter>
    ),
  document.getElementById('root')
);
