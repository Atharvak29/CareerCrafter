import { useEffect, useState } from "react";
import "./landingCover.css";
import ICOImage from "@/assets/favicon.png";


const handleButtonClick = () => {
  window.scrollTo({ top:window.innerHeight, behavior: "smooth" });
    <button className="down-indicator" onClick={handleButtonClick}>↓</button>
};

const LandingCover = ({ onFinish }: { onFinish: () => void }) => {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Auto slide after 2.5 seconds
    const timer = setTimeout(() => {
      setSlideUp(true);
      setTimeout(onFinish, 1200); // wait for animation to finish
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
  window.scrollTo({ top:window.innerHeight, behavior: "smooth" }); };

  return (
    <div className={`cover-container ${slideUp ? "slide-up" : ""}`}>
      <div className="content">
        <h1 className="title">Find your True Talent</h1>
        <h2 className="subtitle">With CareerCrafter</h2>
        <img src={ICOImage} className="icon" />
        <button className="down-indicator" onClick={handleButtonClick}>↓</button>
      </div>
    </div>
  );
};

export default LandingCover;
