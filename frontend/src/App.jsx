import CreateUser from "./pages/CreateUser";
import LoginUser from "./pages/LoginUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginUser />} />
          <Route path="/" element={<LoginUser />} />
          <Route path="/register" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App