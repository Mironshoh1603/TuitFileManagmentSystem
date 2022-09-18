import "./App.css";
// import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
import Contact from "./components/Contact";
import SidebarWithHeader from "./components/Sidebar";
import { setuser } from "./redux/features/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home } from "./pages/Home";

import React, { useEffect } from "react";
function App() {
   const dispatch = useDispatch();
   const user = JSON.parse(localStorage.getItem("profile"));
   useEffect(() => {
      // navigate("/register")

      dispatch(setuser(user));
   }, []);
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<SignIn />} />
               <Route path="/dashboard" element={<SidebarWithHeader />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
