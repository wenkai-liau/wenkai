import "./slider-styles.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import imageOne from "../images/chureitoPagoda.jpg";
import imageTwoA from "../images/kawaguchiko.jpg";
import imageTwoB from "../images/kawaguchiko2.jpg";
import imageTwoC from "../images/kawaguchiko3.jpg";
import imageTwoD from "../images/kawaguchiko4.jpg";
import imageThree from "../images/chuzenjiLake.jpg";
import imageFour from "../images/sensojiTemple.jpg";
import imageFive from "../images/shibuyaSky.jpg";
import imageSix from "../images/tokyoStation.jpg";

const AutoSlider = ({ height, width }) => {
  const smallScreen = width < 720;

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const sliderStyle = {
    width: "100%",
    height: smallScreen ? 220 : 420,
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <AutoplaySlider
        bullets={false}
        play={true}
        cancelOnInteraction={false}
        interval={5000}
        style={sliderStyle}
      >
        {[imageOne, imageTwoA, imageTwoB, imageTwoC, imageTwoD, imageThree, imageFour, imageFive, imageSix].map(
          (img, idx) => (
            <div key={idx} style={{ width: "100%", height: "100%" }}>
              <img src={img} alt="" style={imgStyle} />
            </div>
          )
        )}
      </AutoplaySlider>
      {/* Full dark overlay for text contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.45)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      {/* Bottom gradient overlay for smooth transition to content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to top, #0a0f1a 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default AutoSlider;
