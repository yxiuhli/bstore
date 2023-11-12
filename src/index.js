import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { DataBaseProvider } from './context/DatabaseProvider';
import './index.css';


import Swal from 'sweetalert2';
const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: "true",
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <DataBaseProvider>
        <App />
      </DataBaseProvider>
    </AuthProvider>
  </BrowserRouter>
);

