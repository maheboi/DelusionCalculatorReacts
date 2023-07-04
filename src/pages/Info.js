import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Button, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Design from "../styles/Design.js";

function Info() {
  const handleBackHome = (event) => {
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <div className="Calculator">
      <Design className="Design" />
      <header className="Calculator-header">
        <Text
          variation="primary"
          as="p"
          lineHeight="1.5em"
          fontWeight={400}
          fontSize=".5em"
          fontStyle="normal"
          textDecoration="none"
          width="30vw"
          color={"white"}
        >
          {" "}
          <p>
            <Text
              variation="primary"
              as="p"
              lineHeight="1.5em"
              fontWeight={400}
              fontSize="1em"
              fontStyle="normal"
              textDecoration="none"
              width="30vw"
              color={"white"}
            >
              This calculator was built for edutainment purposes. All data on
              marriage, income by age and ethnicity, and education by
              race and income was sourced from the 2023 "Current Population
              Survey - Annual Social and Economic Supplement" (CPS-ASEC) carried
              out by the US Census Bureau. All data on height & weight by race
              was sourced from the NHANES (The National Health and Nutrition
              Examination) survey. NHANES is a major program of the National
              Center for Health Statistics (NCHS). NCHS is part of the Centers
              for Disease Control and Prevention (CDC) and has the
              responsibility for producing vital and health statistics for the
              Nation.This calculator has gone through multiple iterations in
              order to refine the accuracy of the calculations. It is currently
              on Version 3.
            </Text>
          </p>
          <h2>Limitations:</h2>
          <p>
            <Text
              variation="primary"
              as="p"
              lineHeight="1.5em"
              fontWeight={400}
              fontSize="1em"
              fontStyle="normal"
              textDecoration="none"
              width="30vw"
              color={"white"}
            >
              How is the calculator able to merge the two statistical samples
              (CPS and NHANES) to generate one reliable result? In an ideal
              world this calculator would process just one single big
              statistical sample of a survey that includes all the details we
              need: age, marital status, race, height, bmi and personal income.
              Unfortunately, this is not the case. The CPS survey lacks height
              and bmi details, while the NHANES lacks details about personal
              income. Therefore, this calculator has to run two different
              searches, one for income and one for body measures, then it
              combines the two results (both opportunely filtered by age,
              marital status and race) into one single percentage value. The
              final percentage is not far from reality but it's not entirely
              accurate because it doesn't take into account the correlations
              between income and height or weight. For example, there have been
              studies showing that taller people tend to be paid slightly more.
              So, by processing the two searches independently, the calculator
              might underestimate the number of tall high income individuals and
              overestimate the tall low income ones and so on. Still... I
              wouldn't expect the results to be way off, but keep it in mind and
              take the final number with a grain of salt.
            </Text>
          </p>
          <h> Links to all sources can be found below: </h>
          <p>
            <Text
              variation="primary"
              as="p"
              lineHeight="1.5em"
              fontWeight={400}
              fontSize="1em"
              fontStyle="normal"
              textDecoration="none"
              width="30vw"
              color={"white"}
            >
              <h2>Data Sources:</h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <a
                    href="https://www.census.gov/programs-surveys/cps/data/tables.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CPS-ASEC Data for Dwelling, Schooling, Income, and Ethnicity
                  </a>
                </li>
                <li>
                  <a
                    href="https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/P_BMX.XPT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NHANES Data for Body Measures - Data File
                  </a>
                  <br />
                  <a
                    href="https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/P_BMX.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NHANES Data for Body Measures - Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/P_DEMO.XPT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NHANES Data for Demographics - Data File
                  </a>
                  <br />
                  <a
                    href="https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/P_DEMO.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NHANES Data for Demographics - Documentation
                  </a>
                </li>
              </ul>
            </Text>
          </p>
        </Text>
        <Button
          className="animate__animated animate__fadeIn"
          variation="destructive"
          loadingText="Loading..."
          style={{ backgroundColor: "#d40203" }}
          onClick={handleBackHome}
        >
          Return
        </Button>
      </header>
    </div>
  );
}
export default Info;
