import React from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import { Provider } from 'react-redux';
import { store } from './redux';
import CellList from './components/CellList';

const App = () => {

  return (
    <Provider store={store}>
      <div >
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
