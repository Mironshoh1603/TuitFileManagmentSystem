import "./App.css";
// import Sidebar from "./components/Sidebar";
import SignIn from "./components/Auth/SignIn";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<SignIn />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
