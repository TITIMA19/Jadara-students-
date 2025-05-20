
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginForm } from "./components/login-form"
import { Register } from "./pages/Register"
function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/register" element={<Register/>} />
       
      </Routes>
    </BrowserRouter>
    </>
 
  )
}

export default App
