import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    CardActionArea,
    Button,
  } from "@mui/material";
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import "../../css/CustomCard/style.css";
  import {Link} from "react-router-dom"
  
  
  const CustomCard = ({
    basket,
    product,
    addProduct,
    updateProduct,
    RemoveItemFromBasket,
  }) => {
    return (
        <Card className="custom-card">
          <Link to={`/product-view/${basket ? product.product_id : product.id}`}>
            <CardActionArea>
              <CardMedia
                  component="img"
                  alt="shop"
                  height="260"
                  className="card-image"
                  image={product?.image?.url}
                  title="shop"
              />
              <CardContent className="content">
                <Typography
                    className="title"
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                  {product.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Typography variant="h3">View {product.name}</Typography>
          </Link>
          {basket && (
              <CardActions>
                <Typography
                    className="basket-item-price"
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                  {product.price.formatted_with_symbol}
                </Typography>
              </CardActions>
          )}
          <CardActions className="actions-content">
            {!basket && (
                <>
                  <Typography
                      className="price"
                      gutterBottom
                      variant="h5"
                      component="h2"
                  >
                    {product.price.formatted_with_symbol}
                  </Typography>
                  <Button
                      size="large"
                      className="custom-button"
                      onClick={() => {
                        addProduct(product.id, 1);
                      }}
                  >
                    <ShoppingCartIcon/> Add to basket
                  </Button>
                </>
            )}
            {basket && (
                <>
                  <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        RemoveItemFromBasket(product.id);
                      }}
                  >
                    Remove
                  </Button>
                  <>
                    <Button
                        size="small"
                        variant="outlined"
                        className="increase-product-quantity"
                        onClick={() => {
                          updateProduct(product.id, product.quantity + 1);
                        }}
                    >
                      +
                    </Button>
                    <Typography>&nbsp;{product.quantity}&nbsp;</Typography>
                    <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          updateProduct(product.id, product.quantity - 1);
                        }}
                    >
                      -
                    </Button>
                  </>
                </>
            )}
          </CardActions>
        </Card>
    );
  };
  
  export default CustomCard;
  