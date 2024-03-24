// App.js
import React from "react";
import ImageUpload from "./components/ImageUpload";
import Navbar from "./components/NavigationBar/navigationBar";
//import Form from "./components/form/form";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ImageUpload />
    </div>
  );
}

export default App;
