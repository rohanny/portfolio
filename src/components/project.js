import Work from "./work";
import rect from '../assets/rect.png'
import git from '../assets/git.svg'
import live from '../assets/live.svg'

const Project = () => {
    return ( 
        <>
            <div className="container mx-auto px-4 sm:px-20 py-10 my-10 h-auto border border-lightGrey">
            <p className="font-satoshi text-4xl sm:text-5xl">Projects</p>
                
            <div className="mx-auto py-20 w-full sm:grid sm:grid-cols-8">
                <div className="col-span-2 py-10 px-4 sm:px-0"> 
                    <img src={rect} className="border border-white"/>
                </div>
                <div className="col-span-6 px-4 sm:px-10 sm:py-10 space-y-5">
                    <h2 className="font-poppins font-medium text-3xl">Fine Dine</h2>
                    <p className="font-figtree text-sm sm:text-xl font-thin text-lightGrey ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div className="flex py-4 space-x-6">
                            <img src={git} className="w-auto h-auto cursor-pointer"/>
                            <img src={live} className="w-auto h-auto cursor-pointer"/>
                        </div>
                </div>
            </div>          
        </div>  
        </>
     );
}
 
export default Project;