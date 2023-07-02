import logo from "../assets/FF Logo Transparent.png";
import catBag from "../assets/Bag.png";
import "../styles/Calculator.css";
import "../styles/customAnimations.css";
import React, { useState } from "react";
import { createTodo } from "../graphql/mutations";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import NHANES from "../assets/NHANES2020.csv";

import {
  Card,
  Button,
  TextField,
  CheckboxField,
  SliderField,
  SelectField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "animate.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import { Design } from "../styles/Design.js";

Amplify.configure(awsExports);

export const Calculator = () => {
  const [ageMin, setAgeMin] = useState();
  const [ageMax, setAgeMax] = useState();
  const [minimumHeight, setMinimumHeight] = useState("");
  const [race, setRace] = useState([]);
  const [minimumEducation, setMinimumEducation] = useState("");
  const [minimumIncome, setMinimumIncome] = useState();
  const [isMarried, setIsMarried] = useState(false);
  const [isObese, setIsObese] = useState(false);
  const navigate = useNavigate();

  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const handleAgeMinChange = (event) => {
    const value = event.target.value;
    setMinInput(value);
    setAgeMin(value);
  };

  const handleAgeMaxChange = (event) => {
    const value = event.target.value;
    setMaxInput(value);
    setAgeMax(value);
  };

  const handleMinBlur = () => {
    let value = parseInt(minInput, 10);
    if (isNaN(value) || value < 18) {
      value = 18;
      setMinInput("18");
    } else if (value > 85) {
      value = 85;
      setMinInput("85");
    }
    setAgeMin(value);
  };

  const handleMaxBlur = () => {
    let value = parseInt(maxInput, 10);
    if (isNaN(value) || value > 85) {
      value = 85;
      setMaxInput("85");
    } else if (value < 18) {
      value = 18;
      setMaxInput("18");
    }
    setAgeMax(value);
  };

  const handleHeightChange = (event) => {
    setMinimumHeight(event.target.value);
  };

  const handleRaceChange = (event) => {
    const value = event.target.name;
    if (race.includes(value)) {
      setRace(race.filter((race) => race !== value));
    } else {
      setRace([...race, value]);
    }
  };

  const handleEducationChange = (event) => {
    setMinimumEducation(event.target.value);
  };

  const handleIncomeChange = (value) => {
    const numericValue = Number(value);
    if (numericValue <= 2000000) {
      setMinimumIncome(numericValue);
    } else {
      setMinimumIncome(2000000);
    }
  };

  const handleMarriedChange = (event) => {
    setIsMarried(event.target.checked);
  };

  const handleObeseChange = (event) => {
    setIsObese(event.target.checked);
  };

  function convertHeightToCm(height) {
    const [feet, inches] = height.split("'");
    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    const cm = totalInches * 2.54;
    return cm;
  }

  const handleBuildMan = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      let heightBMIProbability;
      let num,
        den = 0;
      let BMI = 99999;

      if (isObese === true) {
        BMI = 30;
      }

      let selectedHeightInCm = 0;
      let racePass = [];

      if (minimumHeight === "") {
        selectedHeightInCm = 0;
      } else {
        selectedHeightInCm = convertHeightToCm(minimumHeight);
      }
      if (race.length === 0) {
        racePass = ["White", "Hispanic", "Other", "Asian", "Black"];
      } else {
        racePass = race;
      }

      const heightBMIProbabilityPromise = new Promise((resolve, reject) => {
        Papa.parse(NHANES, {
          download: true,
          header: true,
          delimiter: ",",
          complete: function (result) {
            const filteredData = result.data.filter(
              (row) =>
                racePass.includes(row.RIDRETH3) &&
                parseFloat(row.BMXHT) >= selectedHeightInCm &&
                row.BMXBMI < BMI
            );

            den = parseFloat(filteredData.length);

            const unfilteredCountForRace = result.data.filter(
              (row) =>
                racePass.includes(row.RIDRETH3) &&
                parseFloat(row.BMXHT) > 0 &&
                row.BMXBMI >= 0
            );

            num = parseFloat(unfilteredCountForRace.length);

            heightBMIProbability = den / num;
            resolve(heightBMIProbability);
          },
        });
      });

      let marriageValue = "";
      if (isMarried === false) {
        marriageValue = "1:7";
      }

      if (isMarried === true) {
        marriageValue = "4:7";
      }

      let raceValue = "";

      if (race.includes("White")) {
        raceValue += "1,";
      }

      if (race.includes("Black")) {
        raceValue += "2,";
      }

      if (race.includes("Asian")) {
        raceValue += "4,";
      }

      if (race.includes("Hispanic")) {
        raceValue += "18,21,15,24,12,9,14,";
      }

      if (race.includes("Other")) {
        raceValue += "26,8,23,25,11,10,17,5,19,7,16,3,22,";
      }

      let educationValue = "";

      switch (minimumEducation) {
        case "Highschool Diploma":
          educationValue = "31";
          break;
        case "Associate's Degree":
          educationValue = "42";
          break;
        case "Bachelor's Degree":
          educationValue = "43";
          break;
        case "Master's Degree":
          educationValue = "44";
          break;
        case "Doctorate's Degree":
          educationValue = "46";
          break;
        default:
          // Handle the case when the education value is not matched
          break;
      }

      // Wait for the heightBMIProbabilityPromise to complete
      heightBMIProbability = await heightBMIProbabilityPromise;
      let ageMinPass,
        ageMaxPass,
        minimumIncomePass = "";
      if (typeof ageMin === "undefined") {
        ageMinPass = "18:";
      } else {
        ageMinPass = ageMin + ":";
      }
      if (typeof ageMax === "undefined") {
        ageMaxPass = "85";
      } else {
        ageMaxPass = ageMax;
      }
      if (educationValue === "") {
        educationValue = "31:46";
      } else {
        educationValue = educationValue + ":46";
      }
      if (typeof minimumIncome === "undefined") {
        minimumIncomePass = "0:2000000";
      } else {
        minimumIncomePass = minimumIncome + ":2000000";
      }
      if (raceValue === "") {
        raceValue = "1:26";
      }
      //Grab the Census Calculations
      const url = `https://api.census.gov/data/2022/cps/asec/mar?tabulate=weight(MARSUPWT)&col+A_SEX&for=state:*&A_AGE=${ageMinPass}${ageMaxPass}&A_HGA=${educationValue}&AGI=${minimumIncomePass}&A_MARITL=${marriageValue}&PRDTRACE=${raceValue}%`;
      const response = await fetch(url);
      const data = await response.json();

      const url2 = `https://api.census.gov/data/2022/cps/asec/mar?tabulate=weight(MARSUPWT)&col+A_SEX&for=state:*&A_AGE=${ageMinPass}${ageMaxPass}&A_HGA=31:46&AGI=0:2000000&A_MARITL=1:7&PRDTRACE=1:26%`;
      const response2 = await fetch(url2);
      const data2 = await response2.json();

      const censusProbability = data[1][1] / data2[1][1];

      const probability = censusProbability * heightBMIProbability;
      const urlpass = `/Results?probability=${encodeURIComponent(
        probability.toString()
      )}&ageMin=${ageMin}&ageMax=${ageMax}`;
      navigate(urlpass);

      const input = {
        ageMin,
        ageMax,
        minimumHeight,
        race: race.join(", "),
        minimumEducation,
        minimumIncome,
        probability,
        isMarried,
        isObese,
      };

      await API.graphql({
        query: createTodo,
        variables: { input },
      });
    } catch (error) {}
  };

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} className="Calculator-logo" alt="logo" />
            <img
              src={catBag}
              className="Calculator-catBag"
              alt="catBag"
              style={{ marginTop: "50px" }}
            />
          </div>
          <p style={{ textAlign: "center" }}>
            <code
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                textShadow:
                  "0px 0px 4px white, 0px 0px 6px white, 0px 0px 8px white",
              }}
            >
              Welcome to the Delusion Calculator
            </code>
          </p>
        </div>
      </header>
      <Card
        className="Box-trim animate__animated animate__fadeIn mb-3"
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
              className="Card-input animate__animated animate__fadeInUp mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>Age</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  placeholder="Minimum Age"
                  label="Minimum"
                  labelHidden
                  errorMessage="There is an error"
                  style={{ borderRadius: "0" }}
                  variation="quiet"
                  value={ageMin}
                  onChange={handleAgeMinChange}
                  onBlur={handleMinBlur}
                />
                <TextField
                  placeholder="Maximum Age"
                  label="Maximum"
                  labelHidden
                  errorMessage="There is an error"
                  style={{ borderRadius: "0" }}
                  variation="quiet"
                  value={ageMax}
                  onChange={handleAgeMaxChange}
                  onBlur={handleMaxBlur}
                />
              </div>
            </Card>
            <Card
              className="animate__animated animate__fadeInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>Height</p>
              <SelectField
                placeholder="Minimum Height"
                label="Height"
                labelHidden
                width="100%"
                onChange={handleHeightChange}
                options={[
                  "6'6",
                  "6'5",
                  "6'4",
                  "6'3",
                  "6'2",
                  "6'1",
                  "6'0",
                  "5'11",
                  "5'10",
                  "5'9",
                  "5'8",
                  "5'7",
                  "5'6",
                  "5'5",
                  "5'4",
                  "5'3",
                  "5'2",
                  "5'1",
                  "5'0",
                ]}
              />
            </Card>
            <Card
              className="animate__animated animate__fadeInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>Race</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "-20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gridGap: "5px",
                  }}
                >
                  <CheckboxField
                    label="White"
                    name="White"
                    style={{ backgroundColor: "#3367ef" }}
                    checked={race.includes("White")}
                    onChange={handleRaceChange}
                  />
                  <CheckboxField
                    label="Black"
                    name="Black"
                    style={{ backgroundColor: "#3367ef" }}
                    checked={race.includes("Black")}
                    onChange={handleRaceChange}
                  />
                  <CheckboxField
                    label="Hispanic"
                    name="Hispanic"
                    style={{ backgroundColor: "#3367ef" }}
                    checked={race.includes("Hispanic")}
                    onChange={handleRaceChange}
                  />
                  <CheckboxField
                    label="Asian"
                    name="Asian"
                    style={{ backgroundColor: "#3367ef" }}
                    checked={race.includes("Asian")}
                    onChange={handleRaceChange}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CheckboxField
                    label="Other"
                    name="Other"
                    style={{ backgroundColor: "#3367ef" }}
                    checked={race.includes("Other")}
                    onChange={handleRaceChange}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div
            className="cardBottomRow"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <Card
              className="animate__animated animate__backInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>Education</p>
              <SelectField
                placeholder="Minimum Education"
                label="Education"
                labelHidden
                width="100%"
                onChange={handleEducationChange}
              >
                <option value="Highschool Diploma">Any Education Level</option>
                <option value="Associate's Degree">Associate's Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate's Degree">Doctorate's Degree</option>
              </SelectField>
            </Card>
            <Card
              className="animate__animated animate__backInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>Income</p>
              <div
                style={{
                  marginTop: "-20px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  placeholder="Minimum Income"
                  value={minimumIncome}
                  onChange={(event) => handleIncomeChange(event.target.value)}
                  style={{ width: "80%" }}
                  variation="quiet"
                  min={0}
                  max={500000}
                />
                <SliderField
                  max={500000}
                  step={5000}
                  value={minimumIncome}
                  isValueHidden
                  onChange={handleIncomeChange}
                  width="80%"
                  filledTrackColor={"#3267f1"}
                />
              </div>
            </Card>
            <Card
              className="animate__animated animate__backInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
              }}
            >
              <p style={{ color: "black" }}></p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <CheckboxField
                  label="Exclude Married?"
                  name="marriage"
                  style={{ backgroundColor: "#3367ef" }}
                  onChange={handleMarriedChange}
                />
                <CheckboxField
                  label="Exclude Obese?"
                  name="Obesity"
                  className="amplify-checkbox_icon"
                  onChange={handleObeseChange}
                />
              </div>
            </Card>
          </div>
        </div>
      </Card>
      <div style={{ marginTop: "20px" }}>
        <Button
          className="animate__animated animate__fadeIn animate__delay-1s"
          variation="destructive"
          loadingText="Loading..."
          style={{ backgroundColor: "#d40203" }}
          onClick={handleBuildMan}
        >
          Build Your Man
        </Button>
      </div>
    </div>
  );
};
