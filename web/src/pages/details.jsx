import React, { useState } from "react";
import "./details.css";
import NavBar from '../components/nav';

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
  );
}

const Detail = () => {
  const [variable, setVariable] = useState(2); // Control conditional rendering
  const mark = 89; // Example mark value

  // Determine the status text based on the variable
  const getStatusText = (variable) => {
    switch (variable) {
      case 0:
        return { text: "Submitted", className: "submitted" };
      case 1:
        return { text: "Not Submitted", className: "not-submitted" };
      case 2:
        return { text: "Pending", className: "pending" };
      default:
        return { text: "Unknown", className: "unknown" };
    }
  };

  const { text: statusText, className: statusClass } = getStatusText(variable);

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

        {/* Conditionally Render Feedback Section */}
        {variable === 0 && (
          <div className="feedback">
            <h3>Feedback</h3>
            <textarea
              readOnly
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur ligula at dui ultrices."
            />
          </div>
        )}

        {/* Status */}
        <div className={`status ${statusClass}`}>
          <strong>Status:</strong> {statusText}
        </div>

        {/* Conditional Rendering */}
        {(variable === 1 || variable === 2) && <Zapp />}
      </div>
    </>
  );
};

export default Detail;
