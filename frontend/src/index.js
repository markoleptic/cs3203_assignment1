import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"

// pass DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
// pass React element (App.js) to root.render()
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

