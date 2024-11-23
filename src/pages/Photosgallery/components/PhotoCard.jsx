import React from "react";
import { BiDownload } from "react-icons/bi";
import "../styles/PhotoCard.css";

const PhotoCard = ({ image }) => {
  return (
    <div
      className='photocard-main-div'
      role='figure'
      aria-labelledby={image.id}>
      <div className='image-container'>

      <img
        src={image.urls.small}
        alt={
          image.alt_description ||
          "Image"
        }
        role='img'
        loading='lazy'
        className='img'
      />
      <div className='overlay-div'>
        <h1 className='overlay-heading'>
          {image.user.name}
        </h1>
        <p className='overlay-p'>
          {image.alt_description ||
            "No description available"}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick for the image
            window.open(
              image.urls.full,
              "_blank"
            ); // Open the full image in a new tab
          }}
          className='download-button'>
          <BiDownload size={30} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default PhotoCard;
