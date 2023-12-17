import { useRef } from "react";
import { uploadData } from "aws-amplify/storage";

const FileUpload = () => {
  const fileInputRef = useRef(null);

  const uploadDataInBrowser = async () => {
    if (fileInputRef.current?.files) {
      const file = fileInputRef.current.files[0];
      const filename = file.name;

      try {
        const result = await uploadData({
          key: `filePath/${filename}`,
          data: file,
          contentType: file.type,
          options: {
            accessLevel: "public",
          },
        });

        if (result) {
          console.log("File uploaded successfully:", result);
          // Handle successful upload here if needed
        } else {
          console.log("File upload failed: Undefined result");
        }
      } catch (error) {
        console.log("Error during upload:", error);
      }
    }
  };

  const handleUploadButtonClick = () => {
    uploadDataInBrowser();
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUploadButtonClick}>Upload</button>
    </div>
  );
};

export default FileUpload;
