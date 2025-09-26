import { useState } from 'react'
import './App.css'
import Header from './modulos/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header/>
        <main style={{ padding: "20px" }}>
          <h2>Bienvenido a Eat & Rest</h2>
          <p>Encuentra los mejores restaurantes y alojamientos en Murcia y Zaragoza.</p>
      </main>
      </div>
    </>
  )
}

export default App
