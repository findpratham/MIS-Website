import "../styles/Footer.css";
import logo from "../assets/Logo.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Column 1: Contact */}
        <div className="footer-col">
          <img src={logo} alt="Metric Innovative Solutions" className="footer-logo" />

        </div>

        <div className="footer-col">

          <h4>Contact Us</h4>
          <p className="footer-company">Metric Innovative Solutions Inc.</p>
          <p>41421 Henderson Rd</p>
          <p>Lindell Beach, BC, Canada</p>
          <p>+1 (604) 819-4048</p>
          <p>andrewyu@metricinnovative.com</p>

          <div className="footer-socials">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/metric-innovative-solutions-ltd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0.5 8h4V24h-4V8ZM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24h-4V8Z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/metric_innovative_solutions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10Zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.51 4.51 0 0 0 12 7.5Zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9Zm4.8-7.9a1.05 1.05 0 1 1-1.05-1.05A1.05 1.05 0 0 1 16.8 7Z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61566660287291&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.41.59 24 1.32 24H12.8v-9.3H9.69V11h3.11V8.41c0-3.07 1.88-4.74 4.62-4.74 1.31 0 2.44.1 2.77.14v3.2h-1.9c-1.49 0-1.78.71-1.78 1.75V11h3.56l-.46 3.7h-3.1V24h6.08c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.68 0Z"/>
              </svg>
            </a>
          </div>
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

        

      </div>
    </footer>
  );
}
