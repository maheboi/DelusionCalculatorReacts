import "../styles/Calculator.css";
import "../styles/customAnimations.css";
import * as React from "react";
import { createTodo } from "../graphql/mutations";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import { Card } from "@aws-amplify/ui-react";
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
  console.log(probability);
  const finalProbability = parseFloat(probability * 100).toFixed(4);
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

  return (
    <div className="Calculator">
      <Design className="Design" />
      <header className="Calculator-header">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}></div>
          <p style={{ textAlign: "center" }}></p>
        </div>
      </header>
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1000px",
          height: "500px",
          borderRadius: "16px",
          backgroundColor: "rgba(48, 48, 48, 0.25)",
          boxShadow: "0px 0px 16px rgba(255, 105, 180, 1)",
        }}
      >
        <div>
          <div
            className="cardTopRow"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Card
              className="Card-input animate__animated animate__fadeInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "900px",
                height: "450px",
              }}
            >
              <p style={{ color: "black" }}>Results</p>
              <p style={{ color: "black" }}>
                {finalProbability}% of Men meet your requirements
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
            </Card>
          </div>

          <div
            className="cardBottomRow"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "20px",
              marginTop: "5px",
            }}
          ></div>
        </div>
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={img1}
          className="Card-input animate__animated animate__fadeInUp animate__delay-1s"
          alt="catBag1"
          style={{ marginTop: "50px", width: "10%", height: "10%" }}
        />
        <img
          src={img2}
          className="Card-input animate__animated animate__fadeInUp animate__delay-2s"
          alt="catBag1"
          style={{ marginTop: "50px", width: "10%", height: "10%" }}
        />
        <img
          src={img3}
          className="Card-input animate__animated animate__fadeInUp animate__delay-3s"
          alt="catBag1"
          style={{ marginTop: "50px", width: "10%", height: "10%" }}
        />
        <img
          src={img4}
          className="Card-input animate__animated animate__fadeInUp animate__delay-4s"
          alt="catBag1"
          style={{ marginTop: "50px", width: "10%", height: "10%" }}
        />
        <img
          src={img5}
          className="Card-input animate__animated animate__fadeInUp animate__delay-5s"
          alt="catBag1"
          style={{ marginTop: "50px", width: "10%", height: "10%" }}
        />
      </div>
    </div>
  );
}

export default Results;
