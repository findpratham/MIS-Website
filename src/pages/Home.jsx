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
    valuesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const valuesRef = useRef(null);
const valuesInnerRef = useRef(null);

useEffect(() => {
  const section = valuesRef.current;
  const inner = valuesInnerRef.current;
  if (!section || !inner) return;

  // This is the real scroll container in most apps
  const scroller = document.scrollingElement || document.documentElement;

  let rafId = 0;

  const update = () => {
    rafId = 0;

    const rect = section.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const sectionCenter = rect.top + rect.height / 2;

    const t = (sectionCenter - viewportCenter) / viewportCenter;

    // Make it obvious first, then you can lower it
    const y = Math.max(-50, Math.min(50, -t * 80));
    inner.style.transform = `translate3d(0, ${y}px, 0)`;
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  };

  update();

  // Listen on window AND capture scroll events (works even for nested scrollers)
  window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  scroller.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    window.removeEventListener("scroll", onScroll, true);
    scroller.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}, []);

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
              <span>Why Mis</span>
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

        <div className="hero-right">
          <div className="sc-live" aria-label="Live Solar Calculator Preview">
            <div className="sc-live-top">
              {/* <div className="sc-live-title">Solar Calculator</div> */}
              {/* <div className="sc-live-pill">Try out our preparatory solar calculator ...</div> */}
              <NavLink to="/solar-calculator" className="sc-live-pill sc-live-pill-link">
                <span className="sc-live-pillLabel base">
                  Try out our preparatory solar calculator …
                </span>
                <span className="sc-live-pillLabel hover">→</span>
              </NavLink>
            </div> 

            <div className="sc-live-body">
              <div className="sc-live-row">
                <div className="sc-live-label">Property type</div>
                <div className="sc-live-value">Residential</div>
              </div>

              <div className="sc-live-row">
                <div className="sc-live-label">Monthly bill</div>
                <div className="sc-live-value sc-live-typing">$200<span className="sc-live-caret" /></div>
              </div>

              <div className="sc-live-row">
                <div className="sc-live-label">Roof area</div>
                <div className="sc-live-value">1,200 ft²</div>
              </div>

              <div className="sc-live-slider">
                <div className="sc-live-slider-top">
                  <span>System size</span>
                  <span className="sc-live-slider-num">8.4 kW</span>
                </div>
                <div className="sc-live-track">
                  <div className="sc-live-fill" />
                  <div className="sc-live-knob" />
                </div>
              </div>

              <div className="sc-live-metrics">
                <div className="sc-live-metric">
                  <div className="sc-live-metric-num">8.4 kW</div>
                  <div className="sc-live-metric-sub">Sizing</div>
                </div>
                <div className="sc-live-metric">
                  <div className="sc-live-metric-num">11,200</div>
                  <div className="sc-live-metric-sub">kWh / year</div>
                </div>
              </div>

              <div className="sc-live-status">
                <div className="sc-live-pulse" />
                <span>Calculating roof-specific estimate…</span>
              </div>

              {/* <NavLink to="/solar-calculator" className="sc-live-cta">
                <span className="sc-live-ctaLabel base">Open Solar Calculator</span>
                <span className="sc-live-ctaLabel hover">→</span>
              </NavLink> */}

            </div>
          </div>
        </div>

        
      </section>

      <section className="values" ref={valuesRef} aria-label="Our Values">
        <div className="values-parallax" ref={valuesInnerRef}>
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
          </div>
      </section>


      <section className="why-mis">
        <div className="why-mis-inner">
          <h2 className="why-mis-title">Why MIS</h2>

          <p className="why-mis-text">
            MIS exists to remove guesswork from solar decisions.
          </p>

          <p className="why-mis-text">
            Unlike traditional solar quotes that rely on rough assumptions or sales-driven
            estimates, MIS is built on real engineering data, roof-specific analysis, and
            system-level accuracy.
          </p>

          <p className="why-mis-text">
            We combine professional solar design, 3D modeling, and data-backed calculations
            to show what solar actually looks like on your property — before you commit to anything.
          </p>

          <p className="why-mis-text">
            Our tools are designed to give homeowners, businesses, and solar partners clarity
            upfront, reduce back-and-forth, and support better decisions with confidence.
          </p>

          <NavLink to="/solar-calculator" className="why-mis-btn">
            <span className="why-btn-label base">Check out our solar tool</span>
            <span className="why-btn-label hover">→</span>
          </NavLink>

          <div className="why-mis-divider" />

          <h3 className="why-mis-subtitle">Research &amp; Development at MIS</h3>

          <p className="why-mis-text">
            MIS Engineering specializes in research and development within the renewable energy
            sector. By partnering with our organization, companies gain access to a multidisciplinary
            engineering team capable of designing innovative prototypes that support the future
            of sustainable energy.
          </p>

          <p className="why-mis-text">
            With MIS, organizations can accelerate innovation in green energy technology and
            bring prototypes to market.
          </p>

          <h3 className="why-mis-subtitle">
            Solar Calculator – Plan Your Complete Solar Project
          </h3>

          <p className="why-mis-text">
            Use our calculator to plan your complete solar project in minutes with accurate
            system sizing, pricing, and performance estimates based on your property.
          </p>
        </div>
      </section>


      <section className="values" ref={valuesRef} aria-label="Our Values">
        <div className="values-parallax" ref={valuesInnerRef}>
          <div className="values-inner">
            <h2 className="values-title">Comprehensive Engineering, Design, and Procurement Solutions</h2>

            <div className="values-grid">
              {/* Card 1 */}
              <button type="button" className="flip-card" aria-label="Precision">
                <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div
                    className="flip-card-image"
                    style={{ backgroundImage: `url(${reviewsBg})` }}
                  />
                  <h3>Consultation & Free Proposals</h3>
                </div>

                  <div className="flip-card-back">
                    <h3>Consultation & Free Proposals</h3>
                    <p>
                    We provide free 3D solar proposals along with consulting services to guide clients through every stage of their solar project. From initial design to installation, we help ensure a smooth and informed process. Our proposals include shading analysis, energy production estimates, and ROI projections—clearly showing the long-term value of going solar.


                    </p>
                  </div>
                </div>
              </button>

              {/* Card 2 */}
              <button type="button" className="flip-card" aria-label="Innovation">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div
                      className="flip-card-image"
                      style={{ backgroundImage: `url(${reviewsBg})` }}
                    />
                    <h3>Electrical Single Line Diagram</h3>
                  </div>

                  <div className="flip-card-back">
                    <h3>Electrical Single Line Diagram</h3>
                    <p>
                    An Electrical Single Line Diagram (SLD) is a simplified schematic that shows the flow of electricity from the source to various loads. It highlights key components like inverters and breakers and is required for permitting, utility interconnection, and accessing solar rebates in most regions.
                    </p>
                  </div>
                </div>
              </button>


              {/* Card 3 */}
              <button type="button" className="flip-card" aria-label="Collaboration">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div
                      className="flip-card-image"
                      style={{ backgroundImage: `url(${reviewsBg})` }}
                    />
                    <h3>Elevation & Site Plans</h3>
                  </div>

                  <div className="flip-card-back">
                    <h3>Elevation & Site Plans</h3>
                    <p>
                    Site plans and elevation drawings show the detailed layout of rooftop solar systems, including panel placement, mounting structures, and electrical components. They account for roof dimensions, shading, and orientation to ensure optimal design. These drawings are required for building permits, inspections, and help installers follow code-compliant, accurate installations—setting the foundation for a successful solar project.
                    </p>
                  </div>
                </div>
              </button>

            </div>
            </div>
          </div>
      </section>



      

      {/* <section className="services-process">
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
      </section> */}

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
