import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter basename="frontend">
            <App />
        </BrowserRouter>
    </Provider>
)
