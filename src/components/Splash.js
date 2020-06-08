import React from "react";
import { Frame, Paragraph, Image } from "arwes";

const Splash = () => (
  <div>
    <div>
      {/* <Image className="homeIMG" animate resources='https://cdn.suwalls.com/wallpapers/fantasy/giant-spaceship-passing-the-planet-53912-1920x1200.jpg' /> */}
      <Paragraph className="plax">Welcome to Cruising Crafts! Check out our great Summer Sale! Prices half off all SpaceShips!</Paragraph>
    </div>
    <div className="parallax">
    </div>
    <div>
      {/* <Image className="homeIMG" animate resources='https://www.sciencealert.com/images/2019-02/processed/GettyImages-861460116_1_1024.jpg' /> */}
      <Paragraph className="plax">We've got Luxury spacecrafts, Combat Shuttles, and Performance Racers for those with a little fast and furious in their genes!</Paragraph>
    </div>
    <div className="parallaxTwo">
    </div>
    <div>
      {/* <Image className="homeIMG" animate resources='https://wallpaperaccess.com/full/500417.jpg' /> */}
      <Paragraph className="plax">The best deals in the Universe ranging from $599,999 to $999,999</Paragraph>
    </div>
    <div className="parallaxThree">
    </div> 
  </div>
);

export default Splash;
