
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { Register } from "./pages/Register";
import Layout from "@/components/Layout";
function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/register" element={<Register/>} />
         <Route path="/dashboard" element={<Layout children={undefined}/>} />
      </Routes>
    </BrowserRouter>
    </>
 
  )
}

export default App
