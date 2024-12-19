// src/ObjectDetection.jsx
import React, { useRef, useState, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import WebcamComponent from "./WebcamComponent";

const ObjectDetection = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);

  // Kategori organik dan anorganik
  const categories = {
    organik: ["apple", "banana", "orange", "leaf"],
    anorganik: ["bottle", "bag", "cup", "can", "plastic","cell phone"],
  };

  // Muat model COCO-SSD
  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
      console.log("Model COCO-SSD berhasil dimuat!");
    });
  }, []);

  // Deteksi objek
  const detectObjects = async () => {
    if (model && videoRef.current) {
      const predictions = await model.detect(videoRef.current.video);
      console.log("Prediksi:", predictions);
      const categorizedObjects = predictions.map((prediction) => {
        const label = prediction.class;
        const category = categories.organik.includes(label)
          ? "Organik"
          : categories.anorganik.includes(label)
          ? "Anorganik"
          : "Tidak Dikategorikan";
        return { label, category };
      });
      setDetectedObjects(categorizedObjects);
    }
  };

  return (
    <div>
      <h1>Webcam Object Detection</h1>
      <WebcamComponent videoRef={videoRef} />
      <button onClick={detectObjects} style={{ marginTop: "20px" }}>
        Scan
      </button>
      <div style={{ marginTop: "20px" }}>
        {detectedObjects.length > 0 ? (
          detectedObjects.map((obj, index) => (
            <p key={index}>
              Objek: {obj.label}, Kategori: {obj.category}
            </p>
          ))
        ) : (
          <p>Belum ada objek terdeteksi.</p>
        )}
      </div>
    </div>
  );
};

export default ObjectDetection;
