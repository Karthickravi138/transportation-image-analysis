import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style.css"; // Import your CSS file

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImageData, setProcessedImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear any previous errors

    if (!image) {
      setError("Please select an image to upload.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/process_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
      if (response.data.count > 0) {
        setProcessedImageData(response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred while processing the image.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear results when a new image is selected
    if (image) {
      setResult(null);
      setProcessedImageData(null);
    }
  }, [image]);

  return (
    <div className="container">
      <div className="card left-card">
        <div className="card-content">
          <h2>Upload Image</h2>

          {uploadedImage && (
            <div>
              <h2>Uploaded Image</h2>
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="uploaded-image"
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Process Image"}
            </button>
          </form>
        </div>
      </div>
      <div className="card right-card">
        <div className="card-content">
          {result && (
            <div>
              <h2>Results</h2>
              <p>Number of Vehicles: {result.count}</p>
              {processedImageData && (
                <div>
                  <h2>Processed Image</h2>
                  <img
                    src={`http://localhost:5000/${processedImageData.filename}`}
                    alt="Processed"
                    className="processed-image"
                  />
                </div>
              )}
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
