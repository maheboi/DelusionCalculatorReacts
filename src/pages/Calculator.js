import logo from "../assets/FF Logo Transparent.png";
import catBag from "../assets/Bag.png";
import "../styles/customAnimations.css";
import * as React from "react";
import { createTodo } from "../graphql/mutations";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import NHANES from "../assets/NHANES2020.csv";
import { FaInfo } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import {
  Card,
  Button,
  TextField,
  CheckboxField,
  SliderField,
  SelectField,
  Text,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "animate.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import Design from "../styles/Design.js";
import "../styles/Calculator.css";

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
  const navigate = useNavigate();

  const [minInput, setMinInput] = React.useState("");
  const [maxInput, setMaxInput] = React.useState("");

  const handleAgeMinChange = (event) => {
    const value = event.target.value;
    setMinInput(value);
    setAgeMin(value); // Update ageMin directly
  };

  const handleAgeMaxChange = (event) => {
    const value = event.target.value;
    setMaxInput(value);
    setAgeMax(value); // Update ageMax directly
  };

  const handleMinBlur = () => {
    let value = parseInt(minInput, 10);
    if (isNaN(value) || value < 18) {
      value = 18;
      setMinInput("18"); // Reset input value to '18'
    } else if (value > 85) {
      value = 85;
      setMinInput("85"); // Reset input value to '85'
    }
    setAgeMin(value);
  };

  const handleMaxBlur = () => {
    let value = parseInt(maxInput, 10);
    if (isNaN(value) || value > 85) {
      value = 85;
      setMaxInput("85"); // Reset input value to '85'
    } else if (value < 18) {
      value = 18;
      setMaxInput("18"); // Reset input value to '18'
    }
    setAgeMax(value);
  };

  const handleHeightChange = (event) => {
    setMinimumHeight(event.target.value);
  };

  const handleToInfo = (event) => {
    navigate("/Info");
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
          complete: function (result, file) {
            console.log("Parsing complete:", result, file);
            console.log("Errors:", result.errors);
            console.log(result.data);
            console.log(BMI);
            const filteredData = result.data.filter(
              (row) =>
                racePass.includes(row.RIDRETH3) &&
                parseFloat(row.BMXHT) >= selectedHeightInCm &&
                row.BMXBMI < BMI
            );

            den = parseFloat(filteredData.length);
            console.log("Filtered Array" + filteredData.length);
            console.log("Filtered Array:");

            const unfilteredCountForRace = result.data.filter(
              (row) =>
                racePass.includes(row.RIDRETH3) &&
                parseFloat(row.BMXHT) > 0 &&
                row.BMXBMI >= 0
            );

            num = parseFloat(unfilteredCountForRace.length);
            console.log("Total Count Array" + unfilteredCountForRace.length);

            heightBMIProbability = den / num;
            console.log("Height Probability" + heightBMIProbability);
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
      console.log("Denominator URL: " + url);
      const data = await response.json();

      const url2 = `https://api.census.gov/data/2022/cps/asec/mar?tabulate=weight(MARSUPWT)&col+A_SEX&for=state:*&A_AGE=${ageMinPass}${ageMaxPass}&A_HGA=31:46&AGI=0:2000000&A_MARITL=1:7&PRDTRACE=1:26%`;
      const response2 = await fetch(url2);
      console.log("Numurator URL: " + url2);
      const data2 = await response2.json();

      console.log("Denominator" + data);
      console.log("Numerator" + data2);

      const censusProbability = data[1][1] / data2[1][1];
      console.log(
        "Census Probability: " +
          censusProbability +
          " Height and BMI Probability: " +
          heightBMIProbability
      );

      const probability = censusProbability * heightBMIProbability;
      const urlpass = `/Results?probability=${encodeURIComponent(
        probability.toString()
      )}&ageMin=${ageMin}&ageMax=${ageMax}`;
      await navigate(urlpass);

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
        <div className="div-center">
          <div className="justify-center">
            <img src={logo} className="Calculator-logo" alt="logo" />
            <img src={catBag} className="Calculator-catBag" alt="catBag" />
          </div>
          <p className="text-align">
            <code className="calculator-text">
              Welcome to the Delusion Calculator
            </code>
          </p>
        </div>
      </header>

      <Card className="container container-box Box-trim animate__animated animate__fadeIn">
        <div>
          <div className="row gx-5 cardTopRow">
            <Card className="col m-3 borderborder.bg-transparentCard-input animate__animated animate__fadeInUp">
              <p className="heading">Age</p>
              <div>
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
            <Card className="col m-3 borderanimate__animated animate__fadeInUp">
              <p className="heading">Height</p>
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
            <Card className="col m-3 border animate__animated animate__fadeInUp">
              <p className="heading">Race</p>
              <div className="row-flex">
                <div className="checkBox">
                  <CheckboxField
                    label="White"
                    name="White"
                    checked={race.includes("White")}
                    onChange={handleRaceChange}
                  />
                  <CheckboxField
                    label="Black"
                    name="Black"
                    checked={race.includes("Black")}
                    onChange={handleRaceChange}
                  />
                  <CheckboxField
                    label="Hispanic"
                    name="Hispanic"
                    checked={race.includes("Hispanic")}
                    onChange={handleRaceChange}
                  />
                  <CheckboxField
                    label="Asian"
                    name="Asian"
                    checked={race.includes("Asian")}
                    onChange={handleRaceChange}
                  />
                  <div className="div-center">
                    <CheckboxField
                      label="Other"
                      name="Other"
                      checked={race.includes("Other")}
                      onChange={handleRaceChange}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="row gx-5 cardBottomRow">
            <Card className="col m-3 border animate__animated animate__backInUp">
              <p className="heading">Education</p>
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
            <Card className="col m-3 border animate__animated animate__backInUp">
              <p className="heading">Income</p>
              <div>
                <TextField
                  placeholder="Minimum Income"
                  value={minimumIncome}
                  onChange={(event) => handleIncomeChange(event.target.value)}
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
            <Card className="col m-3 border animate__animated animate__backInUp">
              <div className="marriedObeseFields">
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
          onClick={handleBuildMan}
        >
          Build Your Man
        </Button>
      </div>
      <div>
        <div>
          <Button
            className="animate__animated animate__fadeIn animate__delay-1s"
            variation="destructive"
            loadingText="Loading..."
            onClick={handleToInfo}
          >
            <FaInfo />
          </Button>
          <Text
            color={"white"}
            marginRight={"20px"}
            className="animate__animated animate__fadeIn animate__delay-1s"
          >
            Info
          </Text>
        </div>

        <Text
          color={"white"}
          marginRight={"-20px"}
          className="animate__animated animate__fadeIn animate__delay-1s"
        >
          Live search using the{" "}
          <a
            href="https://www.census.gov/programs-surveys/cps/data/tables.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            2023 Current Population Survey
          </a>{" "}
          from the US Census Bureau and the{" "}
          <a
            href="https://www.cdc.gov/nchs/nhanes/index.htm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255, 105, 180, 1)" }}
          >
            National Health and Nutrition Examination Survey
          </a>{" "}
          from the Center for Disease Control (CDC).
        </Text>
      </div>

      <Card className="Box-trim animate__animated animate__fadeIn">
        <h2>Full Stack Devs</h2>
        <ul>
          <li>
            <a
              href="https://www.instagram.com/ceosecretorder/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255, 105, 180, 1)",
                textDecoration: "none",
              }}
            >
              <FaInstagram style={{ marginRight: "5px" }} />
              @ceosecretorder
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/frediosos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram style={{ marginRight: "5px" }} />
              @frediosos
            </a>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <a
              href="https://www.instagram.com/sean.lattimore/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram style={{ marginRight: "5px" }} />
              @sean.lattimore
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
}

export default Calculator;
