import React from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Sliders from "../components/slider";
import {Fanlar} from "../components/Fanlar";
import Example from "../components/block";
import Footer from "../components/Footer";
export const Home = () => {
   return (
      <div>
         <Header />
         <Hero />
         <Sliders />
         <Fanlar />
         <Example />
         <Footer />
      </div>
   );
};
