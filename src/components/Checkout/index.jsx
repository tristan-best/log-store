import { useState, useEffect} from "react";
import {
    Step,
    Paper,
    Stepper,
    StepLabel,
    Container,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { renderRelatedComponent } from "./helpers";
import "../../css/Checkout/style.css";

const steps = ["order-address", "order-details", "order-payment"];


const Checkout = ({ basketData, orderInfo, orderError, handleCheckout }) => {
    const [user, setUser] = useState({
        city: "",
        email: "",
        address: "",
        postCode: "",
        lastName: "",
        firstName: "",
        shippingOption: {},
        shippingOptions: [],
        shippingCountry: {},
        shippingCountries: [],
        shippingSubdivision: {},
        shippingSubdivisions: [],
    });
    const [bookingStep, setBookingStep] = useState("order-address");
    const [checkoutData, setCheckoutData] = useState("");


    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setBookingStep("order-details");
    };

    const handleNextStep = (e, step) => {
        e.preventDefault();
        setBookingStep(step);
    };

    const handleBackStep = (e, step) => {
        e.preventDefault();
        setBookingStep(step);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSelectChange = (e, state) => {
        const { name, value } = e.target;
        if (state === "shippingOptions") {
            setUser({
                ...user,
                [name]: {
                    id: value,
                },
            });
        } else {
            setUser({
                ...user,
                [name]: {
                    name: user[state].find((country) => country.code === value).name,
                    code: value,
                },
            });
        }
    };
    useEffect(() => {
        if (basketData.id) {
            const generateToken = async () => {
                try {
                    const response = await commerce.checkout.generateToken(
                        basketData.id,
                        {
                            type: "cart",
                        }
                    );
                    setCheckoutData(response);
                } catch (error) {
                    console.error("Checkout error: ", error);
                }
            };
            generateToken();
        }
    }, [basketData, history]);

    if (
        !checkoutData
    ) {
        return (
            <div className="checkout">
                <Container>
                    <Paper className="paper" elevation={3}>
                        <div>
                            <Typography align="center" variant="h5">
                                please wait...
                            </Typography>
                        </div>
                        <div className="products-spinner" align="center">
                            <CircularProgress/>
                        </div>
                    </Paper>
                </Container>
            </div>
        );

    }

    return (
        <div className="checkout">
            <Container>
                <Paper className="paper" elevation={3}>
                    <Typography align="center" variant="h5" gutterBottom>
                        Checkout
                    </Typography>
                    {bookingStep !== "confirmation" && (
                        <Stepper
                            className="stepper"
                            activeStep={steps.indexOf(bookingStep)}
                        >
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    )}
                    {renderRelatedComponent({
                        user,
                        orderInfo,
                        orderError,
                        bookingStep,
                        handleChange,
                        handleSubmit,
                        checkoutData,
                        handleBackStep,
                        handleNextStep,
                        handleCheckout,
                        handleSelectChange,
                    })}
                </Paper>
            </Container>
        </div>
    );
};

export default Checkout;