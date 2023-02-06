/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react'
import {name as appName} from './app.json';
import { store } from './src/redux/store'
import { Provider } from 'react-redux';

AppRegistry.registerComponent(
  appName, () => App,
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>
//   document.getElementById('root')
// )