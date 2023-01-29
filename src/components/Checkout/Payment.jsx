import {Button} from "@mui/material";
import {
    Elements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import {Typography} from "@mui/material";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import address from '../my-wallet.png'


const stripePromise = null;
const Payment = ({
                     checkoutData,
                     handleBackStep,

                 }) => {
    //const address = 'https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&prefix=on&fiat=USD&amount=' + checkoutData?.live?.subtotal?.raw + '&address=bc1q5ras2vpsszvfm3w5kf2ath6vdudqcz0x4ttv6t';
    const codeString = ("bc1q5ras2vpsszvfm3w5kf2ath6vdudqcz0x4ttv6t"); 

    return (
        <>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form>
                            <CardElement />
                            <Typography  gutterBottom style={{margin: 'auto'}} align="center">Pay {checkoutData.subtotal.formatted_with_code} With Bitcoin</Typography>
                            <div className="products-spinner">
                                <img height="240px" style={{margin: 'auto'}} alt='btc' src={address}/>
                            </div>
                            <div className="products-spinner" style={{margin: 'auto'}}>
                                <SyntaxHighlighter language="javascript" style={dark}>
                                    {codeString}
                                </SyntaxHighlighter>
                            </div>
                            <div className="products-spinner">
                            <CopyToClipboard  style={{margin: 'auto'}} align="center" text={codeString}>
                                    <Button size="medium" type="button" variant="outlined" color="primary">Copy to clipboard</Button>
                                </CopyToClipboard>
                            </div>
                            <div className="actions payment-actions">
                                <Button
                                    variant="outlined"
                                    onClick={(e) => handleBackStep(e, "order-details")}
                                >
                                    Back
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );
};

export default Payment;