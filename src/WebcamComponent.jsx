// src/WebcamComponent.jsx
import React from "react";
import Webcam from "react-webcam";

const WebcamComponent = ({ videoRef }) => {
  return (
    <div>
      <Webcam
        ref={videoRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default WebcamComponent;
