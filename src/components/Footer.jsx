import "../styles/Footer.css";
import logo from "../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Logo */}
        <div className="footer-logo">
          <img src={logo} alt="MIS" />
        </div>

        {/* Contact */}
        <div className="footer-block">
          <h4>Contact</h4>
          <p>+1 (604) 819-4048</p>
          <p>andrewyu@metricinnovative.com</p>

          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
          </div>
        </div>

        {/* Address */}
        <div className="footer-block">
          <h4>Address</h4>
          <p>Chilliwack, British Columbia</p>
          <p>Canada</p>
        </div>
      </div>
    </footer>
  );
}
