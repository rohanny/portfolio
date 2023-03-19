import Scroll from "../assets/scroll.jsx";
const Home = () => {
    return ( 
        <>
            <div className="container mx-auto my-5 font-figtree py-20 px-4 sm:px-20 h-auto border border-lightGrey">
                <div className="sm:space-y-5">
                    <p className="font-satoshi font-light text-3xl sm:text-4xl tracking-wide">Hi,I'm</p>
                    <p className="font-semibold sm:ml-10 text-5xl sm:text-9xl tracking-widest">ROHAN</p>
                    <p className="font-semibold sm:ml-56 text-5xl sm:text-9xl tracking-widest">YADAV</p>
                    <p className="text-2xl sm:text-7xl sm:py-10 font-light">UI Designer &<br/>Developer</p>
                </div>
                <div className="w-auto">
                    <div className="h-10 sm:h-20 absolute bottom-0 left-1/2 cursor-pointer">
                       <Scroll/>     
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Home;