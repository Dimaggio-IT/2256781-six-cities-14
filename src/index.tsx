import ReactDOM from 'react-dom/client';
import { getAsyncAuth, store } from './store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './components';
import { HistoryRouter } from './components/history-router/history-router';
import { browserHistory } from './browser-history';

store.dispatch(getAsyncAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </HelmetProvider>
);
