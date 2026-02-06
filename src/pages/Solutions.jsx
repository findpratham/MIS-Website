import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Solutions.css";
import "../styles/Home.css";
import { NavLink } from "react-router-dom";


// Assets (replace with your real files)
import heroVideo from "../assets/hero.mp4"; // optional
import demoResidential from "../assets/EngineeringDrawingSample.jpg";
import demoCommercial from "../assets/solutions.jpg";
import futuristicVideo from "../assets/hero.mp4";
import story1 from "../assets/CoverPage.jpg";
import story2 from "../assets/CoverPage.jpg";
import story3 from "../assets/CoverPage.jpg";
import SolarProcess from "../assets/SolarDesignProcess.jpg";
import reviewsBg from "../assets/CoverPage.jpg";



import solutionsImage from "../assets/solutions.jpg";
import processImage from "../assets/flowchart.jpg";
import appoinmentImage from "../assets/Appointment.jpg";

export default function Solutions() {

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
  
  const residentialRef = useRef(null);
  const commercialRef = useRef(null);
  const futuristicRef = useRef(null);
  
  const stories = [
    {
      id: "case-1",
      title: "Kelowna Roof — 8.2 kW",
      note: "Fast install. Clear quote.",
      image: story1,
    },
    {
      id: "case-2",
      title: "Vancouver Home — 10.4 kW",
      note: "Great savings forecast.",
      image: story2,
    },
    {
      id: "case-3",
      title: "Surrey Roof — 6.8 kW",
      note: "Clean proposal + timeline.",
      image: story3,
    },
  ];
  

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="solutions">
      {/* HERO */}
      <section className="solutions-hero">
        <video className="solutions-hero-video" src={heroVideo} autoPlay muted loop playsInline />
        <div className="solutions-hero-overlay" />
        <div className="solutions-hero-inner">
          <h1>Solar Solutions</h1>
          <p>Instant solar design, pricing, and savings — powered by your roof.</p>

          <div className="solutions-hero-actions">
            <button onClick={() => scrollTo(residentialRef)}>Residential</button>
            <button onClick={() => scrollTo(commercialRef)} className="secondary">Commercial</button>
            <button onClick={() => scrollTo(futuristicRef)} className="secondary">Futuristic</button>
          </div>
        </div>
      </section>

      {/* RESIDENTIAL */}
      <section className="solutions-section" ref={residentialRef}>
        <div className="solutions-section-inner">
          <header className="solutions-section-header">
            <h2>Residential Rooftop Solar Solutions</h2>
            <p>Fast estimates, clean designs, and clear next steps for homeowners.</p>
          </header>

          {/* Solar Calculator */}
          {/* <div className="block">
            <div className="block-head">
              <h3>Solar Calculator</h3>
              <p>Enter your address, bill, and roof details. Get sizing + savings.</p>
            </div>

            Placeholder: embed your calculator, map, or form
            <div className="card placeholder">
              <p>Calculator UI goes here (address search, bill, roof area, quote output).</p>
              <button className="mini">Launch Calculator</button>
            </div>
          </div> */}

          {/* Solar Process */}
          <div className="block">
            <div className="block-head">
              <h3>The Solar Design Process</h3>
              {/* <p>From roof scan to install, keep it simple and trackable.</p> */}
            </div>

            <ol className="process">
              <li><span>1</span><div><b>Roof & Shade</b><p>Capture roof geometry and shading.</p></div></li>
              <li><span>2</span><div><b>System Design</b><p>Layout, inverter choice, and code checks.</p></div></li>
              <li><span>3</span><div><b>Pricing & Savings</b><p>Quote, payback, and financing options.</p></div></li>
              <li><span>4</span><div><b>Permit & Install</b><p>Permits, scheduling, install, inspection.</p></div></li>
            </ol>
          </div>

            {/* Process Image */}
            <div className="process-image-wrap">
              <img
                src={SolarProcess}
                alt="Solar design and installation workflow"
                className="process-image"
              />
            </div>





          <section className="values" ref={valuesRef} aria-label="Our Values">
              <div className="values-parallax" ref={valuesInnerRef}>
                <div className="values-inner">
                  <h2 className="values-title">Comprehensive Engineering, Design, and Procurement Solutions</h2>

                  <div className="values-grid">
                    {/* Card 1 */}
                    <button type="button" className="Section-cards" aria-label="Precision">
                      <div className="Section-cards-inner">
                      <div className="Section-cards-front">
                        <div
                          className="Section-cards-image"
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
                    <button type="button" className="Section-cards" aria-label="Innovation">
                      <div className="Section-cards-inner">
                        <div className="Section-cards-front">
                          <div
                            className="Section-cards-image"
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
                    <button type="button" className="Section-cards" aria-label="Collaboration">
                      <div className="Section-cards-inner">
                        <div className="Section-cards-front">
                          <div
                            className="Section-cards-image"
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


          {/* Service section with product demo image */}
          <div className="block split">
            <div className="split-media">
              <img src={demoResidential} alt="Residential product demo" />
            </div>
            <div className="split-copy">
              <h3>How We Engineer Your System</h3>
              <p>
              Every solar system we design is backed by detailed engineering drawings tailored to the site, structure, and local codes. See our sample, redacted diagrams that represent the level of detail our clients receive before a single panel is installed.
              </p>
              <div className="split-actions">
                <button className="mini">View Sample Diagram</button>
                <button className="mini secondary">See Our Engineering Process</button>
              </div>
            </div>
          </div>

          {/* Success Stories slideshow
          <div className="block">
            <div className="block-head">
              <h3>Success Stories</h3>
              <p>Google reviews and project wins. Click a card to open the story post.</p>
            </div>

            <div className="stories">
            {stories.map((s) => (
                <Link key={s.id} to={`/blog/${s.id}`} className="story-card">
                <div
                    className="story-img"
                    style={{ backgroundImage: `url(${s.image})` }}
                    aria-hidden="true"
                />
                <div className="story-copy">
                    <b>{s.title}</b>
                    <p>{s.note}</p>
                    <span>Read story →</span>
                </div>
                </Link>
            ))}
            </div>
          </div> */}

          {/* Book Appointment */}
          <div className="block book">
            <div className="book-inner">
              <h3>Book Appointment</h3>
              <p>Pick a time. We’ll review your roof and send a plan.</p>
              <div className="book-actions">
                {/* <button>Book Now</button> */}
                <NavLink to="https://calendly.com/andrewyu-metricinnovative/30min" className="link-btn">Book Now</NavLink>
              </div>

              {/* Placeholder for Calendly / booking widget */}
              <div className="card placeholder">
                <p>Booking widget goes here (Calendly or your own form).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMERCIAL */}
      <section className="solutions-section alt" ref={commercialRef}>
        <div className="solutions-section-inner">
          <header className="solutions-section-header">
            <h2>Commercial Rooftop Solar Solutions</h2>
            <p>Rooftop systems for warehouses, retail, and offices with clear ROI.</p>
          </header>

          <div className="block">
            <div className="block-head">
              <h3>Our Solutions</h3>
              <p>Design, pricing, and savings with commercial constraints in mind.</p>
            </div>

            <div className="grid-3">
              <div className="card">
                <h4>Layout at Scale</h4>
                <p>Large roofs, setbacks, fire code pathways, and load checks.</p>
              </div>
              <div className="card">
                <h4>Utility + Demand</h4>
                <p>Model usage patterns and peak demand impact.</p>
              </div>
              <div className="card">
                <h4>Reporting</h4>
                <p>Simple executive summaries for approval and financing.</p>
              </div>
            </div>
          </div>

          <div className="block split">
            <div className="split-media">
              <img src={demoCommercial} alt="Commercial product demo" />
            </div>
            <div className="split-copy">
              <h3>The Problem</h3>
              <p>Businesses today are under growing pressure from rising and unpredictable energy costs, tighter capital scrutiny, and increasing ESG accountability—all while maintaining reliable operations. Utility dependence leaves companies exposed to price volatility and outages, making energy a strategic risk rather than a fixed expense. At the same time, sustainability expectations now require measurable, defensible action, not marketing claims. These challenges are driving businesses toward tax-efficient solar investments, ESG-aligned system design, and solar-plus-battery solutions that deliver cost control, resilience, and long-term value.
              </p>
              <div className="split-actions">
                <button className="mini">Watch Demo</button>
                <button className="mini secondary">Download Spec Sheet</button>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* FUTURISTIC */}
      <section className="solutions-section" ref={futuristicRef}>
        <div className="solutions-section-inner">
          <header className="solutions-section-header">
            <h2>Futuristic Solar Solutions</h2>
            <p>Highlight innovative and future-forward solar technologies.</p>
          </header>

          <div className="block split">
            <div className="split-media">
              <video className="media-video" src={futuristicVideo} autoPlay muted loop playsInline />
            </div>
            <div className="split-copy">
              <h3>Innovation Highlights</h3>
              <ul className="bullets">
                <li>Smart inverters and grid services</li>
                <li>Battery + solar optimization</li>
                <li>Next-gen panel tech and materials</li>
                <li>AI-assisted design and monitoring</li>
              </ul>
              <button className="mini">View Partnerships</button>
            </div>
          </div>

          <div className="block">
            <div className="block-head">
              <h3>Optional Case Studies / Partnerships</h3>
              <p>Add logos, short blurbs, or linked case studies.</p>
            </div>

            <div className="grid-3">
              <div className="card placeholder"><p>Partner / Case Study 1</p></div>
              <div className="card placeholder"><p>Partner / Case Study 2</p></div>
              <div className="card placeholder"><p>Partner / Case Study 3</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
