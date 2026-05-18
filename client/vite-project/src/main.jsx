import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/rootReducer.js'
import { Analytics } from '@vercel/analytics/react';

const store = createStore(reducer);

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Provider store={store}>
            <App />
            <Analytics />
        </Provider>
    </BrowserRouter>


)
