"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [preview_urls, set_preview_urls] = useState([]);

  const handleChange = (e) => {
    set_preview_urls([]);
    set_preview_urls((prev) =>
      prev.concat(
        Array.from(e.target.files ?? []).map((f) =>
          window.URL.createObjectURL(f)
        )
      )
    );
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
        {preview_urls.map((url) => (
          <Image key={url} src={url} alt="" width={150} height={200} />
        ))}
      </div>
    </main>
  );
}
