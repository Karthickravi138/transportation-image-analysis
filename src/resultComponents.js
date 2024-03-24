// ResultComponent.js
import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

function ResultComponent({ imageUrl }) {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    async function runModel() {
      // Load the MobileNet model
      const model = await mobilenet.load();

      // Load the image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = async () => {
        // Make a prediction through the model
        const predictions = await model.classify(img);
        setPredictions(predictions);
      };
    }

    runModel();

    return () => {
      // Cleanup
      tf.disposeVariables();
    };
  }, [imageUrl]);

  return (
    <div>
      <h2>Image Recognition Results</h2>
      <div>
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
      </div>
      <div>
        <h3>Predictions:</h3>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              {prediction.className} -{" "}
              {Math.round(prediction.probability * 100)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResultComponent;
