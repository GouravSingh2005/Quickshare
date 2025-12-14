import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ReactGA from 'react-ga4';

// Initialize GA4 with your Measurement ID
ReactGA.initialize('G-9H6QCHZDBN');

function Root() {
  // Track first pageview
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
