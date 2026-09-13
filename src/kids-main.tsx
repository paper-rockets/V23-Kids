import React from 'react';
import { createRoot } from 'react-dom/client';
import { KidsApp } from './components/kids/KidsApp';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<KidsApp />);
}
