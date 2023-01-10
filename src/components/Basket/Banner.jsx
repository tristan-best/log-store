import { Container, Typography, Button, Grid } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import "../../css/Basket/style.css";

const Banner = () => {
  return (
    <div className="basket-banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Basket is empty press continue shopping to add new products
            </Typography>
            <Button className="shopping-button" component={Link} to="/">
              continue shopping
            </Button>
          </Grid>
          <Grid className="brand" item xs={12} sm={6}>
            <ShoppingCartIcon />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
