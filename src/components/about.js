import Tech  from "./tech";
const About = () => {
    return ( 
        <>
          <div className="container mx-auto px-4 sm:px-20 pt-20 pb-28 my-10 h-auto border border-lightGrey">
            <p className="font-satoshi text-4xl sm:text-5xl">About</p>
                <div className="text-lightGrey font-figtree text-lg sm:text-2xl font-light space-y-4 my-10 sm:w-3/5">
                    <p>Hello there! I’m Rohan, a web dev.</p>
                    <p>I passionately combine good design, technology, and innovation in all my projects, which I like to accompany from the first idea to release. Currently, I'm focused on the development of responsive user interfaces with React and I'm interested in JavaScript, Web Technologies.</p>
                    <p>Here’s my current tech stack</p>
                </div>
                <div className="">
                    <div className="space-y-4 sm:space-y-8">
                           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                                <Tech name="React"/>
                                <Tech name="Tailwind"/>
                                <Tech name="Node"/>
                            </div> 
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                                <Tech name="MongoDB"/>
                                <Tech name="React"/>
                                <Tech name="React"/>
                            </div> 
                    </div>                    
                </div>
                
        </div>  
        </>
     );
}
 
export default About;