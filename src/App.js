import logo from './Bag.png';
import './App.css';
import * as React from 'react';
import { Button, TextField, SelectField, CheckboxField, Card, SliderField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'animate.css';
import './customAnimations.css';

function App() {
  const [sliderValue, setSliderValue] = React.useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <div className="App" style={{ justifyContent: 'center' }}>
      <header className="App-header">
        <div style={{ justifyContent: 'center', marginBottom: '50px' }}>
          <p>
            <code>Welcome to the Delusion Calculator</code>
          </p>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <div className="cardTopRow" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px' }}>
          <Card className="animate__animated animate__fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'  }}>
            <p style={{ color: 'black' }}>Age</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  placeholder="Minimum"
                  label="Minimum"
                  labelHidden
                  errorMessage="There is an error"
                  style={{ borderRadius: '0' }}
                  variation="quiet"
                />
                <TextField
                  placeholder="Maximum"
                  label="Maximum"
                  labelHidden
                  errorMessage="There is an error"
                  style={{ borderRadius: '0' }}
                  variation="quiet"
                />
            </div>
          </Card>
          <Card className="animate__animated animate__fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px' }}>
            <p style={{ color: 'black' }}>Height</p>
            <SelectField
              placeholder="Minimum Height"
              label="Height"
              labelHidden
              width="100%"
            >
            </SelectField>
          </Card>
          <Card className="animate__animated animate__fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px' }}>
            <p style={{ color: 'black' }}>Race</p>
            <SelectField
              placeholder="Race"
              label="Height"
              labelHidden
              width="100%"
              style={{ justifyContent: 'center' }}
            >
            </SelectField>
          </Card>
        </div>
        <div className="cardBottomRow" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <Card className="animate__animated animate__backInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px' }}>
            <p style={{ color: 'black' }}>Education</p>
            <SelectField
              placeholder="Education"
              label="Education"
              labelHidden
              width="100%"
            >
            </SelectField>
          </Card>
          <Card className="animate__animated animate__backInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px', height: '200px'  }}>
            <p style={{ color: 'black' }}>Income</p>
            <div style={{ marginTop: '-20px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <TextField
                value={sliderValue}
                onChange={(event) => setSliderValue(event.target.value)}
                style={{ width: '80%' }}
                variation="quiet"
              />
              <SliderField 
                max={100000}
                step={1000}
                value={sliderValue}
                isValueHidden
                onChange={handleSliderChange}
                width="80%"
                filledTrackColor={"#3267f1"}
              />
            </div>
          </Card>
          <Card className="animate__animated animate__backInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', width: '300px' }}>
            <p style={{ color: 'black' }}></p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <CheckboxField 
                label="Married?"
                name="marriage"
                style={{ backgroundColor: '#3367ef' }}
              />
              <CheckboxField 
                label="Obese?"
                name="Obesity"
                className="amplify-checkbox_icon"
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
            >
              Build Your Man
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
