import React from "react";
import styled, { keyframes, css } from "styled-components";

// Import the image using require
const reviewImage = require("../assets/images/review.jpg");

function Reviews() {
  const row1 = [
    {
      image: reviewImage,
      name: "John Doe",
      text: "Over third given bring lights divide saying. Fowl, all creeping second saw creature isn't gathered likeness shall fruitful saying let.",
    },
    {
      image: reviewImage,
      name: "Rina Sen",
      text: "Tree the whales fifth for their whose. Deep From fruitful spirit creature morning, fowl greater said, it first creepeth after.",
    },
    {
      image: reviewImage,
      name: "Adam Smith",
      text: "Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
    },
    {
      image: reviewImage,
      name: "Sophie Turner",
      text: "Fruitful darkness greater form. Second give you'll spirit created multiply, made. Together divide from firmament shall.",
    },
  ];

  return (
    <AppContainer>
      <Wrapper>
        <Text>Customers Feedbacks</Text>
        <Note>Our customer values our websites and earning good with us</Note>
        <Marquee>
          <MarqueeGroup>
            {row1.map((el, index) => (
              <ReviewCard key={index}>
                <ProfileImage src={el.image} alt={el.name} />
                <ReviewName>{el.name}</ReviewName>
                <ReviewText>{el.text}</ReviewText>
              </ReviewCard>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el, index) => (
              <ReviewCard key={index + row1.length}>
                <ProfileImage src={el.image} alt={el.name} />
                <ReviewName>{el.name}</ReviewName>
                <ReviewText>{el.text}</ReviewText>
              </ReviewCard>
            ))}
          </MarqueeGroup>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default Reviews;

// Styled components
const AppContainer = styled.div`
  overflow-x: hidden; /* Prevent horizontal scroll */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #000000;
`;

const Wrapper = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Marquee = styled.div`
  display: flex;
  overflow: hidden;
  user-select: none;
  width: 100%; /* Ensure Marquee doesn't exceed viewport width */

  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
`;

const scrollX = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const MarqueeGroup = styled.div`
  display: flex;
  flex-shrink: 0;
  animation: ${scrollX} 30s linear infinite;
`;

const ReviewCard = styled.div`
  display: flex; /* Changed from inline-flex to flex */
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 300px;
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px 4px #fff8dc;
  text-align: center;
  width: auto;
  max-width: 280px; /* Adjusted max-width for better responsiveness */
  box-sizing: border-box; /* Include padding and border in width calculations */

  @media (max-width: 768px) {
    min-height: 250px;
    padding: 15px;
    margin: 8px;
    max-width: calc(100% - 40px); /* Ensure card doesn't exceed viewport */
  }
`;

const ProfileImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: rgb(58, 65, 74);
  margin: 10px 0 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ReviewText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: rgb(58, 65, 74);
  word-wrap: break-word;
  white-space: normal;
  max-width: 250px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
