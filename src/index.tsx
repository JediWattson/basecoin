import React from 'react'
import { createRoot } from 'react-dom/client';

function Hello() {
    console.log("loaded");
    return <h1>Hello World!</h1>;
}

const element = document.getElementById('root')
const root = createRoot(element)
root.render(<Hello />)
