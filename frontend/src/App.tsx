
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { Register } from "./pages/Register";
import Layout from "@/components/Layout";
import Tables from "./components/tableform";

function App() {

  return (
    <>
       <BrowserRouter>
       <Layout>
        <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/register" element={<Register/>} />
         <Route path="/events" element={<Tables />} />
      </Routes>
         </Layout>
    </BrowserRouter>
    </>
 
  )
}

export default App
