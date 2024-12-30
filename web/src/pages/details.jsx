import React, { useState } from "react";
import "./details.css";
import NavBar from '../components/nav'
function Zapp() {
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
  )
}
const Detail = () => {
  const [variable, setVariable] = useState(1); // Control conditional rendering
  const mark = 89; // Example mark value

  // Determine the status text based on the variable
  const statusText = variable === 0 ? "Submitted" : "Not Submitted";

  // Function to calculate the speedometer color
  const getSpeedometerColor = (mark) => {
    if (mark <= 50) return "red";
    if (mark <= 70) return "yellow";
    return "green";
  };

  return (
    <>
      <NavBar name="Home" link="" />
      <div className="bd">
        <div className="letter">
          <h2>Letter Detail</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            efficitur ligula at dui ultrices, at tincidunt lectus pharetra.
          </p>
        </div>

        {/* Feedback Section */}
        <div className="feedback">
          <h3>Feedback</h3>
          <textarea
            readOnly
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur ligula at dui ultrices."
          />
        </div>

        {/* Status */}
        <div className="status">
          <strong>Status:</strong> {statusText}
        </div>

        {/* Speedometer */}

        {/* Conditional Rendering */}
        {variable === 1 && <Zapp />}
      </div>
    </>
  );
};

export default Detail;
