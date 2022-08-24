import React from "react";
import { Carousel } from "react-bootstrap";

function carouselComponent() {
  return (
    <div>
      <Carousel
        variant="dark"
        style={{
          marginTop: "1vh",
        }}
      >
        <Carousel.Item>
          <img
            className="d-block mx-auto "
            style={{ marginBottom: 140 }}
            src="https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660935299/R2S-8_1_22_badiyy.png"
            alt="First slide"
            height={400}
          />
          <Carousel.Caption className="bgC">
            <h3>Intense Streaming.</h3>
            <p>
              In customizable style with the Ai400 Starter Streaming Desktop
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto "
            style={{ marginBottom: 140 }}
            src="https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934931/6471870cv2d_wmoynh.jpg"
            alt="Second slide"
            height={400}
          />
          <Carousel.Caption className="bgC">
            <h3>Maximize FPS.</h3>
            <p>With the all New ABS Master Gaming PC in blazing red RGB</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto "
            style={{ marginBottom: 140 }}
            src="https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934718/PhoenixMain45-Edit-Edit_dlree6.jpg"
            alt="Third slide"
            height={400}
          />
          <Carousel.Caption className="bgC">
            <h3>RGB your thing?</h3>
            <p>
              It's ours too. Make the ABS Legend your next and last stylish
              setup upgrade
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default carouselComponent;
