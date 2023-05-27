import project1 from "../../assets/images/Main.png";
import project2 from "../../assets/images/article.jpg";
import project3 from "../../assets/images/fineDine.png";
import project4 from "../../assets/images/netflix.png";
import git from "../../assets/svg/git.svg";
import live from "../../assets/svg/live.svg";
import { Reveal } from "../utils/Reveal";
import { motion } from "framer-motion";

const Project = () => {
  return (
    <div className="mx-4 sm:mx-28" id="project">
      <div className="container mx-auto px-4 sm:px-20 py-10 my-10 h-auto border-l border-r border-lightGrey">
        <p className="font-satoshi text-start text-4xl sm:text-5xl">Projects</p>

        <div className="mx-auto py-5  w-full sm:grid sm:grid-cols-8">
          <div className="col-span-2 py-10 px-4 sm:px-0">
            <motion.img
              alt="Fine Dine"
              src={project3}
              className="border border-white cursor-pointer"
              loading="lazy"
              whileHover={{ scale: 1.1, type: "spring" }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100,
              }}
            />
          </div>
          <div className="col-span-6 px-4 sm:px-10 sm:py-10 space-y-5">
            <Reveal>
              <h2 className="font-poppins font-medium text-2xl">Fine Dine</h2>
            </Reveal>
            <Reveal>
              <p className="font-figtree text-sm sm:text-lg font-thin text-lightGrey ">
                Our team responded to the challenges posed by the pandemic by
                creating an Android app and website for contactless dining. I
                played a significant role in developing the website using
                jQuery, HTML, and Tailwind CSS. The website offers a
                user-friendly interface that minimizes human interaction while
                dining out, ensuring a safer and more convenient experience.
              </p>
            </Reveal>
            <div className="flex space-x-6">
              <img src={git} alt="github" className="w-8 cursor-pointer" />
              <img src={live} alt="live" className="w-8 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mx-auto py-5 w-full sm:grid sm:grid-cols-8">
          <div className="col-span-2 py-10 px-4 sm:px-0">
            <motion.img
              alt="Article Summarizer"
              src={project2}
              loading="lazy"
              whileHover={{ scale: 1.1, type: "spring" }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100,
              }}
            />
          </div>
          <div className="col-span-6 px-4 sm:px-10 sm:py-10 space-y-5">
            <Reveal>
              <h2 className="font-poppins font-medium text-2xl">
                Article Summarizer
              </h2>
            </Reveal>
            <Reveal>
              <p className="font-figtree text-sm sm:text-lg font-thin text-lightGrey ">
                Article Summzrizer is a web application developed using React,
                Tailwind CSS. It employs advanced natural language processing
                and machine learning algorithms to automatically generate
                concise and accurate summaries of articles. The application's
                responsive UI and intelligent summarization capabilities enable
                users to quickly grasp key points, enhancing productivity and
                saving time in information consumption.
              </p>
            </Reveal>
            <div className="flex space-x-6">
              <img src={git} alt="github" className="w-8 cursor-pointer" />
              <img src={live} alt="live" className="w-8 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mx-auto py-5 w-full sm:grid sm:grid-cols-8">
          <div className="col-span-2 py-10 px-4 sm:px-0">
            <motion.img
              alt="Preeti Bhojan"
              src={project1}
              loading="lazy"
              whileHover={{ scale: 1.1, type: "spring" }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100,
              }}
            />
          </div>
          <div className="col-span-6 px-4 sm:px-10 sm:py-10 space-y-5">
            <Reveal>
              <h2 className="font-poppins font-medium text-2xl">
                Preeti Bhojan
              </h2>
            </Reveal>
            <Reveal>
              <p className="font-figtree text-sm sm:text-lg font-thin text-lightGrey ">
                Designed and developed a captivating landing page for a
                company's mobile application, aiming to boost user engagement
                and drive downloads. The visually appealing and user-friendly
                design of the landing page effectively showcases the app's
                features, benefits, and value proposition, enticing visitors to
                take action and download the application.
              </p>
            </Reveal>
            <div className="flex space-x-6">
              <img src={git} alt="github" className="w-8 cursor-pointer" />
              <img src={live} alt="live" className="w-8 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mx-auto py-5 w-full sm:grid sm:grid-cols-8">
          <div className="col-span-2 py-10 px-4 sm:px-0">
            <motion.img
              alt="Netfix"
              src={project4}
              loading="lazy"
              whileHover={{ scale: 1.1, type: "spring" }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100,
              }}
            />
          </div>
          <div className="col-span-6 px-4 sm:px-10 sm:py-10 space-y-5">
            <Reveal>
              <h2 className="font-poppins font-medium text-2xl">Cine Phile</h2>
            </Reveal>
            <Reveal>
              <p className="font-figtree text-sm sm:text-lg font-thin text-lightGrey ">
                Cinephile revolutionizes the streaming experience by seamlessly
                blending entertainment and social connection. With its sleek
                interface built with React and Tailwind CSS, Cinephile offers a
                diverse library of captivating movies and TV shows to cater to
                every cinephile's taste. Explore various genres and engage in
                lively discussions with fellow movie enthusiasts through our
                innovative chat feature, powered by Stream Chat.
              </p>
            </Reveal>
            <div className="flex space-x-6">
              <img src={git} alt="github" className="w-8 cursor-pointer" />
              <img src={live} alt="live" className="w-8 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
