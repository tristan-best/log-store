import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import Product from "../Product";
import FilterProduct from "../FilterProduct";
import Spinner from "../Spinner";
import Banner from "../Banner";
import "../../css/Products/style.css";


const Products = ({ categories, addProduct }) => {
    const [searchResult, setSearchResult] = React.useState([]);
    if (!categories.length) return <Spinner />;

    return (
        <div>
            <FilterProduct
                addProduct={addProduct}
                categories={categories}
                searchResult={searchResult}
                setSearchResult={setSearchResult}
            />
            {!searchResult.length && (
                <>
                    <Banner />
                    <div id="products">
                        {categories.map((category, index) =>
                            category.productsData.length ? (
                                <div
                                    key={category.id}
                                    className="contents"
                                    style={{
                                        backgroundImage:
                                            index % 2 !== 0
                                                ? "linear-gradient(to bottom right, #3d4a5d,#3d4a5d, #bb86fc)"
                                                : "",
                                    }}
                                >
                                    <Container>
                                        <Typography
                                            className="headline"
                                            variant="h3"
                                            component="h2"
                                        >
                                            {category.name}
                                        </Typography>
                                        <Grid container spacing={4}>
                                            {category.productsData.map((product) => (
                                                <Grid key={product.id} item xs={12} sm={6} md={4}>
                                                    <Product
                                                        product={product}
                                                        addProduct={addProduct}
                                                        categoryName={category.name}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Container>
                                </div>
                            ) : null
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;