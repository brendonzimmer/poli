export function pictureToBase64(picture: File) {
  return new Promise<string | ArrayBuffer>((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(picture);

    reader.onloadend = () => {
      console.log("Finished Loading");
      res(reader.result);
    };
    reader.onerror = () => {
      rej("Could not convert picture to base64.");
    };
  });
}
