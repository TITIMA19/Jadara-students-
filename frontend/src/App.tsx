
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { Register } from "./pages/Register";
import Layout from "@/components/Layout";
import ShowCourses from "./pages/courses/ShowCourses";
import AddCourse from "./pages/courses/AddCourse";
import ShowUsers from"./pages/users/ShowUsers";
import ShowEvent from "./pages/event/ShowEvent"
function App() {

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginForm/>} />
    <Route path="/register" element={<Register/>} />
    
    <Route path="/*" element={
      <Layout>
        <Routes>
          <Route path="/showCourses" element={<ShowCourses/>} />
          <Route path="/addCourse" element={<AddCourse/>} />
          <Route path="/showEvent" element={ <ShowEvent /> } />
           <Route path="/showUsers" element={ <ShowUsers/>} />
          


        </Routes>
      </Layout>
    } />
  </Routes>
</BrowserRouter>
    </>
 
  )
}

export default App
