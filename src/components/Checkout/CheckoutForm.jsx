import {
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm('service_ll9xbh4', 'template_sbnf00', form.current, {
      publicKey: 'qO3HRTeo-O5AU3NM4',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
};


const CheckoutForm = ({
                        user = {},
                        handleChange,
                        handleSubmit,

                      }) => (
    <form onSubmit={sendEmail} autoComplete="off">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
              required
              fullWidth
              id="first-name"
              name="firstName"
             label="First Name"
              value={Send}
              onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              required
              fullWidth
              id="last-name"
              name="lastName"
              label="Last Name"
              value={Send}
              onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              label="Email"
              value={Send}
              onChange={handleChange}
          />
        </Grid>
      </Grid>
      <div className="actions">
        <Button size="medium" to="/basket" component={Link} variant="contained">
          Go Back
        </Button>
        <Button type="submit" value={Send}  size="medium" color="secondary" variant="contained">
          Next
        </Button>
      </div>
    </form>


);



export default CheckoutForm;