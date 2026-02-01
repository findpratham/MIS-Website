import "../styles/Footer.css";
import logo from "../assets/Logo.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Column 1: Contact */}
        <div className="footer-col">
          <img src={logo} alt="Metric Innovative Solutions" className="footer-logo" />

          <h4>Contact Us</h4>
          <p className="footer-company">Metric Innovative Solutions Inc.</p>
          <p>41421 Henderson Rd</p>
          <p>Lindell Beach, BC, Canada</p>
          <p>+1 (604) 819-4048</p>
          <p>andrewyu@metricinnovative.com</p>
        </div>

        {/* Column 2: Links */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/why-mis">Why MIS</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/solar-calculator">Solar Calculator</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 3: Recent Posts */}
        <div className="footer-col">
          <h4>Recent Posts</h4>
          <ul>
            <li><a href="/blog/post-1">Blog Post Title One</a></li>
            <li><a href="/blog/post-2">Blog Post Title Two</a></li>
            <li><a href="/blog/post-3">Blog Post Title Three</a></li>
          </ul>
        </div>

        {/* Column 4: Hours */}
        <div className="footer-col">
          <h4>Hours of Operation</h4>
          <p>Mon 08:00 AM – 07:00 PM</p>
          <p>Tue 08:00 AM – 07:00 PM</p>
          <p>Wed 08:00 AM – 07:00 PM</p>
          <p>Thu 08:00 AM – 07:00 PM</p>
          <p>Fri 08:00 AM – 07:00 PM</p>
        </div>

      </div>
    </footer>
  );
}
