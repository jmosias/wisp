import React, { useState, useEffect } from "react";

const ImageWatermarker = ({ imageUrls, startCode }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const applyWatermark = async (url, code) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    await new Promise((resolve) => (img.onload = resolve));

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = "#202020";
    ctx.globalAlpha = 1;
    ctx.font = "60px Ovo";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lines = [`Code: ${code}`, "Mari", "Size of clothes"];
    let lineHeight = 60;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, lineHeight * (index + 1));
    });

    const dataUrl = canvas.toDataURL("image/jpeg", 1);
    return dataUrl;
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css?family=Ovo&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (imageUrls.length > 0) {
      applyWatermark(imageUrls[0], `${startCode}1`).then((dataUrl) => {
        setPreviewImage(dataUrl);
      });
    }
  }, [imageUrls, startCode]);

  const handleDownloadAll = () => {
    imageUrls.forEach((url, index) => {
      applyWatermark(url, `${startCode}${index + 1}`).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${startCode}${index + 1}.jpg`;
        link.click();
      });
    });
  };

  return (
    <div>
      {previewImage && <img src={previewImage} alt="Watermark Preview" />}
      <button onClick={handleDownloadAll}>Download All</button>
    </div>
  );
};

export default ImageWatermarker;
