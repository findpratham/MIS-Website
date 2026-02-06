import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", text: "" });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    // Placeholder submit. Replace with your API call.
    // Example: await fetch("/api/contact", { method:"POST", headers:{...}, body: JSON.stringify(form) })
    setStatus({ type: "success", text: "Message ready. Hook this to your backend to send it." });
  }

  return (
    <main className="contact">
      <header className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-top">
            <Link className="contact-back" to="/">← Back</Link>
          </div>

          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Tell us about your project. We’ll reply with next steps.
          </p>

          <div className="contact-grid">
            {/* FORM */}
            <section className="contact-card contact-card--form">
              <div className="contact-card-head">
                <h2>Send a message</h2>
                <p>Share your address and a rough monthly bill if you want a faster estimate.</p>
              </div>

              <form className="contact-form" onSubmit={onSubmit}>
                <div className="contact-row">
                  <label className="contact-field">
                    <span>Name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@email.com"
                    //   andrewyu@metricinnovative.com
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <div className="contact-row">
                  <label className="contact-field">
                    <span>Phone (optional)</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="(555) 555-5555"
                      autoComplete="tel"
                    />
                  </label>

                  <label className="contact-field">
                    <span>Topic</span>
                    <select name="topic" value={form.topic} onChange={onChange}>
                      <option>General</option>
                      <option>Residential Solar</option>
                      <option>Commercial Solar</option>
                      <option>Partnerships</option>
                      <option>Support</option>
                    </select>
                  </label>
                </div>

                <label className="contact-field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="What are you trying to build? Include city + roof type if you know it."
                    rows={6}
                    required
                  />
                </label>

                {status.text ? (
                  <div className={`contact-alert ${status.type === "success" ? "ok" : "bad"}`}>
                    {status.text}
                  </div>
                ) : null}

                <div className="contact-actions">
                  <button className="contact-btn contact-btn--primary" type="submit">
                    <span className="btn-base">Send</span>
                    <span className="btn-hover">→</span>
                  </button>

                  <Link className="contact-btn contact-btn--ghost" to="/solutions">
                    <span className="btn-base">View Solutions</span>
                    <span className="btn-hover">→</span>
                  </Link>
                </div>

                <p className="contact-fineprint">
                  By sending, you agree we can contact you about this request.
                </p>
                <p className="contact-fineprint">
                If you have any questions or issues submitting this form, please email andrewyu@metricinnovative.com
                or call us at 604-819-4048.
                </p>
              </form>
            </section>

            {/* INFO */}
            <aside className="contact-card contact-card--info">
              <div className="contact-card-head">
                <h2>Reach us</h2>
                <p>Use these details, or send a message on the left.</p>
              </div>

              <div className="contact-info">
                <div className="info-item">
                  <div className="info-k">Email</div>
                  <div className="info-v">
                    <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-k">Phone</div>
                  <div className="info-v">
                    <a href="tel:+16045551234">+1 (604) 555-1234</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-k">Hours</div>
                  <div className="info-v">Mon–Fri, 9am–5pm</div>
                </div>

                <div className="info-item">
                  <div className="info-k">Service Area</div>
                  <div className="info-v">BC: Kelowna • Vancouver • Surrey</div>
                </div>
              </div>

              <div className="contact-miniCard">
                <h3>What to include</h3>
                <ul>
                  <li>City + property type</li>
                  <li>Monthly electricity bill</li>
                  <li>Roof material and age</li>
                  <li>Timeline and budget range</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </header>
    </main>
  );
}
