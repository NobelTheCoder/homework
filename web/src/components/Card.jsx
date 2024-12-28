import React from "react";
import "./Card.css";

const Card = () => {
  const handleButtonClick = () => {
    alert("Hi");
  };

  return (
    <div className="card">
      {/* Subject */}
      <div className="subject">Math Subject</div>

      {/* Left column with date, status, and marks */}
      <div className="left-column">
        <div className="date">Due Date: Jan 8, 2025</div>
        <div className="status">Status: Submitted</div>
        <div className="marks">Mark: 89</div>
      </div>

      {/* Right column with published date and remaining days */}
      <div className="right-column">
        <div className="published">Published: Jan 5, 2025</div>
        <div className="remaining">Days remaining: 7</div>
      </div>

      {/* Hoverable button */}
      <button className="hover-button" onClick={handleButtonClick}>
        &gt;
      </button>
    </div>
  );
};

export default Card;
