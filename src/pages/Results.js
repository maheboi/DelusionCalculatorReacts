import "../styles/Calculator.css";
import "../styles/customAnimations.css";
import { TypeAnimation } from "react-type-animation";
import React from "react";
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
import "../styles/Results.css";

Amplify.configure(awsExports);

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const probability = queryParams.get("probability");
  let finalProbability;

  if ((probability * 100) % 1 > 0.00001) {
    finalProbability = (Math.ceil(probability * 100 * 10000) / 10000).toFixed(
      4
    );
  } else {
    finalProbability = (probability * 100).toFixed(4);
  }
  const defaultAgeMin = 18;
  const defaultAgeMax = 85;
  const ageMin = queryParams.get("ageMin");
  const ageMax = queryParams.get("ageMax");
  const minAge =
    ageMin && !isNaN(ageMin) ? parseInt(ageMin, 10) : defaultAgeMin;
  const maxAge =
    ageMax && !isNaN(ageMax) ? parseInt(ageMax, 10) : defaultAgeMax;
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
  };

  return (
    <div className="Calculator">
      <Design className="Design" />
      <header className="Calculator-header">
        <p className="results-title">
          <code className="results-title-text">Results</code>
        </p>
      </header>
      <Card className="container Card-container Box-trim animate__animated animate__fadeIn">
        <Card className="container Card-inner Card-input animate__animated animate__fadeInUp">
          <div>
            <p>
              <TypeAnimation
                sequence={[6000, `${finalProbability}%`]}
                wrapper="span"
                speed={50}
                className="probability-text"
              />
            </p>
            <p className="result-message">
              of <span className="men-bold">Men</span> between {minAge} to{" "}
              {maxAge} meet your requirements
            </p>
          </div>
          <div>
            <div className="image-row">
              <img
                src={img1}
                className="cat-bag-image Card-input animate__animated animate__fadeInUp animate__delay-1s"
                alt="catBag1"
              />
              <img
                src={img2}
                className="cat-bag-image Card-input animate__animated animate__fadeInUp animate__delay-2s"
                alt="catBag1"
              />
              <img
                src={img3}
                className="cat-bag-image Card-input animate__animated animate__fadeInUp animate__delay-3s"
                alt="catBag1"
              />
              <img
                src={img4}
                className="cat-bag-image Card-input animate__animated animate__fadeInUp animate__delay-4s"
                alt="catBag1"
              />
              <img
                src={img5}
                className="cat-bag-image Card-input animate__animated animate__fadeInUp animate__delay-5s"
                alt="catBag1"
              />
            </div>
            <p className="message">
              <TypeAnimation
                sequence={[6000, message]}
                wrapper="span"
                speed={50}
                className="message"
                cursor={false}
              />
            </p>
          </div>
        </Card>
      </Card>
      <div className="div-reset-button">
        <Button
          className="reset-button animate__animated animate__fadeIn animate__delay-5s"
          variation="destructive"
          loadingText="Loading..."
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Results;
