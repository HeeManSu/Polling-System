import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>

    <ReduxProvider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </ReduxProvider>
  </ChakraProvider>


)
