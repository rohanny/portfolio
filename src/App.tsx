import Sidebar from "./components/ui/sidebar";

function App() {
  return (
    // <div className="w-screen h-screen bg-gradient-to-r from-gray-600 to-gray-800 relative">
    //   <div className="flex text-center flex-col font-satoshi flex-wrap text-gray-50 items-center justify-center h-screen relative z-10">
    //     <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-10 shadow-lg border border-white border-opacity-30 relative z-20">
    //       <p className="text-3xl tracking-wide mb-4">👋 Hey there, stalker!</p>
    //       <p className="text-2xl font-extralight">
    //         🚀 I'm working on an exciting new redesign for my portfolio.
    //       </p>
    //       <p className="text-lg mt-2">
    //         ✨ Stay tuned, amazing things are coming soon!
    //       </p>
    //       <p className="text-sm mt-4">🔧 Currently under construction 🛠️</p>
    //     </div>
    //   </div>
    // </div>

    <Sidebar />
  );
}

export default App;
