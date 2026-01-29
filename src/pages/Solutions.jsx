import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Solutions.css";

// Assets (replace with your real files)
import heroVideo from "../assets/hero.mp4"; // optional
import demoResidential from "../assets/solutions.jpg";
import demoCommercial from "../assets/solutions.jpg";
import futuristicVideo from "../assets/hero.mp4";
import story1 from "../assets/CoverPage.jpg";
import story2 from "../assets/CoverPage.jpg";
import story3 from "../assets/CoverPage.jpg";


export default function Solutions() {
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
              <h3>Solar Process</h3>
              <p>From roof scan to install, keep it simple and trackable.</p>
            </div>

            <ol className="process">
              <li><span>1</span><div><b>Roof & Shade</b><p>Capture roof geometry and shading.</p></div></li>
              <li><span>2</span><div><b>System Design</b><p>Layout, inverter choice, and code checks.</p></div></li>
              <li><span>3</span><div><b>Pricing & Savings</b><p>Quote, payback, and financing options.</p></div></li>
              <li><span>4</span><div><b>Permit & Install</b><p>Permits, scheduling, install, inspection.</p></div></li>
            </ol>
          </div>

          {/* Our Solutions (description below) */}
          <div className="block">
            <div className="block-head">
              <h3>Our Solutions</h3>
              <p>Instant solar design, pricing, and savings — powered by your roof.</p>
            </div>

            <div className="grid-3">
              <div className="card">
                <h4>Instant Design</h4>
                <p>Auto-layout panels using roof geometry and constraints.</p>
              </div>
              <div className="card">
                <h4>Accurate Pricing</h4>
                <p>Pricing bands, incentives, and installation complexity built in.</p>
              </div>
              <div className="card">
                <h4>Savings Forecast</h4>
                <p>Payback, offset, and usage scenarios with clear assumptions.</p>
              </div>
            </div>
          </div>

          {/* Service section with product demo image */}
          <div className="block split">
            <div className="split-media">
              <img src={demoResidential} alt="Residential product demo" />
            </div>
            <div className="split-copy">
              <h3>Service Demo</h3>
              <p>
                Show a product walkthrough: roof scan → layout → quote → proposal.
                Use this area for a short video, GIF, or screenshots.
              </p>
              <div className="split-actions">
                <button className="mini">Watch Demo</button>
                <button className="mini secondary">See Sample Proposal</button>
              </div>
            </div>
          </div>

          {/* Success Stories slideshow */}
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
          </div>

          {/* Book Appointment */}
          <div className="block book">
            <div className="book-inner">
              <h3>Book Appointment</h3>
              <p>Pick a time. We’ll review your roof and send a plan.</p>
              <div className="book-actions">
                <button>Book Now</button>
                <Link to="/contact" className="link-btn">Contact Us</Link>
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
              <h3>Service Demo</h3>
              <p>Show commercial workflow: roof zoning → array layout → yield → ROI.</p>
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
