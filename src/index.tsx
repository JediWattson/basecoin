import React from 'react'
import { createRoot, Root } from 'react-dom/client';
import App from './App';

const element: Element = document.getElementById('root')!
const root: Root = createRoot(element)
root.render(<App />)