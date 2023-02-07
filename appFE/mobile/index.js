/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react'

import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import { store } from './src/redux/store'

const ReduxApp = () => (
  <Provider store={store}>
      <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp,);

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>
//   document.getElementById('root')
// )