import "./index.css";
import Navbar from "./components/pages/navbar";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Project from "./components/pages/project";
import Contact from "./components/pages/contact";
import ProgressBar from "./components/utils/ProgressBar";
import Footer from "./components/utils/footer";
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
        <Footer/>
        <Analytics />
      </div>
    </>
  );
}
export default App;
