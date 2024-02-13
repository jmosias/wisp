"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import mergeImages from "merge-images";
import imageCompression from "browser-image-compression";

export default function Home() {
  const [previewURLs, setPreviewURLs] = useState([]);
  const [mergePreview, setMergePreview] = useState("");

  const handleChange = async (e) => {
    setPreviewURLs(await compressImages(e.target.files));
  };

  const compressImages = async (imageFiles) => {
    console.log("IMAGEFILES", imageFiles);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 2048,
      useWebWorker: true,
    };

    const compressedImages = await Promise.all(
      Array.from(imageFiles).map(async (imageFile, index) => {
        console.log(
          `originalFile instanceof Blob: ${index}`,
          imageFile instanceof Blob
        );
        console.log(
          `originalFile size [Blob: ${index}] ${
            imageFile.size / 1024 / 1024
          } MB`
        );

        try {
          const compressedImage = await imageCompression(imageFile, options);
          console.log(
            `compressedImage instanceof Blob: ${index}`,
            compressedImage instanceof Blob
          );
          console.log(
            `compressedImage size [Blob: ${index}] ${
              compressedImage.size / 1024 / 1024
            } MB`
          );

          return URL.createObjectURL(compressedImage);
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );

    return compressedImages.filter((url) => url !== null);
  };

  const handleMerge = () => {
    const size = 2048;
    mergeImages(
      [
        { src: previewURLs[0], x: 0, y: 0 },
        { src: previewURLs[1], x: size / 2, y: 0 },
      ],
      { width: size, height: size }
    ).then((src) => setMergePreview(src));
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Wisp</h1>
        <h3>Upload images here</h3>
        <form id="uploadImages" encType="multipart/form-data">
          <input
            type="file"
            id="inputImages"
            multiple
            onChange={handleChange}
            name="fileUpload"
            accept=".png, .jpg"
          />
        </form>
      </div>
      <div className="input-images">
        {previewURLs.map((url) => (
          <Image key={url} src={url} alt="" width={150} height={200} />
        ))}
      </div>
      <button onClick={handleMerge}>MERGE</button>
      <div>
        {mergePreview && (
          <Image src={mergePreview} alt="" width={300} height={300}></Image>
        )}
      </div>
    </main>
  );
}
