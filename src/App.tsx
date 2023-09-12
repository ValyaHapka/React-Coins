import { Provider } from 'react-redux';

import { store } from './redux/store';
import TablePage from './pages/TablePage/TablePage';

function App() {
  return (
    <Provider store={store}>
      <TablePage />
    </Provider>
  );
}

export default App;
