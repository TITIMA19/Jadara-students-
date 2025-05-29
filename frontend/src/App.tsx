
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { Register } from "./pages/Register";
import Layout from "@/components/Layout";
import ShowCourses from "./pages/courses/ShowCourses";
import AddCourse from "./pages/courses/AddCourse";
import SchoolStatistics from "./pages/SchoolStatistics";
import Home from "./pages/home/Home";
function App() {

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />

    <Route path="/login" element={<LoginForm/>} />
    <Route path="/register" element={<Register/>} />
    
    <Route path="/*" element={
      <Layout>
        <Routes>
          SchoolStatistics
          <Route path="/home" element={<SchoolStatistics/>} />

          <Route path="/showCourses" element={<ShowCourses/>} />
          <Route path="/addCourse" element={<AddCourse/>} />


        </Routes>
      </Layout>
    } />
  </Routes>
</BrowserRouter>
    </>
 
  )
}

export default App
