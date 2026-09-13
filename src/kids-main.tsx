import React from 'react';
import { createRoot } from 'react-dom/client';
import { KidsApp } from './components/kids/KidsApp';
import { registerPWA } from './registerServiceWorker';
import './index.css';

registerPWA();

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<KidsApp />);
}
