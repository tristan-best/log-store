import { Grid, Button, Container, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";

import "../../css/ProductView/style.css";


const createMarkup = (text) => {
    return { __html: text };
};
const ProductView = ({ addProduct }) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async (id) => {
        const response = await commerce.products.retrieve(id);
        const { name, price, image, quantity, description } = response;
        setProduct({
            id,
            name,
            quantity,
            description,
            src: image.url,
            price: price.formatted_with_symbol,
        });
    };
    useEffect(() => {
        const id = window.location.pathname.split("/");
        fetchProduct(id[2]);
    }, []);

    const handleQuantity = (param) => {
        if (param === "decries" && quantity > 1) {
            setQuantity(quantity - 1);
        }
        if (param === "increase" && quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <Container>
        <Container className="product-view">
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} className="image-wrapper">
                    <img
                        onLoad={() => {
                            setLoading(false);
                        }}
                        src={product.src}
                        alt={product.name}
                    />
                </Grid>
                <Grid item xs={12} md={5} className="text">
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography
                        variant="h6"
                        dangerouslySetInnerHTML={createMarkup(product.description)}
                    />
                    <Typography variant="h3" className="priceL">Price: {product.price}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                variant="contained"
                                className="increase-product-quantity"
                                onClick={() => {
                                    handleQuantity("increase");
                                }}
                            >
                                +
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="quantity" variant="h3">
                                Quantity: {quantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                    handleQuantity("decries");
                                }}
                            >
                                -
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="large"
                                className="custom-button"
                                onClick={() => {
                                    addProduct(product.id, quantity);
                                }}
                            >
                                <ShoppingCartIcon /> Add to basket
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {loading && <Spinner />}
        </Container>
        </Container>
    );
};

export default ProductView;