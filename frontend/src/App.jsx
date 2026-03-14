import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Pricelist from "./pages/Pricelist"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/pricelist"
        element={
          <ProtectedRoute>
            <Pricelist />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App