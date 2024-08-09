import "../../css/Footer/style.css";
import {Typography} from "@mui/material";

const Footer = () => {
    return (
        <footer className="footer">
            <div>
                <Typography variant="h6">
                    <a href="https://t.me/logshopbackup" target="_blank" rel="noopener noreferrer" style={{color: "white"}}>
                         Contact Us on Telegram
                    </a>
                </Typography>
            </div>
        </footer>
    );



};

export default Footer;
