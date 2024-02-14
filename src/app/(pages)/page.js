"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import mergeImages from "merge-images";
import imageCompression from "browser-image-compression";
import ImageWatermarker from "../(components)/ImageWatermarker";

const SIZE = 2048;

export default function Home() {
  const [compressedImages, setCompressedImages] = useState([]);
  const [mergedImage, setMergedImage] = useState("");

  const handleChange = async (e) => {
    setCompressedImages(await compressImages(e.target.files));
    setMergedImage("");
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
    mergeImages(
      [
        { src: compressedImages[0], x: 0, y: 0 },
        { src: compressedImages[1], x: SIZE / 2, y: 0 },
      ],
      { width: SIZE, height: SIZE }
    ).then((src) => setMergedImage(src));
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
        <h4>COMPRESSED IMAGES</h4>
        {compressedImages.map((image) => (
          <Image key={image} src={image} alt="" width={150} height={200} />
        ))}
      </div>
      <button onClick={handleMerge}>MERGE</button>
      <div>
        {mergedImage && (
          <Image src={mergedImage} alt="" width={200} height={200}></Image>
        )}
      </div>
      <div>
        <h4>Watermarked</h4>
        {compressImages.length > 0 && (
          <ImageWatermarker
            imageUrls={compressedImages}
            startCode={"A123456"}
          />
        )}
      </div>
    </main>
  );
}
