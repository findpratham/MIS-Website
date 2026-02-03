import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Partnerships.css";
import "../styles/Blog.css";
import heroVideo from "../assets/hero.mp4";



export default function Partnerships() {
  const partnerTypes = useMemo(
    () => [
      {
        title: "Installers",
        points: [
          "Faster design + permit support",
          "Clean handoff packages",
          "Quick revisions when site changes",
        ],
      },
      {
        title: "Developers",
        points: [
          "Feasibility + early yield support",
          "Code compliance focus",
          "Clear scopes and timelines",
        ],
      },
      {
        title: "EPCs",
        points: [
          "Standardized deliverables",
          "Coordination-ready sets",
          "RFI support during build",
        ],
      },
      {
        title: "Manufacturers",
        points: [
          "Engineering-backed spec guidance",
          "Field feedback loop",
          "Documentation support",
        ],
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        n: "01",
        title: "Intro call",
        text: "We learn your workflow, service area, and what you need to move faster.",
      },
      {
        n: "02",
        title: "Pilot project",
        text: "We run one job end-to-end with tight communication and clear deliverables.",
      },
      {
        n: "03",
        title: "Operating cadence",
        text: "We set handoff rules, response times, file naming, and a repeatable process.",
      },
      {
        n: "04",
        title: "Scale",
        text: "We expand volume and keep quality steady with checklists and templates.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "What do you need to start a pilot?",
        a: "A site address, basic roof info, utility bill if available, and your target timeline.",
      },
      {
        q: "Do you work with out-of-province partners?",
        a: "Yes. We can support remote workflows and coordinate across teams.",
      },
      {
        q: "How do revisions work?",
        a: "We track changes and return updated sets with a clear revision note and timestamp.",
      },
      {
        q: "Can you match our templates?",
        a: "Yes. We can align to your title blocks, naming, and deliverable checklist.",
      },
    ],
    []
  );

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="pt-page">
      {/* HERO */}

    
      <section className="Blog-hero">
        <video className="Blog-hero-video" src={heroVideo} autoPlay muted loop playsInline />
        <div className="solutions-hero-overlay" />
        <div className="solutions-hero-inner">
          <h1>Become our Partner today
          </h1>
          <p>Clean write-ups on engineering, solar workflows, and frontend UI.</p>

          {/* <div className="solutions-hero-actions">
            <button onClick={() => scrollTo(residentialRef)}>Residential</button>
            <button onClick={() => scrollTo(commercialRef)} className="secondary">Commercial</button>
            <button onClick={() => scrollTo(futuristicRef)} className="secondary">Futuristic</button>
          </div> */}
        </div>
      </section>

      <section className="pt-hero" aria-label="Partnerships hero">
        <div className="pt-heroInner">
          {/* <div className="pt-badge">Partnerships</div> */}

          <h1 className="pt-title">Powering Projects through Collaboration</h1>

          <p className="pt-subtitle">
            MIS partners with installers, developers, and EPC teams to deliver solar designs and
            documentation that are clear, compliant, and easy to build from.
          </p>

          <div className="pt-ctaRow">
            <a className="pt-btn pt-btnPrimary" href="#partner-form">
              Start a partnership
            </a>
            <NavLink className="pt-btn pt-btnGhost" to="/contact">
              Contact
            </NavLink>
          </div>

          <div className="pt-metrics" aria-label="Key partnership benefits">
            <div className="pt-metric">
              <div className="pt-metricTop">Clear deliverables</div>
              <div className="pt-metricText">Less back-and-forth during installs</div>
            </div>
            <div className="pt-metric">
              <div className="pt-metricTop">Fast response</div>
              <div className="pt-metricText">Tight feedback loops on revisions</div>
            </div>
            <div className="pt-metric">
              <div className="pt-metricTop">Compliance first</div>
              <div className="pt-metricText">Documentation that stands up to review</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE PARTNER WITH */}
      <section className="pt-section" aria-label="Partner types">
        <div className="pt-sectionHead">
          <h2 className="pt-h2">Who we work with</h2>
          <p className="pt-p">
            Pick a model that fits your pipeline. We can start with a pilot and scale once the
            workflow feels smooth.
          </p>
        </div>

        <div className="pt-grid4">
          {partnerTypes.map((t) => (
            <article key={t.title} className="pt-card">
              <h3 className="pt-h3">{t.title}</h3>
              <ul className="pt-list">
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="pt-section" aria-label="Process">
        <div className="pt-sectionHead">
          <h2 className="pt-h2">How we run a partnership</h2>
          <p className="pt-p">Simple steps. Clear ownership. No confusion.</p>
        </div>

        <div className="pt-steps">
          {steps.map((s) => (
            <div key={s.n} className="pt-step">
              <div className="pt-stepNum">{s.n}</div>
              <div className="pt-stepBody">
                <div className="pt-stepTitle">{s.title}</div>
                <div className="pt-stepText">{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="pt-section" id="partner-form" aria-label="Partnership form">
        <div className="pt-sectionHead">
          <h2 className="pt-h2">Start a partnership</h2>
          <p className="pt-p">Send the basics. We’ll reply with next steps.</p>
        </div>

        <div className="pt-formCard">
          <form
            className="pt-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Submitted. Hook this up to your backend/email provider.");
            }}
          >
            <div className="pt-formRow">
              <label className="pt-label">
                Name
                <input className="pt-input" name="name" type="text" required />
              </label>
              <label className="pt-label">
                Company
                <input className="pt-input" name="company" type="text" required />
              </label>
            </div>

            <div className="pt-formRow">
              <label className="pt-label">
                Email
                <input className="pt-input" name="email" type="email" required />
              </label>
              <label className="pt-label">
                Partner type
                <select className="pt-input" name="type" defaultValue="Installer">
                  <option>Installer</option>
                  <option>Developer</option>
                  <option>EPC</option>
                  <option>Manufacturer</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <div className="pt-formRow">
              <label className="pt-label pt-labelFull">
                What do you need help with?
                <textarea className="pt-textarea" name="message" rows={5} required />
              </label>
            </div>

            <div className="pt-formActions">
              <button className="pt-btn pt-btnPrimary" type="submit">
                Submit
              </button>
              <a className="pt-btn pt-btnGhost" href="#faq">
                View FAQ
              </a>
            </div>

            <p className="pt-formHint">
              Tip: If you already have a template checklist, mention it. We can match your workflow.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-section" id="faq" aria-label="FAQ">
        <div className="pt-sectionHead">
          <h2 className="pt-h2">FAQ</h2>
          <p className="pt-p">Quick answers to common questions.</p>
        </div>

        <div className="pt-faq">
          {faqs.map((f, idx) => {
            const open = openFaq === idx;
            return (
              <button
                key={f.q}
                type="button"
                className={`pt-faqItem ${open ? "is-open" : ""}`}
                onClick={() => setOpenFaq(open ? -1 : idx)}
                aria-expanded={open}
              >
                <div className="pt-faqQ">
                  <span>{f.q}</span>
                  <span className="pt-faqIcon">{open ? "—" : "+"}</span>
                </div>
                <div className="pt-faqA">{f.a}</div>
              </button>
            );
          })}
        </div>

        <div className="pt-bottomCTA">
          <div className="pt-bottomText">
            Ready to move from one-off work to a clean system?
          </div>
          <a className="pt-btn pt-btnPrimary" href="#partner-form">
            Start a partnership
          </a>
        </div>
      </section>
    </main>
  );
}
