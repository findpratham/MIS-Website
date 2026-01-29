// NAVLINK IMPORT:
import { NavLink } from "react-router-dom";

// IMAGES:
import heroImage from "../assets/CoverPage.jpg";
import solutionsImage from "../assets/solutions.jpg";
import processImage from "../assets/flowchart.jpg";
import appoinmentImage from "../assets/Appointment.jpg";
import reviewsBg from "../assets/CoverPage.jpg";

// VIDEO:
import heroVideo from "../assets/hero.mp4";

// OTHER IMPORTS:
import "../styles/Home.css";
import { useRef, useEffect } from "react";

export default function Home() {
  const solutionsRef = useRef(null);

  const scrollToSolutions = () => {
  solutionsRef.current?.scrollIntoView({ behavior: "smooth" });
};


  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Engineering Solutions for Solar</h1>
          <p>
            MIS supports companies and customers throughout the entire project lifecycle.
            From engineering designs, permit applications to installation, we help ensure
            projects move forward smoothly and professionally.
          </p>

          <div className="hero-cta-group">
            <NavLink to="/partnerships" className="hero-cta-link">
              <span>Reach Out to Us</span>
            </NavLink>

            <NavLink to="/solar-calculator" className="hero-cta-link secondary">
              <span>Check Out Solar Calculator</span>
            </NavLink>
          </div>

          
        </div>

        <div
          className="scroll-indicator"
          role="button"
          aria-label="Scroll to Our Solutions"
          onClick={scrollToSolutions}
        >
          <div className="mouse" />
        </div>
      </section>


      <section className="values" ref={solutionsRef} aria-label="Our Values">
      <div className="values-inner">
        <h2 className="values-title">Our Values</h2>

        <div className="values-grid">
          {/* Card 1 */}
          <button type="button" className="flip-card" aria-label="Precision">
            <div className="flip-card-inner">
            <div className="flip-card-front" style={{ backgroundImage: "url(/assets/precision.jpg)" }}>
                <h3>Precision</h3>
              </div>

              <div className="flip-card-back">
                <h3>Precision</h3>
                <p>
                  At MIS, Precision ensures we deliver solutions with the highest standards,
                  down to the finest detail.
                </p>
              </div>
            </div>
          </button>

          {/* Card 2 */}
          <button type="button" className="flip-card" aria-label="Innovation">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>Innovation</h3>
              </div>

              <div className="flip-card-back">
                <h3>Innovation</h3>
                <p>
                  With a commitment to innovation, we push boundaries to bring
                  forward-thinking ideas to life and encourage people to think outside the box.
                </p>
              </div>
            </div>
          </button>

          {/* Card 3 */}
          <button type="button" className="flip-card" aria-label="Collaboration">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>Collaboration</h3>
              </div>

              <div className="flip-card-back">
                <h3>Collaboration</h3>
                <p>
                  Collaboration means we encourage communication and transparency across
                  departments, ensuring everyone’s voice is heard.
                </p>
              </div>
            </div>
          </button>
        </div>

      </div>
    </section>


      <section className="services-process">
        <div className="sp-inner">
          <div className="sp-left">
            <h2>Our Services</h2>

            <h3>Comprehensive Engineering Solutions</h3>
            <p>
              Our services include creating electrical single line diagrams and detailed
              site plans for solar installations, helping companies streamline their
              project planning and execution.
            </p>

            <h3>Stunning 3D Visuals for Solar Sales</h3>
            <p>
              We also offer 3D modeling services that enhance sales presentations,
              allowing solar companies to visually engage clients and effectively
              communicate project benefits during pitches.
            </p>

            <h3>Reliable Solar Installation Services</h3>
            <p>
              We partner with professional solar installation services for projects of all
              sizes across the US &amp; Canada. Our skilled team ensures efficient,
              high-quality installations, delivering reliable solar systems.
            </p>
          </div>

          <div className="sp-right">
         
            <img className="sp-flow" src={processImage} alt="Solar process flowchart" />
          </div>
        </div>
      </section>

      {/* Appointment */}
      {/* <section className="appointment">
        <div className="appointment-inner">
          <div className="appointment-left">
            <h2>Book an Appointment with us</h2>

            <p>
              Book an appointment with Metric Innovative Solutions to discuss your solar
              project’s engineering needs. We provide accurate engineering diagrams and
              3D models to support system design, permitting, and client proposals.
              Schedule a project review with our engineering team to see how we can
              assist with your project.
            </p>

            <button className="appointment-btn">Schedule</button>
          </div>

          <div className="appointment-right">
            <img className="appointment-img" src={appoinmentImage} alt="Solar design preview" />
          </div>
        </div>
      </section> */}

      {/* Reviews */}
      <section className="reviews" style={{ backgroundImage: `url(${reviewsBg})` }}>
        <div className="reviews-overlay" />

        <div className="reviews-inner">
          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              I had my own solar project on my brother-in-law’s single detached house, and
              our initial submission didn’t go through. The team revised the single line
              diagram fast and walked me through the issues. The updated documents were
              approved and we got the rebate.
            </p>
            <div className="review-footer">
              <div className="review-avatar">A</div>
              <div className="review-name">Anna C</div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              We were new to solar and unsure if it was right for our home. They explained
              everything step by step and made a mock-up design. We appreciated the honesty
              and professionalism.
            </p>
            <div className="review-footer">
              <div className="review-avatar">J</div>
              <div className="review-name">Jasneel Narayan</div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              Clear drawings, fast turnaround, and direct communication. The permit package
              was complete and the installer had no gaps to fill. We would use MIS again.
            </p>
            <div className="review-footer">
              <div className="review-avatar">M</div>
              <div className="review-name">Michael T</div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              The single line diagram and site plan were accurate and easy to follow. They
              also caught issues early that saved time during installation.
            </p>
            <div className="review-footer">
              <div className="review-avatar">S</div>
              <div className="review-name">Sarah K</div>
            </div>
          </article>
        </div>
      </section>



    </main>
  );
}
