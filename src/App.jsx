import { useState } from 'react'
import './App.css'
import Header from './modulos/Header'
import Footer from './modulos/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header />
        <main style={{ padding: "100px 20px 20px" }}>
          <h2>Bienvenido a Eat & Rest</h2>
          <p>Encuentra los mejores restaurantes y alojamientos en Murcia y Zaragoza.</p>
   
      </main>
      <Footer />
    </>
  )
}

export default App
