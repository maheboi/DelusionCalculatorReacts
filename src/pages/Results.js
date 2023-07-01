import "../styles/Calculator.css";
import "../styles/customAnimations.css";
import { TypeAnimation } from "react-type-animation";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Card, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "animate.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import Design from "../styles/Design.js";
import { useLocation } from "react-router-dom";
import emptyCatBagImage from "../styles/empty_catbag-removebg-preview.png";
import catBagImage from "../styles/catbag-removebg-preview.png";

Amplify.configure(awsExports);

// Use the probability value as needed in the Results page componen

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const probability = queryParams.get("probability");
  const finalProbability = parseFloat(probability).toFixed(3) * 100;
  const defaultAgeMin = 18;
  const defaultAgeMax = 85;
  const ageMin = queryParams.get("ageMin");
  const ageMax = queryParams.get("ageMax");
  const minAge = ageMin && !isNaN(ageMin) ? parseInt(ageMin, 10) : defaultAgeMin;
  const maxAge = ageMax && !isNaN(ageMax) ? parseInt(ageMax, 10) : defaultAgeMax;
  const navigate = useNavigate();

  console.log(probability);

  let bagscore;
  if (finalProbability < 1) {
    bagscore = 5;
  } else if (finalProbability >= 1 && finalProbability < 3) {
    bagscore = 4;
  } else if (finalProbability >= 3 && finalProbability < 6) {
    bagscore = 3;
  } else if (finalProbability >= 6 && finalProbability < 10) {
    bagscore = 2;
  } else if (finalProbability >= 10 && finalProbability < 15) {
    bagscore = 1;
  } else {
    bagscore = 0;
  }

  let message;

  if (bagscore === 1) {
    message = "You might be TOO easy.";
  } else if (bagscore === 2) {
    message = "Damn... why aren't you married?";
  } else if (bagscore === 3) {
    message = "You're kinda reasonable...";
  } else if (bagscore === 4) {
    message = "Lmao? Invest in Chewy.";
  } else if (bagscore === 5) {
    message = "You got the whole chat laughing right now... 😂";
  } else {
    message = "based."; // Set a default message if bagscore is outside the range 1-5
  }

  // Within your component
  let img1, img2, img3, img4, img5;

  if (bagscore === 0) {
    img1 = emptyCatBagImage;
    img2 = emptyCatBagImage;
    img3 = emptyCatBagImage;
    img4 = emptyCatBagImage;
    img5 = emptyCatBagImage;
  } else if (bagscore === 1) {
    img1 = catBagImage;
    img2 = emptyCatBagImage;
    img3 = emptyCatBagImage;
    img4 = emptyCatBagImage;
    img5 = emptyCatBagImage;
  } else if (bagscore === 2) {
    img1 = catBagImage;
    img2 = catBagImage;
    img3 = emptyCatBagImage;
    img4 = emptyCatBagImage;
    img5 = emptyCatBagImage;
  } else if (bagscore === 3) {
    img1 = catBagImage;
    img2 = catBagImage;
    img3 = catBagImage;
    img4 = emptyCatBagImage;
    img5 = emptyCatBagImage;
  } else if (bagscore === 4) {
    img1 = catBagImage;
    img2 = catBagImage;
    img3 = catBagImage;
    img4 = catBagImage;
    img5 = emptyCatBagImage;
  } else if (bagscore === 5) {
    img1 = catBagImage;
    img2 = catBagImage;
    img3 = catBagImage;
    img4 = catBagImage;
    img5 = catBagImage;
  } else {
    // Handle the case when bagscore is outside the range 0-5
    // Set default values or handle the error condition
  }

  const handleReset = () => {
    navigate("/calculator");
  }

  return (
    <div className="Calculator">
      <Design className="Design" />
      <header className="Calculator-header">
        <p style={{ textAlign: "center" }}>
          <code style={{ textAlign: "center", color: "black", fontWeight: "bold", textShadow: "0px 0px 4px white, 0px 0px 6px white, 0px 0px 8px white" }}>Results</code>
        </p>
      </header>
      <Card
        className="Box-trim animate__animated animate__fadeIn"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1000px",
          height: "500px",
          borderRadius: "16px",
          backgroundColor: "rgba(48, 48, 48, 0.25)",
          boxShadow: "0px 0px 16px rgba(255, 105, 180, 1)",
        }}>
          <Card
            className="Card-input animate__animated animate__fadeInUp"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "8px",
              width: "900px",
              height: "450px",
            }}>
            <div>
              <p>
                <TypeAnimation
                  sequence={[
                    6000,
                    `${finalProbability}%`
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ fontWeight: "bold", fontSize: "50px", color: "red" }}
                />
              </p>
              <p style={{ color: "black" }}>of <span style={{ fontWeight: "bold" }}>Men</span> between {minAge} to {maxAge} meet your requirements</p>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={img1}
                  className="Card-input animate__animated animate__fadeInUp animate__delay-1s"
                  alt="catBag1"
                  style={{ marginTop: "20px", width: "10%", height: "10%" }}
                />
                <img
                  src={img2}
                  className="Card-input animate__animated animate__fadeInUp animate__delay-2s"
                  alt="catBag1"
                  style={{ marginTop: "20px", width: "10%", height: "10%" }}
                />
                <img
                  src={img3}
                  className="Card-input animate__animated animate__fadeInUp animate__delay-3s"
                  alt="catBag1"
                  style={{ marginTop: "20px", width: "10%", height: "10%" }}
                />
                <img
                  src={img4}
                  className="Card-input animate__animated animate__fadeInUp animate__delay-4s"
                  alt="catBag1"
                  style={{ marginTop: "20px", width: "10%", height: "10%" }}
                />
                <img
                  src={img5}
                  className="Card-input animate__animated animate__fadeInUp animate__delay-5s"
                  alt="catBag1"
                  style={{ marginTop: "20px", width: "10%", height: "10%" }}
                />
              </div>
              <p style={{ color: "black", fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>
                <TypeAnimation
                  sequence={[
                    6000,
                    message,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ color: "black", fontWeight: "bold", fontSize: "20px", textAlign: "center" }}
                  cursor={false}
                />
              </p>
            </div>
          </Card>
      </Card>
      <div style={{ marginTop: "20px" }}>
        <Button
          className="animate__animated animate__fadeIn animate__delay-5s"
          variation="destructive"
          loadingText="Loading..."
          style={{ backgroundColor: "#d40203" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Results;
