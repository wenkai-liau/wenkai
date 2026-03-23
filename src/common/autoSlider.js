// import "react-awesome-slider/dist/styles.css";
import "./slider-styles.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

// import imageOne from "../images/night_panorama.jpg";
// import imageTwo from "../images/craterLake.jpg";
// import imageThree from "../images/banff.jpg";
// import imageFour from "../images/marina.jpg";
// import imageFive from "../images/moraineLake.jpg";

import imageOne from "../images/chureitoPagoda.jpg";
import imageTwoA from "../images/kawaguchiko.jpg";
import imageTwoB from "../images/kawaguchiko2.jpg";
import imageTwoC from "../images/kawaguchiko3.jpg";
import toyosu from "../images/lalaport.jpg"
// import imageTwoD from "../images/kawaguchiko4.jpg";
// import imageThree from "../images/chuzenjiLake.jpg";
// import imageFour from "../images/sensojiTemple.jpg";
// import imageFive from "../images/shibuyaSky.jpg";
// import imageSix from "../images/tokyoStation.jpg";

const AutoSlider = ({ height, width }) => {
  const smallScreen = width < 720;

  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <AutoplaySlider
      bullets={false}
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={5000}
    >
      <div className="row">
        <img
          src={toyosu}
          // width={smallScreen ? width : 1100}
          max-width={"100%"}
          height={smallScreen ? 150 : 350}
        />
      </div>
      <div className="row">
        <img
          src={imageOne}
          // width={smallScreen ? width : 1100}
          max-width={"100%"}
          height={smallScreen ? 150 : 350}
        />
      </div>
      <div className="row">
        <img
          src={imageOne}
          // width={smallScreen ? width : 1100}
          max-width={"100%"}
          height={smallScreen ? 150 : 350}
        />
      </div>
      <div className="row">
        <img
          src={imageTwoA}
          // width={smallScreen ? width : 1100}
          max-width={"100%"}
          height={smallScreen ? 150 : 350}
        />
      </div>
      <div className="row">
        <img
          src={imageTwoB}
          // width={smallScreen ? width : 1100}
          max-width={"100%"}
          height={smallScreen ? 150 : 350}
        />
      </div>
      <div className="row">
        <img
          src={imageTwoC}
          // width={smallScreen ? width : 1100}
          max-width={"100%"}
          height={smallScreen ? 150 : 350}
        />
      </div>
    </AutoplaySlider>
  );
};
export default AutoSlider;
