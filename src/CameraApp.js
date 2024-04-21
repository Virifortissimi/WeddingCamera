import React, { useState, useRef, useEffect } from 'react';
// import { Image } from '@cloudinary/url-gen';
// import { CloudinaryContext, Transformation } from 'cloudinary-react';

const CameraApp = () => {
  // const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  // const screenWidth = window.screen.width;
  // const screenHeight = window.screen.height;

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("NOT EXIST");
    }
    navigator.mediaDevices.getUserMedia({ video: { width: 1980, height: 1080 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error('Error accessing camera:', err);
      });
  };

  useEffect(() => {
    startCamera();
  }, [videoRef]);

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  }

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0,0, photo.width, photo.height);
    setHasPhoto(false);
  };

  // const captureImage = () => {
  //   const video = videoRef.current;
  //   const canvas = photoRef.current;
  //   const context = canvas.getContext('2d');
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   // Convert the canvas image to a data URL
  //   const imageDataUrl = canvas.toDataURL('image/jpeg');

  //   // Upload the image to Cloudinary
  //   // uploadImageToCloudinary(imageDataUrl);
  // };

  // const uploadImageToCloudinary = async (imageDataUrl) => {
  //   try {
  //     const response = await fetch('YOUR_CLOUDINARY_UPLOAD_ENDPOINT', {
  //       method: 'POST',
  //       body: JSON.stringify({ image }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add any other necessary headers for authentication
  //       },
  //     });
  //     const data = await response.json();
  //     console.log('Uploaded to Cloudinary:', data);
  //   } catch (err) {
  //     console.error('Error uploading to Cloudinary:', err);
  //   }
  // };

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef} autoPlay muted style={{ maxWidth: '100%' }} />
        <button onClick={takePhoto}>SNAP</button>
        <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
          <canvas ref={photoRef}></canvas>
          <button onClick={closePhoto}>CLOSE!</button>
        </div>
      </div>
    </div>
  );
};

export default CameraApp;
