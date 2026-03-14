import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Pricelist from "./pages/Pricelist"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pricelist" element={<Pricelist />} />
    </Routes>
  )
}

export default App