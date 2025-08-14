import { Route, BrowserRouter, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import Register from "./pages/register"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1 className="w-full h-screen font-bold flex items-center justify-center">NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
