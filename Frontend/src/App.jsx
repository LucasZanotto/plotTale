import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const data = fetch("localhost:8000/api/books/1");
  const response = JSON.parse(data);
  console.log(response);

  return (
    <div>
      <h1>{response}</h1>
    </div>
  )
}

export default App
