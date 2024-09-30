import project1 from "../assets/images/Main.png";
import project2 from "../assets/images/article.jpg";
import project3 from "../assets/images/fineDine.png";
import project4 from "../assets/images/netflix.png";

import ProjectCard from "./projectCard";

const projects = [
  {
    title: "Fine Dine",
    imageSrc: project3,
    description: "Our team responded to the challenges posed by the pandemic by creating an Android app and website for contactless dining. I played a significant role in developing the website using jQuery, HTML, and Tailwind CSS. The website offers a user-friendly interface that minimizes human interaction while dining out, ensuring a safer and more convenient experience.",
    githubLink: "https://github.com/geek-lords/fine-dine-admin-frontend",
    liveLink: "https://abhiraj-kale.github.io/fine-dine-admin-frontend/public/webpages/homepage.html",
  },
  {
    title: "Cine Phile",
    imageSrc: project4,
    description: "Cinephile revolutionizes the streaming experience by seamlessly blending entertainment and social connection. With its sleek interface built with React and Tailwind CSS, Cinephile offers a diverse library of captivating movies and TV shows to cater to every cinephile's taste. Explore various genres and engage in lively discussions with fellow movie enthusiasts through our innovative chat feature, powered by Stream Chat.",
    githubLink: "https://github.com/rohannY/Cine-Phile",
  },
  {
    title: "Preeti Bhojan",
    imageSrc: project1,
    description: " Designed and developed a captivating landing page for a company's mobile application, aiming to boost user engagement and drive downloads. The visually appealing and user-friendly design of the landing page effectively showcases the app's features, benefits, and value proposition, enticing visitors to take action and download the application.",
    githubLink: "https://github.com/rohannY/PreetiBhojan",
    liveLink: "https://preetibhojan.co.in/",
  },
  {
    title: "Article Summarizer",
    imageSrc: project2,
    description: "Article Summzrizer is a web application developed using React, Tailwind CSS. It employs advanced natural language processing and machine learning algorithms to automatically generate concise and accurate summaries of articles. The application's responsive UI and intelligent summarization capabilities enable users to quickly grasp key points, enhancing productivity and saving time in information consumption.",
    githubLink: "https://github.com/rohannY/summarizer-ui",
  },
];

const Project = () => {
  return (
    <div className="mx-4 sm:mx-28" id="project">
      <div className="container mx-auto px-4 sm:px-20 py-10 my-10 h-auto border-l border-r border-borderColor">
        <p className="font-satoshi text-start text-3xl sm:text-4xl">Projects</p>

        {projects.map((project, index) => (
          <div key={index}>
            <ProjectCard project={project} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Project;
