import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"

// Application
import Router from "./routes";

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);