import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/Auth/SignIn";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <Header />

      <Hero />

      <Footer />
    </div>
  );
}

export default App;
