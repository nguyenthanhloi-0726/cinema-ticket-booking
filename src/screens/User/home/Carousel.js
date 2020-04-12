import React from "react";
import Slider from "react-slick";
import HomeTool from "../../../components/User/HomeTool";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon style={{ fontSize: 45 }} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon style={{ fontSize: 45 }} />
    </div>
  );
}

export default function Carousel(props) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="pp-carousel">
      <Slider {...settings}>
        <div>
          <img src="./img/movie-0.jpg" alt="movie" />
          <div className="backgroundLinear"></div>
        </div>
        <div>
          <img src="./img/movie-1.jpg" alt="movie" />
          <div className="backgroundLinear"></div>
        </div>
        <div>
          <img src="./img/movie-2.jpg" alt="movie" />
          <div className="backgroundLinear"></div>
        </div>
        <div>
          <img src="./img/movie-3.jpg" alt="movie" />
          <div className="backgroundLinear"></div>
        </div>
      </Slider>
      <HomeTool history={props.history} />
    </div>
  );
}
