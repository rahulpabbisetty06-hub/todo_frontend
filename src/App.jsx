import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <h1 className="text-5xl font-bold text-pink-500">
        Hello World 123
      </h1>
      <h1>Welcome to react</h1>
    </div>
  )
}

export default App
