import './index.css';
import Navbar from './components/nav';
import Home from './components/home';
import About from './components/about';
import Project from './components/project';
import Contact from './components/contact';

function App() {
  return (
    <div className="bg-background text-white">
      <Navbar/>
      <Home/>
      <About/>
      <Project/>
      <Contact/>
    </div>
  );
}
export default App;