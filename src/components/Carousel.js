import React from 'react';
import { Image } from 'arwes';

const Carousel = () => (
    <> 
        <div className="slideshow-container">
            <div className="mySlides fade">
                <div className="numbertext">1 / 3</div>
                <Image resources="" style={{ width: '100%' }}></Image>
                <div className="text"></div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">2 / 3</div>
                <Image resources="" style={{ width: '100%' }}></Image>
                <div className="text"></div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">3 / 3</div>
                <Image resources="" style={{ width: '100%' }}></Image>
                <div className="text"></div>
            </div>
            <a href="/" className="prev" onClick="plusSlides(-1)">
                &#10094;
            </a>
            <a href="/" className="next" onClick="plusSlides(1)">
                &#10095;
            </a>
            <div style={{ textAlign: 'center' }}>
                <span className="dot" onClick="currentSlide(1)"></span>
                <span className="dot" onClick="currentSlide(2)"></span>
                <span className="dot" onClick="currentSlide(3)"></span>
            </div>
        </div>
    </>
);

export default Carousel;

// import React, { Component } from 'react';
// import Carousel from 'react-elastic-carousel';

// class Carousels extends Component {
//     state = {
//         items: [
//             { id: 1, title: 'item #1' },
//             { id: 2, title: 'item #2' },
//             { id: 3, title: 'item #3' },
//             { id: 4, title: 'item #4' },
//             { id: 5, title: 'item #5' }
//         ]
//     }

//     render() {
//         const { items } = this.state;
//         return (
//             <Carousel>
//                 {items.map(item => <div key={item.id}>{item.title}</div>)}
//             </Carousel>
//         )
//     }
// }
// export default Carousels;

