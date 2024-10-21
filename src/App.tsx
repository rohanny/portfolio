import { Analytics } from "@vercel/analytics/react";
import React from "react";
import About from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Project from "./components/project";
import "./index.css";
import ProgressBar from "./utils/ProgressBar";
import Footer from "./utils/footer";

const App: React.FC = () => {
  return (
    <>
      <ProgressBar />
      <div className="bg-background text-white">
        <Navbar />
        <Home />
        <About />
        <Project />
        <Contact />
        <Footer />
        <Analytics />
      </div>
    </>
  );
};

export default App;
