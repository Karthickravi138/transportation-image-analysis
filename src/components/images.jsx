import React from "react";

function UploadedImage({ imageUrl }) {
  return (
    <div className="navbar-image-container">
      <img src={imageUrl} alt="Uploaded" className="navbar-image" />
    </div>
  );
}

export default UploadedImage;
