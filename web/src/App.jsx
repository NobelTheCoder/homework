import { useState } from 'react';
import axios from 'axios';
import './App.css';

import NavBar from './components/nav';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // For displaying upload status

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // Upload the file to the Flask backend
        const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        // Update the upload status based on the response
        if (response.data.status === "OK") {
          setUploadStatus("OK - File uploaded successfully!");
        } else {
          setUploadStatus(`BAD - ${response.data.message}`);
        }
      } catch (error) {
        setUploadStatus("BAD - Error occurred while uploading file.");
      }
    } else {
      setUploadStatus("BAD - Please select a file before submitting.");
    }
  };

  return (
    <>
    <NavBar />
      <h1 id="Title">HomeWork Upload</h1>
      <div className="main">
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button onClick={handleSubmit}>Submit</button>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        
        {/* Notification box to display upload status */}
        {uploadStatus && (
          <div className={`status-box ${uploadStatus.startsWith('OK') ? 'success' : 'error'}`}>
            {uploadStatus}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
