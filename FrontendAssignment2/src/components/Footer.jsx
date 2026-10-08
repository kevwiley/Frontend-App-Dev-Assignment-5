import "./Footer.css";

// Left side will have shop name and terms and faq, middle will have contacts
function Footer({ shopName, email, phone, address}) {
    return (
        <footer className="footer">
            <div>
                <h2>{shopName}</h2>
                <h3>Terms of Service</h3>
                <h3>FAQ</h3>
            </div>
            <div>
                <p>Email Us: {email}</p>
                <p>Phone Us: {phone}</p>
                <p>Address: {address}</p>
            </div>
        </footer>
    );
}

export default Footer;