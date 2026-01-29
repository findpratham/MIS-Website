import React, { useMemo, useState } from "react";
import "../styles/SolarCalculator.css";
import heroVideo from "../assets/hero.mp4";
import residentialBg from "../assets/SolarCalcualtorBG.jpg";
import commercialBg from "../assets/SolarCommercialBG.jpg";

const WARRANTY_YEARS = 25;
const DEFAULT_PANEL_WATT = 400;
const DEFAULT_PR = 0.8;
const DEFAULT_PSH = 3.5;
const DEFAULT_RATE = 0.14;
const DEFAULT_COST_PER_WATT = 2.75;
const PANEL_AREA_M2 = 2.0;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatMoney(n) {
  if (!isFinite(n)) return "$0";
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatNumber(n, digits = 0) {
  if (!isFinite(n)) return "0";
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

/** Small UI helper */
function ResultCard({ title, value, sub }) {
  return (
    <div className="sc-result-card">
      <div className="sc-result-title">{title}</div>
      <div className="sc-result-value">{value}</div>
      {sub ? <div className="sc-result-sub">{sub}</div> : null}
    </div>
  );
}

export default function SolarCalculator() {
  const [mode, setMode] = useState(null); // "res" | "com" | null

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Step control
  const [resStep, setResStep] = useState(0); // 0 location, 1 usage, 2 name, 3 loading, 4 results, 5 contact, 6 success
  const [comStep, setComStep] = useState(0); // 0 motivation, 1 contact, 2 success

  // Residential inputs
  const [location, setLocation] = useState("");
  const [usageType, setUsageType] = useState("kwh"); // "kwh" | "bill"
  const [monthlyKwh, setMonthlyKwh] = useState(900);
  const [monthlyBill, setMonthlyBill] = useState(180);
  const [rate, setRate] = useState(DEFAULT_RATE);

  const [peakSunHours, setPeakSunHours] = useState(DEFAULT_PSH);
  const [performanceRatio, setPerformanceRatio] = useState(DEFAULT_PR);
  const [panelWatt, setPanelWatt] = useState(DEFAULT_PANEL_WATT);
  const [costPerWatt, setCostPerWatt] = useState(DEFAULT_COST_PER_WATT);

  const [customerName, setCustomerName] = useState("");

  // Contact form (shared)
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  // Commercial motivation
  const motivations = [
    "30% Clean Technology Investment Tax Credit",
    "Meet ESG Targets Without Disrupting Operations",
    "Control Energy Costs and Reduce Operational Risk",
  ];
  const [selectedMotivation, setSelectedMotivation] = useState("");

  // Derived usage
  const derivedMonthlyKwh = useMemo(() => {
    // Update constraints 
    if (usageType === "kwh") return clamp(Number(monthlyKwh) || 0, 0, 100000);
    const bill = clamp(Number(monthlyBill) || 0, 0, 100000);
    const r = clamp(Number(rate) || 0, 0.0001, 10);
    return bill / r;
  }, [usageType, monthlyKwh, monthlyBill, rate]);

  const results = useMemo(() => {
    const annualKwh = derivedMonthlyKwh * 12;

    const psh = clamp(Number(peakSunHours) || 0, 0.1, 10);
    const pr = clamp(Number(performanceRatio) || 0, 0.5, 0.9);
    const systemKw = annualKwh / (psh * 365 * pr);

    const pw = clamp(Number(panelWatt) || 0, 540, 700);
    const systemW = systemKw * 1000;
    const panelCount = Math.ceil(systemW / pw);

    const neededArea = panelCount * PANEL_AREA_M2;

    const cpw = clamp(Number(costPerWatt) || 0, 1.0, 10.0);
    const estimatedPrice = systemW * cpw;

    const estimatedRebate = Math.min(5000, estimatedPrice * 0.1);

    return {
      annualKwh,
      systemKw,
      panelCount,
      neededArea,
      estimatedPrice,
      estimatedRebate,
    };
  }, [derivedMonthlyKwh, peakSunHours, performanceRatio, panelWatt, costPerWatt]);

  function resetAll() {
    setMode(null);
    setResStep(0);
    setComStep(0);
    setLocation("");
    setUsageType("kwh");
    setMonthlyKwh(900);
    setMonthlyBill(180);
    setRate(DEFAULT_RATE);
    setPeakSunHours(DEFAULT_PSH);
    setPerformanceRatio(DEFAULT_PR);
    setPanelWatt(DEFAULT_PANEL_WATT);
    setCostPerWatt(DEFAULT_COST_PER_WATT);
    setCustomerName("");

    setSelectedMotivation("");
    setContactName("");
    setContactPhone("");
    setContactEmail("");
    setContactMsg("");
    setIsSubmitting(false);
    setSubmitError("");
  }

  function startResidential() {
    resetAll();
    setMode("res");
    setResStep(0);
  }

  function startCommercial() {
    resetAll();
    setMode("com");
    setComStep(0);
  }

  function goEstimate() {
    if (!location.trim()) return;
    if (!customerName.trim()) return;

    setResStep(3);
    window.setTimeout(() => setResStep(4), 900);
  }

  async function saveLead(payload) {
    // IMPORTANT:
    // If your client uses Vite proxy, change this to "/api/solar-lead"
    // and set proxy in vite.config.js
    const res = await fetch("http://localhost:3001/api/solar-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.error || `Save failed (${res.status})`);
    }

    return data;
  }

  function buildPayload() {
    return {
      timestamp: new Date().toISOString(),
      mode,
      residential:
        mode === "res"
          ? {
              location,
              usage: {
                inputType: usageType,
                monthlyKwh: usageType === "kwh" ? Number(monthlyKwh) : null,
                monthlyBill: usageType === "bill" ? Number(monthlyBill) : null,
                ratePerKwh: usageType === "bill" ? Number(rate) : null,
                derivedMonthlyKwh: Number(derivedMonthlyKwh),
              },
              assumptions: {
                peakSunHours: Number(peakSunHours),
                performanceRatio: Number(performanceRatio),
                panelWatt: Number(panelWatt),
                costPerWatt: Number(costPerWatt),
                warrantyYears: WARRANTY_YEARS,
                panelAreaM2: PANEL_AREA_M2,
              },
              customerName,
              results: resStep >= 4 ? { ...results } : null,
            }
          : null,
      commercial:
        mode === "com"
          ? {
              motivation: selectedMotivation || null,
            }
          : null,
      contact: {
        fullName: contactName,
        phone: contactPhone,
        email: contactEmail,
        message: contactMsg,
      },
    };
  }

  async function submitContact(which) {
    if (!contactName.trim()) return;
    if (!contactPhone.trim()) return;
    if (!contactEmail.trim()) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const payload = buildPayload();
      await saveLead(payload);

      if (which === "res") setResStep(6);
      if (which === "com") setComStep(2);
    } catch (e) {
      console.error(e);
      setSubmitError(e?.message || "Could not save your request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`sc-page ${mode ? "sc-bg-active" : ""}`}>
      {mode && (
          <div
            className="sc-bg-image"
            style={{
              backgroundImage:
                mode === "res"
                  ? `url(${residentialBg})`
                  : `url(${commercialBg})`,
            }}
          />
        )}

    {mode && <div className="sc-bg-overlay" />}

  <div className="sc-content">
    <div className="sc-card">
      {/* entire calculator UI goes here */}
    </div>
        <div className="sc-container">
          {!mode && (
            <>
              <h2 className="sc-title">Solar Calculator</h2>
              <p className="sc-subtitle">
                Get a quick estimate. Final pricing and production depend on your roof and site.
              </p>
            </>
          )}
          {/* Mode selection */}
          {!mode && (
            <div className="sc-card sc-animate-in">
              <div className="sc-row">
              <button
                type="button"
                className="sc-btn sc-btn-primary sc-btn-sweepBlue"
                onClick={startResidential}
              >
                <span className="sc-btnLabel sc-btnLabel--base">Residential</span>
                <span className="sc-btnLabel sc-btnLabel--hover">→</span>
              </button>

              <button
                type="button"
                className="sc-btn sc-btn-ghost sc-btn-sweepBlue"
                onClick={startCommercial}
              >
                <span className="sc-btnLabel sc-btnLabel--base">Commercial</span>
                <span className="sc-btnLabel sc-btnLabel--hover"> →</span>
              </button>`

              </div>
            </div>
          )}

        {/* ===================== RESIDENTIAL FLOW ===================== */}
        {mode === "res" && (
          <div className="sc-section sc-animate-in">
            <div className="sc-card">
              <div className="sc-card-top">
                {/* <div className="sc-card-heading">Residential Estimate</div> */}
                <button
                  type="button"
                  className="sc-btn sc-btn-ghost sc-btn-sweepBlue sc-btn-icon"
                  onClick={resetAll}
                  aria-label="Back"
                >
                  <span className="sc-btnLabel sc-btnLabel--base">←</span>
                  <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                </button>

              </div>

              {/* Step 0: Location */}
              {resStep === 0 && (
                <div className="sc-step">
                  <p className="sc-text">
                    Let’s make your system production rate as accurate as possible—what’s your location?
                  </p>

                  <label className="sc-label">Location (City, Province/State, Country)</label>
                  <input
                    className="sc-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Kelowna, BC, Canada"
                  />

                  {/* <div className="sc-block">
                    <label className="sc-label">Peak sun hours (adjust if you know your area)</label>
                    <input
                      className="sc-range"
                      type="range"
                      min="2"
                      max="6"
                      step="0.1"
                      value={peakSunHours}
                      onChange={(e) => setPeakSunHours(Number(e.target.value))}
                    />
                    <div className="sc-muted">{peakSunHours} hours/day</div>
                  </div> */}

                  <div className="sc-actions">
                  <button
                    type="button"
                    className="sc-btn sc-btn-sweepBlue"
                    onClick={() => setResStep(1)}
                  >
                    <span className="sc-btnLabel sc-btnLabel--base">Next</span>
                    <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                  </button>
                  </div>
                </div>
              )}

              {/* Step 1: Usage */}
              {resStep === 1 && (
                <div className="sc-step">
                  <p className="sc-text">
                    To see how much you could save with solar, what’s your average monthly electricity usage?
                  </p>

                  <div className="sc-row sc-row-tight">
                    <button
                      type="button"
                      className={`sc-btn sc-btn-sweepBlue ${
                        usageType === "kwh" ? "sc-btn-primary" : "sc-btn-ghost"
                      }`}
                      onClick={() => setUsageType("kwh")}
                    >
                      <span className="sc-btnLabel sc-btnLabel--base">Enter kWh</span>
                      <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                    </button>

                    <button
                      type="button"
                      className={`sc-btn sc-btn-sweepBlue ${
                        usageType === "bill" ? "sc-btn-primary" : "sc-btn-ghost"
                      }`}
                      onClick={() => setUsageType("bill")}
                    >
                      <span className="sc-btnLabel sc-btnLabel--base">Monthly Bill</span>
                      <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                    </button>
                  </div>


                  {usageType === "kwh" ? (
                    <>
                      <label className="sc-label">Average monthly usage (kWh)</label>
                      <input
                        className="sc-input"
                        type="number"
                        min="0"
                        value={monthlyKwh}
                        onChange={(e) => setMonthlyKwh(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <label className="sc-label">Average monthly bill ($)</label>
                      <input
                        className="sc-input"
                        type="number"
                        min="0"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(e.target.value)}
                      />

                      <div className="sc-spacer" />

                      <label className="sc-label">Your electricity rate ($/kWh)</label>
                      <input
                        className="sc-input"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />

                      <div className="sc-muted">
                        Estimated monthly usage: <b>{formatNumber(derivedMonthlyKwh, 0)} kWh</b>
                      </div>
                    </>
                  )}

                  {/* <div className="sc-block">
                    <label className="sc-label">Performance ratio (losses)</label>
                    <input
                      className="sc-range"
                      type="range"
                      min="0.7"
                      max="0.85"
                      step="0.01"
                      value={performanceRatio}
                      onChange={(e) => setPerformanceRatio(Number(e.target.value))}
                    />
                    <div className="sc-muted">{performanceRatio}</div>
                  </div> */}

                  <div className="sc-actions">
                  <button
                    type="button"
                    className="sc-btn sc-btn-ghost sc-btn-sweepBlue"
                    onClick={() => setResStep(0)}
                  >
                    <span className="sc-btnLabel sc-btnLabel--base">Back</span>
                    <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                  </button>

                  <button
                    type="button"
                    className="sc-btn sc-btn-primary sc-btn-sweepBlue"
                    onClick={() => setResStep(2)}
                  >
                    <span className="sc-btnLabel sc-btnLabel--base">Next</span>
                    <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                  </button>

                  </div>

                </div>
              )}

              {/* Step 2: Name */}
              {resStep === 2 && (
                <div className="sc-step">
                  <p className="sc-text">
                    Almost done! Can we get your name to prepare your personalized estimate?
                  </p>

                  <label className="sc-label">Your name</label>
                  <input
                    className="sc-input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                  />

                  <div className="sc-actions">
                    <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setResStep(1)}>
                      Back
                    </button>
                    <button type="button" className="sc-btn sc-btn-primary" onClick={goEstimate}>
                      Estimate!
                    </button>
                  </div>

                  {(!location.trim() || !customerName.trim()) && (
                    <div className="sc-hint">Please enter your location and name to continue.</div>
                  )}
                </div>
              )}

              {/* Step 3: Loading */}
              {resStep === 3 && (
                <div className="sc-step">
                  <div className="sc-step-title">Estimating…</div>
                  <div className="sc-muted">
                    Building your estimate for <b>{customerName || "you"}</b> in <b>{location || "your area"}</b>.
                  </div>

                  <div className="sc-progress" aria-hidden="true">
                    <div className="sc-progress-bar" />
                  </div>
                </div>
              )}

              {/* Step 4: Results */}
              {resStep === 4 && (
                <div className="sc-step">
                  <div className="sc-step-title">Your results are ready!</div>
                  <div className="sc-muted">
                    Estimate for <b>{customerName}</b> • <span>{location}</span>
                  </div>

                  <div className="sc-grid">
                    <ResultCard
                      title="Number of Panel Modules (100% offset)"
                      value={`${formatNumber(results.panelCount)} panels`}
                      sub={`~${formatNumber(results.systemKw, 1)} kW system`}
                    />
                    <ResultCard
                      title="Estimated Rebate you can claim"
                      value={formatMoney(results.estimatedRebate)}
                      sub="Estimate only"
                    />
                    <ResultCard
                      title="Warranty Years"
                      value={`${WARRANTY_YEARS} years`}
                      sub="Typical product + performance"
                    />
                    <ResultCard
                      title="Estimated System Price"
                      value={formatMoney(results.estimatedPrice)}
                      sub={`Assumes ${formatMoney(costPerWatt)} per watt`}
                    />
                  </div>

                  <div className="sc-text sc-note">
                    Keep in mind your actual system may vary depending on roof conditions, nearby trees or buildings,
                    and how you plan to use your solar. For a personalized estimate and expert guidance, contact us
                    and we’ll tailor the perfect solution for you.
                  </div>

                  <div className="sc-actions">
                    <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setResStep(2)}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="sc-btn sc-btn-primary"
                      onClick={() => {
                        if (!contactName.trim()) setContactName(customerName);
                        setResStep(5);
                      }}
                    >
                      Contact
                    </button>
                  </div>

                  <div className="sc-footnote">
                    Extra details used: PSH {peakSunHours}/day • PR {performanceRatio} • Panel {panelWatt}W • Panel
                    area {PANEL_AREA_M2} m² each
                  </div>
                </div>
              )}

              {/* Step 5: Contact form */}
              {resStep === 5 && (
                <div className="sc-step">
                  <div className="sc-step-title">Contact form</div>

                  <div className="sc-form">
                    <div className="sc-form-full">
                      <label className="sc-label">Your full name</label>
                      <input
                        className="sc-input"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="sc-label">Phone number</label>
                      <input
                        className="sc-input"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="sc-label">Email</label>
                      <input
                        className="sc-input"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        type="email"
                      />
                    </div>

                    <div className="sc-form-full">
                      <label className="sc-label">Any messages you would like us to know</label>
                      <textarea
                        className="sc-textarea"
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sc-actions">
                    <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setResStep(4)}>
                      Back
                    </button>

                    <button
                      type="button"
                      className="sc-btn sc-btn-primary"
                      disabled={isSubmitting}
                      onClick={() => submitContact("res")}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>

                  {(!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) && (
                    <div className="sc-hint">Please fill in name, phone, and email.</div>
                  )}

                  {submitError && <div className="sc-error">{submitError}</div>}
                </div>
              )}

              {/* Step 6: Success */}
              {resStep === 6 && (
                <div className="sc-step">
                  <div className="sc-step-title">We’ve got your request!</div>
                  <div className="sc-text">
                    One of our solar experts will review your information and reach out shortly with a personalized
                    recommendation.
                  </div>

                  <div className="sc-actions">
                    <button type="button" className="sc-btn sc-btn-primary" onClick={resetAll}>
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== COMMERCIAL FLOW ===================== */}
        {mode === "com" && (
          <div className="sc-section sc-animate-in">
            <div className="sc-card">
              <div className="sc-card-top">
                <div className="sc-card-heading">Commercial Estimate</div>
                <button type="button" className="sc-btn sc-btn-ghost" onClick={resetAll}>
                  Back
                </button>
              </div>

              {/* Step 0: Motivation */}
              {comStep === 0 && (
                <div className="sc-step">
                  <p className="sc-text">What motivates you to go for solar?</p>

                  <div className="sc-stack">
                    {motivations.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`sc-btn ${selectedMotivation === m ? "sc-btn-primary" : "sc-btn-ghost"}`}
                        onClick={() => setSelectedMotivation(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="sc-text sc-note">
                    To ensure your estimate reflects how your business actually operates, our team reviews a few key
                    details before finalizing recommendations. Complete the form below and we’ll tailor the analysis
                    to your site and objectives.
                  </div>

                  <div className="sc-actions">
                    <button
                      type="button"
                      className="sc-btn sc-btn-primary"
                      onClick={() => {
                        if (!selectedMotivation) return;
                        setComStep(1);
                      }}
                    >
                      Continue
                    </button>
                  </div>

                  {!selectedMotivation && <div className="sc-hint">Please pick one option.</div>}
                </div>
              )}

              {/* Step 1: Contact form */}
              {comStep === 1 && (
                <div className="sc-step">
                  <div className="sc-step-title">Contact form</div>
                  <div className="sc-muted">
                    Selected: <b>{selectedMotivation}</b>
                  </div>

                  <div className="sc-form">
                    <div className="sc-form-full">
                      <label className="sc-label">Your full name</label>
                      <input
                        className="sc-input"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="sc-label">Phone number</label>
                      <input
                        className="sc-input"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="sc-label">Email</label>
                      <input
                        className="sc-input"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        type="email"
                      />
                    </div>

                    <div className="sc-form-full">
                      <label className="sc-label">Any messages you would like us to know</label>
                      <textarea
                        className="sc-textarea"
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sc-actions">
                    <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setComStep(0)}>
                      Back
                    </button>

                    <button
                      type="button"
                      className="sc-btn sc-btn-primary"
                      disabled={isSubmitting}
                      onClick={() => submitContact("com")}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>

                  {(!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) && (
                    <div className="sc-hint">Please fill in name, phone, and email.</div>
                  )}

                  {submitError && <div className="sc-error">{submitError}</div>}
                </div>
              )}

              {/* Step 2: Success */}
              {comStep === 2 && (
                <div className="sc-step">
                  <div className="sc-step-title">We’ve got your request!</div>
                  <div className="sc-text">
                    One of our solar experts will review your information and reach out shortly with a personalized
                    recommendation.
                  </div>

                  <div className="sc-actions">
                    <button type="button" className="sc-btn sc-btn-primary" onClick={resetAll}>
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Small helper for dev / design */}
        {mode === "res" && resStep === 4 && (
          <div className="sc-dev-note">
            Optional: If you want, I can turn this into your site’s design system (CSS classes, animations, and your
            brand fonts/colors) and wire the contact form to EmailJS, Formspree, or your backend.
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
