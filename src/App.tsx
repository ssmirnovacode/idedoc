import React from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import { Provider } from 'react-redux';
import { store } from './redux';

const App = () => {

  return (
    <Provider store={store}>
      <div >
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
}

export default App;
