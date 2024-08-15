import {
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

const CheckoutForm = ({
                        user = {},
                        handleChange,
                        handleSubmit,

                      }) => (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
              required
              fullWidth
              id="first-name"
              name="firstName"
              label="First Name"
              value={user.firstName}
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
              value={user.lastName}
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
              value={user.email}
              onChange={handleChange}
          />
        </Grid>
      </Grid>
      <div className="actions">
        <Button size="medium" to="/basket" component={Link} variant="contained">
          Go Back
        </Button>
        <Button type="submit" size="medium" color="secondary" variant="contained">
          Next
        </Button>
      </div>
    </form>
);

export default CheckoutForm;
