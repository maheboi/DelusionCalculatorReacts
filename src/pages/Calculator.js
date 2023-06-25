import logo from '../assets/Bag.png';
import '../styles/Calculator.css';
import '../styles/customAnimations.css';
import * as React from 'react';
import { Card, Button, TextField, CheckboxField, SliderField, SelectField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'animate.css';

function Calculator() {
  const [ageMin, setAgeMin] = React.useState();
  const [ageMax, setAgeMax] = React.useState();
  const [minimumHeight, setMinimumHeight] = React.useState('');
  const [race, setRace] = React.useState('');
  const [minimumEducation, setMinimumEducation] = React.useState('');
  const [minimumIncome, setMinimumIncome] = React.useState();
  const [isMarried, setIsMarried] = React.useState(false);
  const [isObese, setIsObese] = React.useState(false);

  const handleAgeMinChange = (event) => {
    setAgeMin(event.target.value);
  }
  const handleAgeMaxChange = (event) => {
    setAgeMax(event.target.value);
  }

  const handleHeightChange = (event) => {
    setMinimumHeight(event.target.value);
  }

  const handleRaceChange = (event) => {
    const value = event.target.name;
    if (race.includes(value)) {
      setRace(race.filter((race) => race !== value));
    } else {
      setRace([...race, value]);
    }
  }

  const handleEducationChange = (event) => {
    setMinimumEducation(event.target.value);
  }

  const handleIncomeChange = (value) => {
    const numericValue = Number(value);
    if (numericValue <= 2000000) {
      setMinimumIncome(numericValue);
    } else {
      setMinimumIncome(2000000);
    }
  };

  const handleMarriedChange = (event) => {
    setIsMarried(event.target.value);
  }

  const handleObeseChange = (event) => {
    setIsObese(event.target.value);
  }

  const handleBuildMan = () => {
    console.log({
      ageMin,
      ageMax,
      minimumHeight,
      race,
      minimumEducation,
      minimumIncome,
      isMarried,
      isObese
    });
  };

  return (
    <div className="Calculator"
          style={{ justifyContent: 'center'
          }}
        >
      <header className="Calculator-header">
        <div style={{ justifyContent: 'center', marginBottom: '50px' }}>
          <p>
            <code>Welcome to the Delusion Calculator</code>
          </p>
          <img
            src={logo}
            className="Calculator-logo"
            alt="logo"
            style={{ width: '100px', height: '100px' }}
          />
        </div>

        <div className="cardTopRow" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px' }}>
          <Card
            className="animate__animated animate__fadeInUp"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'
            }}>
            <p style={{ color: 'black' }}>Age</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  placeholder="Minimum Age"
                  label="Minimum"
                  labelHidden
                  errorMessage="There is an error"
                  style={{ borderRadius: '0' }}
                  variation="quiet"
                  value={ageMin}
                  onChange={handleAgeMinChange}
                />
                <TextField
                  placeholder="Maximum Age"
                  label="Maximum"
                  labelHidden
                  errorMessage="There is an error"
                  style={{ borderRadius: '0' }}
                  variation="quiet"
                  value={ageMax}
                  onChange={handleAgeMaxChange}
                />
            </div>
          </Card>
          <Card
            className="animate__animated animate__fadeInUp"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'
            }}>
            <p style={{ color: 'black' }}>Height</p>
            <SelectField
              placeholder="Minimum Height"
              label="Height"
              labelHidden
              width="100%"
              onChange={handleHeightChange}
              options={["4'9", "4'10", "4'11", "5'0", "5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8", "5'9", "5'10", "5'11", "6'0", "6'1", "6'2", "6'3", "6'4", "6'5", "6'6", "6'7", "6'8", "6'9"]}
            >
            </SelectField>
          </Card>
          <Card
            className="animate__animated animate__fadeInUp"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'
            }}>
            <p style={{ color: 'black' }}>Race</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '5px' }}>
                <CheckboxField 
                  label="White"
                  name="White"
                  style={{ backgroundColor: '#3367ef' }}
                  checked={race.includes('White')}
                  onChange={handleRaceChange}
                />
                <CheckboxField 
                  label="Black"
                  name="Black"
                  style={{ backgroundColor: '#3367ef' }}
                  checked={race.includes('Black')}
                  onChange={handleRaceChange}
                />
                <CheckboxField 
                  label="Hispanic"
                  name="Hispanic"
                  style={{ backgroundColor: '#3367ef' }}
                  checked={race.includes('Hispanic')}
                  onChange={handleRaceChange}
                />
                <CheckboxField 
                  label="Asian"
                  name="Asian"
                  style={{ backgroundColor: '#3367ef' }}
                  checked={race.includes('Asian')}
                  onChange={handleRaceChange}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="cardBottomRow" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <Card
            className="animate__animated animate__backInUp"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'
            }}>
            <p style={{ color: 'black' }}>Education</p>
            <SelectField
              placeholder="Minimum Education"
              label="Education"
              labelHidden
              width="100%"
              onChange={handleEducationChange}
            >
              <option value="Highschool Deploma">Highschool Deploma</option>
              <option value="Associate's Degree">Associate's Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate's Degree">Doctorate's Degree</option>
            </SelectField>
          </Card>
          <Card
            className="animate__animated animate__backInUp"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'
            }}>
            <p style={{ color: 'black' }}>Income</p>
            <div style={{ marginTop: '-20px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <TextField
                placeholder="Minimum Income"
                value={minimumIncome}
                onChange={(event) => handleIncomeChange(event.target.value)}
                style={{ width: '80%' }}
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
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px'
            }}>
            <p style={{ color: 'black' }}></p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <CheckboxField 
                label="Married?"
                name="marriage"
                style={{ backgroundColor: '#3367ef' }}
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
        <div style={{ marginTop: '20px' }}>
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
      </header>
    </div>
  );
}

export default Calculator;
