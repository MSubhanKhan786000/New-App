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
        <h3
          style={{
            fontSize: "2.5vw",
            fontWeight: "bold",
            color: "white",
            textAlign:"center",
            marginLeft:"70px"
          }}
        >
          Wedding Dresses for Rent
        </h3>
        <p
          style={{
            fontSize: "1vw",
            color: "gray",  
            marginBottom: "20px",
            textAlign:"left",
            marginLeft:"120px",
            lineHeight:1.5
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
