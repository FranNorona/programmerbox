import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProviderContext } from './components/contexts/authProvider/AuthProviderContext.jsx'; // Asegúrate de que el path sea correcto
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviderContext>
      <App />
    </AuthProviderContext>
  </StrictMode>,
);
