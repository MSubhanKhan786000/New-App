import React from "react";
import Image from '../assets/images/image.png'; 

function HeroSection() {
  return (
    <div
      style={{
        backgroundColor: "#141055",
        height: "auto",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: "0 5%",
      }}
    >
    
      <div
        style={{
          flex: 1,
          textAlign: "center",
          paddingRight: "40px",  
          marginRight:"100px"
        }}
      >
        <h1
          style={{
            fontSize: "4vw",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Wedding Dresses for Rent
        </h1>
        <p
          style={{
            fontSize: "1.5vw",
            color: "#d1d1d1",  
            marginBottom: "20px",
          }}
        >
          Elevate your special day with our exquisite wedding dress rentals, offering timeless elegance and unforgettable style for every bride.
        </p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "red", 
            color: "white",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          Browse Catalog
        </button>
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <img
          src={Image}
          alt="Wedding Dress"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
