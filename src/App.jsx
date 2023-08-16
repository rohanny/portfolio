import "./index.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Project from "./components/project";
import Contact from "./components/contact";
import ProgressBar from "./utils/ProgressBar";
import Footer from "./utils/footer";
import { Analytics } from '@vercel/analytics/react';

function App() {
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
}

export default App;
