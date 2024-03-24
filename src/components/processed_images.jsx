import React from "react";

function ProcessedImage({ imageUrl }) {
  return (
    <div className="navbar-image-container">
      <img src={imageUrl} alt="Processed" className="navbar-image" />
    </div>
  );
}

export default ProcessedImage;
