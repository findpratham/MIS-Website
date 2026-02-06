import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Careers.css";
import heroVideo from "../assets/hero.mp4";

export default function Careers() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const valuesRef = useRef(null);
  const valuesInnerRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const to = "andrewyu@metricinnovative.com";
    const subject = encodeURIComponent("Careers Inquiry - MIS");
    const body = encodeURIComponent(
      `Email: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="careersSimple">

        {/* VALUES SECTION */}
      <section className="values" ref={valuesRef} aria-label="Our Values">
        <div className="values-parallax" ref={valuesInnerRef}>
          <div className="values-inner">
            <h2 className="values-title">MIS Values</h2>

            <div className="values-grid">
              {/* Precision */}
              <button type="button" className="flip-card" aria-label="Precision">
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front"
                    style={{ backgroundImage: "url(/assets/precision.jpg)" }}
                  >
                    <h3>Precision</h3>
                  </div>

                  <div className="flip-card-back">
                    <h3>Precision</h3>
                    <p>
                      We sweat the details. From drawings to installs, accuracy
                      and clarity define our work.
                    </p>
                  </div>
                </div>
              </button>

              {/* Innovation */}
              <button type="button" className="flip-card" aria-label="Innovation">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <h3>Innovation</h3>
                  </div>

                  <div className="flip-card-back">
                    <h3>Innovation</h3>
                    <p>
                      We improve how solar gets done—better tools, cleaner processes,
                      and smarter execution.
                    </p>
                  </div>
                </div>
              </button>

              {/* Collaboration */}
              <button type="button" className="flip-card" aria-label="Collaboration">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <h3>Collaboration</h3>
                  </div>

                  <div className="flip-card-back">
                    <h3>Collaboration</h3>
                    <p>
                      We communicate openly and work as one team,
                      from first call to final inspection.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HERO CARD */}
      <section className="careersCard" aria-label="Careers">
        <h1 className="careersTitle">Join MIS</h1>

        <p className="careersText">
          We design and deliver solar projects that are clean, compliant, and built to last.
          If you care about quality, ownership, and work you can be proud of, you’ll feel at home here.
        </p>

        <div className="careersHighlights">
          <div className="careersPill">Real projects, real impact</div>
          <div className="careersPill">High standards, low drama</div>
          <div className="careersPill">Fast learning, strong support</div>
        </div>

        <p className="careersText careersTextSmall">
          You’ll work with people who communicate clearly, respect the craft, and
          take responsibility from design through delivery.
        </p>

        <NavLink className="careersRoleLink" to="https://www.metric-innovative-solutions.com/sales-consultant">
          Solar Sales Consultant (High Commission)
        </NavLink>

        <p className="careersText careersTextSmall">
          Have a question or want to apply? Send us a note below.
        </p>

        {/* CONTACT FORM */}
        <form className="careersForm" onSubmit={onSubmit}>
          <label className="careersLabel" htmlFor="careersEmail">
            Email<span className="req">*</span>
          </label>
          <input
            id="careersEmail"
            className="careersInput"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="careersLabel" htmlFor="careersMessage">
            Message<span className="req">*</span>
          </label>
          <textarea
            id="careersMessage"
            className="careersTextarea"
            placeholder="Tell us a bit about yourself"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button className="careersSubmit" type="submit">
            Submit
          </button>
        </form>
      </section>

      
    </main>
  );
}
