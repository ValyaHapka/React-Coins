import { Provider } from 'react-redux';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { store } from './redux/store';
import TablePage from './pages/TablePage/TablePage';
import CoinPage from './pages/CoinPage/CoinPage';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/:coinID" element={<CoinPage />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
