import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import v from '../assest/f.mp4';
import Logo from './Logo';
import {
  Box,
  Button,
  Grommet,
  FormField,
  Form,
  CheckBox,
} from 'grommet';

import '../App.css';

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
    style={{ zIndex: '1' }}
    {...props} />
);

const LogIn = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const isDoc = formData.get('isDoc') === 'on';

    if (isDoc) {
      fetch(`http://localhost:3001/checkDoclogin?email=${email}&password=${password}`)
        .then(res => res.json())
        .then(res => {
          if (res.data.length === 0) {
            window.alert("Invalid Log In");
          } else {
            navigate("/DocHome");
            console.log(res.data);
          }
        });
    } else {
      fetch(`http://localhost:3001/checklogin?email=${email}&password=${password}`)
        .then(res => res.json())
        .then(res => {
          if (res.data.length === 0) {
            window.alert("Invalid Log In");
          } else {
            navigate("/Home");
            console.log(res.data);
          }
        });
    }
  };

  return (
    <div className="main">
      <video src={v} autoPlay loop muted></video>
      <div className="content">
        <Grommet theme={theme} full>
          <AppBar>
            <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Logo /></a>
          </AppBar>
          <Box fill align="center" justify="top" pad="medium">
            <Box width="medium" pad="medium">
              <Form onSubmit={handleSubmit}>
                <FormField
                  style={{backgroundColor:"#FFFFFF", color:"#000000",opacity:0.5}}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Please enter your email."
                  required
                />
                <FormField
                  style={{backgroundColor:"#FFFFFF", color:"#000000",opacity:0.5}}
                  type='password'
                  label="Password"
                  name="password"
                  placeholder="Please enter your password."
                  required
                />
                <FormField
                  style={{backgroundColor:"#FFFFFF", color:"#000000",opacity:0.5}}
                  component={CheckBox}
                  checked={isDoctor}
                  margin="large"
                  label="I'm a doctor"
                  name="isDoc"
                  onChange={(event) => {
                    setIsDoctor(event.target.checked);
                  }}
                />
                <Box direction="column" align="center">
                  <Button
                    label="Log In"
                    style={{ textAlign: 'center', margin: '1rem', backgroundColor: 'grey', color: '#000000'}}
                    type='submit'
                    fill="horizontal"
                    primary
                  />
                  <Button
                    label="Create Account"
                    style={{ textAlign: 'center', margin: '0.5rem', backgroundColor: 'grey', color: '#000000'}}
                    fill="horizontal"
                    href="/createAcc"
                  />
                </Box>
              </Form>
            </Box>
          </Box>
        </Grommet>
      </div>
    </div>
  );
};

export default LogIn;
