import React, { useState } from 'react';
import im from '../assest/136920.jpg';
import Logo from './Logo';
import {
  Box,
  Button,
  Form,
  TextArea,
  Grommet
} from 'grommet';
import '../App.css';
import { useParams } from 'react-router-dom';

const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: "#000000",
      active: "#000000",
    },
    font: {
      family: 'Lato',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1'}}
    {...props}
  />
);

const DiagnosisTextArea = ({ onChange }) => (
  <Grommet theme={theme}>
    <h4>Diagnosis</h4>
    <TextArea
      style={{ width: "50vw", height: "12vw", backgroundColor: "#FFFFFF", color: "#000000", opacity: 0.5 }}
      placeholder="Enter Diagnosis"
      label="Enter Diagnosis"
      onChange={onChange}
      fill
      required
    />
  </Grommet>
);

const PrescriptionTextArea = ({ onChange }) => (
  <Grommet theme={theme}>
    <h4>Prescription</h4>
    <TextArea
      placeholder="Enter Prescription"
      label="Enter Prescription"
      onChange={onChange}
      style={{ width: "50vw", height: "12vw", backgroundColor: "#FFFFFF", color: "#000000", opacity: 0.5 }}
      fill
      required
    />
  </Grommet>
);

const Diagnose = () => {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleDiagnosisChange = (event) => {
    setDiagnosis(event.target.value);
  };

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/diagnose?diagnosis=${diagnosis}&prescription=${prescription}&id=${id}`)
      .then(() => {
        window.alert("Diagnosis Submitted!");
      });
  };

  return (
    <div className='main'>
      <img src={im} alt="image_alternauhsddv"></img>
      <div className="content">
        <Grommet theme={theme} full>
          <AppBar>
            <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Logo></Logo></a>
          </AppBar>
          <Box align="center" gap="small">
            <Form onSubmit={handleSubmit}>
              <DiagnosisTextArea onChange={handleDiagnosisChange} />
              <PrescriptionTextArea onChange={handlePrescriptionChange} />
              <br />
              <Box align="center">
                <Button
                  label="Submit Diagnosis"
                  type="submit"
                  primary
                />
              </Box>
            </Form>
          </Box>
        </Grommet>
      </div>
    </div>
  );
}

export default Diagnose;
