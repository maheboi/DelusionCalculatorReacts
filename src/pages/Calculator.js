import logo from "../assets/FF Logo Transparent.png";
import catBag from "../assets/Bag.png";
import "../styles/Calculator.css";
import "../styles/customAnimations.css";
import * as React from "react";
import { createTodo } from "../graphql/mutations";
import { API } from "aws-amplify";
import { csv } from "d3";

import {
  Card,
  Button,
  TextField,
  CheckboxField,
  SliderField,
  SelectField
} 
from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "animate.css";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import Design from "../styles/Design.js";

Amplify.configure(awsExports);

function Calculator() {
  const [ageMin, setAgeMin] = React.useState();
  const [ageMax, setAgeMax] = React.useState();
  const [minimumHeight, setMinimumHeight] = React.useState("");
  const [race, setRace] = React.useState([]);
  const [minimumEducation, setMinimumEducation] = React.useState("");
  const [minimumIncome, setMinimumIncome] = React.useState();
  const [isMarried, setIsMarried] = React.useState(false);
  const [isObese, setIsObese] = React.useState(false);

  const handleAgeMinChange = (event) => {
    setAgeMin(parseInt(event.target.value, 10));
  };

  const handleAgeMaxChange = (event) => {
    setAgeMax(parseInt(event.target.value, 10));
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
    console.log({
      ageMin,
      ageMax,
      minimumHeight,
      race: race.join(", "),
      minimumEducation,
      minimumIncome,
      isMarried,
      isObese,
    });
  };

  const handleSubmit = async () => {
    const dataFile = "../assets/NHANES2020.csv";
    try {
      // Step 1: Import the CSV file
      const data = await csv(dataFile);
      console.log(data);

      // Step 2: Convert selected height from feet to centimeters
      const selectedHeightInCm = convertHeightToCm(minimumHeight);

      // Step 3: Filter rows by height
      const filteredByHeight = data.filter(
        (row) => row["BMXHT"] >= selectedHeightInCm
      );

      // Step 4: Filter rows by race
      const filteredByRace = filteredByHeight.filter((row) =>
        race.includes(row["RIDRETH3"])
      );

      // Step 5: Count the remaining rows
      const count = filteredByRace.length;

      console.log("Filtered rows:", filteredByRace);
      console.log("Count:", count);
    } catch (error) {
      console.error("Error:", error);
    }
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

    try {
      const url = `https://api.census.gov/data/2022/cps/asec/mar?tabulate=weight(MARSUPWT)&col+A_SEX&for=state:*&A_AGE=${ageMin}:${ageMax}&A_HGA=${educationValue}:46&AGI=${minimumIncome}:2000000&A_MARITL=${marriageValue}&PRDTRACE=${raceValue}`;
      const response = await fetch(url);
      console.log("Denominator URL: " + url);
      const data = await response.json();

      const url2 = `https://api.census.gov/data/2022/cps/asec/mar?tabulate=weight(MARSUPWT)&col+A_SEX&for=state:*&A_AGE=18:85`;
      const response2 = await fetch(url2);
      console.log("Numurator URL: " + url2);
      const data2 = await response2.json();

      console.log("Denominator" + data);
      console.log("Numerator" + data2);

      const probability = data[1][1] / data2[1][1];

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

      const createTodoResponse = await API.graphql({
        query: createTodo,
        variables: { input },
      });

      console.log("Todo created:", createTodoResponse.data.createTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="Calculator">
      <Design className="Design" />
      <header className="Calculator-header">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={logo}
              className="Calculator-logo"
              alt="logo"
            />
            <img
              src={catBag}
              className="Calculator-catBag"
              alt="catBag"
              style={{ marginTop: "50px" }}
            />
          </div>
          <p style={{ textAlign: "center" }}>
            <code style={{ textAlign: "center", color: "black", fontWeight: "bold", textShadow: "0px 0px 4px white, 0px 0px 6px white, 0px 0px 8px white" }}>Welcome to the Delusion Calculator</code>
          </p>
        </div>
        
      </header>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "1000px", height: "500px", borderRadius: "16px", backgroundColor: "rgba(48, 48, 48, 0.25)", boxShadow: "0px 0px 16px rgba(255, 105, 180, 1)" }}>
        <div>
          <div
            className="cardTopRow"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "20px"
            }}>
            <Card
              className="Card-input animate__animated animate__fadeInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px"
              }}>
              <p style={{ color: "black" }}>Age</p>
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
              }}>
              <p style={{ color: "black" }}>Height</p>
              <SelectField
                placeholder="Minimum Height"
                label="Height"
                labelHidden
                width="100%"
                onChange={handleHeightChange}
                options={[
                  "4'9",
                  "4'10",
                  "4'11",
                  "5'0",
                  "5'1",
                  "5'2",
                  "5'3",
                  "5'4",
                  "5'5",
                  "5'6",
                  "5'7",
                  "5'8",
                  "5'9",
                  "5'10",
                  "5'11",
                  "6'0",
                  "6'1",
                  "6'2",
                  "6'3",
                  "6'4",
                  "6'5",
                  "6'6",
                  "6'7",
                  "6'8",
                  "6'9",
                ]} />
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
              }}>
              <p style={{ color: "black" }}>Race</p>
              <div style={{ display: "flex", flexDirection: "column", marginTop: "-20px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gridGap: "5px",
                  }}>
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
                <div style= {{ display: "flex", justifyContent: "center" }}>
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
              marginTop: "40px"
            }}>
            <Card
              className="animate__animated animate__backInUp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                width: "300px",
                height: "200px",
              }}>
              <p style={{ color: "black" }}>Education</p>
              <SelectField
                placeholder="Minimum Education"
                label="Education"
                labelHidden
                width="100%"
                onChange={handleEducationChange}
              >
                <option value="Highschool Diploma">Highschool Diploma or less</option>
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
              }}>
              <p style={{ color: "black" }}>Income</p>
              <div
                style={{
                  marginTop: "-20px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TextField
                  placeholder="Minimum Income"
                  value={minimumIncome}
                  onChange={(event) => handleIncomeChange(event.target.value)}
                  style={{ width: "80%" }}
                  variation="quiet"
                  min={0}
                  max={2000000}
                />
                <SliderField
                  max={2000000}
                  step={10000}
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
              }}>
              <p style={{ color: "black" }}></p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}>
                <CheckboxField
                  label="Married?"
                  name="marriage"
                  style={{ backgroundColor: "#3367ef" }}
                  onChange={handleMarriedChange}
                />
                <CheckboxField
                  label="Obese?"
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
          loadingText="Building..."
          style={{ backgroundColor: "#d40203" }}
          onClick={handleBuildMan}
        >
          Build Your Man
        </Button>
      </div>
    </div>
  );
}

export default Calculator;
