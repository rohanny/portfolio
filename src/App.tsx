import { FileText, Home, Link, User } from "lucide-react"; // Importing relevant icons
import { useState } from "react";
import Sidebar from "./components/ui/sidebar";

const items = [
  { label: "Home", icon: <Home className="w-full h-full" /> },
  { label: "About Me", icon: <User className="w-full h-full" /> }, // Combined About and Me
  { label: "Projects", icon: <FileText className="w-full h-full" /> }, // Projects
  { label: "Blogs", icon: <User className="w-full h-full" /> }, // Blogs
  { label: "Links", icon: <Link className="w-full h-full" /> }, // Added Links
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`w-screen h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <Sidebar
        items={items}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

export default App;
