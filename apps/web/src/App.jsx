import { Footer } from '../../../packages/ui/src/components/Footer'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export {
  App
}
