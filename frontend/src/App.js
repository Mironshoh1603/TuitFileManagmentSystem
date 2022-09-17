import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "./components/slider";
import {Fanlar} from "./components/Fanlar"

function App() {
   return (
      <div className="App">
         <Slider />
         <Fanlar/>
      </div>
   );
}

export default App;
