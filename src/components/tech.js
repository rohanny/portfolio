import react from '../assets/react.svg';
const Tech = (props) => {
    return ( 
        <>
            <div className="flex space-x-6 border-2 border-lightGrey p-3">
            <img src={react} className="h-8 pl-2"/>
            <p className="text-xl text-lightGrey font-light font-poppins pr-4">{props.name}</p>
            </div>
        </>
     );
}
 
export default Tech;