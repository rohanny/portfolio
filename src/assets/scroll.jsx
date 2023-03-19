import { motion } from "framer-motion";

const Scroll = () => {
    return ( 
        <div className="h-10 w-10">
                        <motion.svg
                            style={{fill:"none"}}
                            viewBox="0 0 64 121"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.rect
                            x="1.33655"
                            y="1.98474"
                            width="61.3269"
                            height="117.694"
                            rx="30.6634"
                            stroke="#4e5559"
                            stroke-width="2"
                            fill="none"
                            />
                       <motion.rect
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, stroke: "#FFFFFF" }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        x="1.33655"
                        y="1.98474"
                        width="61.3269"
                        height="117.694"
                        rx="30.6634"
                        stroke="#4e5559"
                        strokeWidth={4}
                        strokeDasharray="0 1"
                        fill="none"
                        />
                        <motion.rect
                        initial={{ y: 20 }}
                        animate={{ y: 71 }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        x="24.2001"
                        width="15"
                        height="25.915"
                        rx="7.5"
                        fill="white"
                        />
                        </motion.svg>
             </div>
     );
}
 
export default Scroll;