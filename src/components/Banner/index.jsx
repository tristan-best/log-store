import { Container, Typography, Button, Grid } from "@mui/material";
import logo from "../banner.png";
import "../../css/Banner/style.css";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography
              className="title"
              variant="h1"
              style={{ color: "orange" }}
            >
              Legit cc,logs and more from LOGSHOP☄️ updated everyday!
            </Typography>
            <Typography
              className="title3"
              variant="h1"
              style={{ color: "green" }}
            >
              We accept bitcoin only
            </Typography>
            <Button className="shopping-button" href="#products">
              Shop Now
            </Button>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img src={logo} alt="Brand-tv" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
