import React from "react";
import "./navigation.css";
import UploadedImage from "../images";
import ProcessedImage from "../processed_images";

function Navbar({ uploadedImageUrl, processedImageUrl }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">Transportation Image Analysis</div>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">Upload Image</a>
          </li>
          <li>
            <a href="#">Process Image</a>
          </li>
          {/* Display uploaded image if available */}
          {uploadedImageUrl && (
            <li>
              <UploadedImage imageUrl={uploadedImageUrl} />
            </li>
          )}
          {/* Display processed image if available */}
          {processedImageUrl && (
            <li>
              <ProcessedImage imageUrl={processedImageUrl} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
