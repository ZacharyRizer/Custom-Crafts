import React from "react";
import { Frame, Paragraph, Image } from "arwes";

const Splash = () => (
  <>
  {/* Carousel */}
    <div className="slideshow-container">
      <div className="mySlides fade">
        <div className="numbertext">1 / 3</div>
        <Image resources="" style={{width:"100%"}}></Image>
        <div className="text"></div>
      </div>
      <div className="mySlides fade">
        <div className="numbertext">2 / 3</div>
        <Image resources="" style={{ width: "100%" }}></Image>
        <div className="text"></div>
      </div>
      <div className="mySlides fade">
        <div className="numbertext">3 / 3</div>
        <Image resources="" style={{ width: "100%" }}></Image>
        <div className="text"></div>
      </div>
      <a href="/" className="prev" onClick="plusSlides(-1)">&#10094;</a> 
      <a href="/" className="next" onClick="plusSlides(1)">&#10095;</a>
    <div style={{textAlign:"center"}}>
        <span className="dot" onClick="currentSlide(1)"></span>
        <span className="dot" onClick="currentSlide(2)"></span>
        <span className="dot" onClick="currentSlide(3)"></span>
    </div>
    </div>

    {/* Parallax */}
  <div>
    <div>
      {/* <Image className="homeIMG" animate resources='https://cdn.suwalls.com/wallpapers/fantasy/giant-spaceship-passing-the-planet-53912-1920x1200.jpg' /> */}
      <Paragraph className="plax">
        Welcome to Cruising Crafts! Check out our great Summer Sale! Prices half off all SpaceShips!
      </Paragraph>
    </div>
    <div className="parallax"></div>
    <div>
      {/* <Image className="homeIMG" animate resources='https://www.sciencealert.com/images/2019-02/processed/GettyImages-861460116_1_1024.jpg' /> */}
      <Paragraph className="plax">
        We've got Luxury spacecrafts, Combat Shuttles, and Performance Racers for those with a little fast and furious
        in their genes!
      </Paragraph>
    </div>
    <div className="parallaxTwo"></div>
    <div>
      <div>
        {/* <Image className="homeIMG" animate src='https://cdn.suwalls.com/wallpapers/fantasy/giant-spaceship-passing-the-planet-53912-1920x1200.jpg' /> */}
        <Paragraph className="plax">Welcome to Cruising Crafts! Check out our great Summer Sale! Prices half off all SpaceShips!</Paragraph>
      </div>
      <div className="parallax">
      </div>
      <div>
        {/* <Image className="homeIMG" animate src='https://www.sciencealert.com/images/2019-02/processed/GettyImages-861460116_1_1024.jpg' /> */}
        <Paragraph className="plax">We've got Luxury spacecrafts, Combat Shuttles, and Performance Racers for those with a little fast and furious in their genes!</Paragraph>
      </div>
      <div className="parallaxTwo">
      </div>
      <div>
        {/* <Image className="homeIMG" animate src='https://wallpaperaccess.com/full/500417.jpg' /> */}
        <Paragraph className="plax">The best deals in the Universe ranging from $599,999 to $999,999</Paragraph>
      </div>
      <div className="parallaxThree">
      </div> 
    </div>
  </>
    <div className="parallaxThree"></div>
  </div>
);

export default Splash;
