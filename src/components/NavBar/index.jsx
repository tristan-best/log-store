import {
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
  } from "@mui/material";
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import { Link, useLocation } from "react-router-dom";
  
  import "../../css/NavBar/style.css";
  import logo from "../logo.png"
  
  const NavBar = ({ basketItems, totalCost }) => {
    const location = useLocation();
    return (
      <>
        <AppBar position="fixed" className="custom-navbar">
          <Container>
            <Toolbar>
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className="custom-title"
                color="inherit"
              >
                <img
                  src={logo}
                  alt="shadowHackers logo"
                  height="15px"
                  className="logo"
                />
  
              </Typography>
              {location.pathname === "/basket" ? (
                <div className="basket-wrapper">
                  <h2>
                    Total cost: <strong>{totalCost}</strong>
                  </h2>
                </div>
              ) : (
                <div className="basket-wrapper">
                  <IconButton
                    component={Link}
                    to="/basket"
                    aria-label="Show basket contents"
                    color="inherit"
                  >
                    <Badge badgeContent={basketItems} color="secondary">
                      <ShoppingCartIcon className="custom-basket" />
                    </Badge>
                  </IconButton>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  };
  
  export default NavBar;
  