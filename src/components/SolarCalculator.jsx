import React, { useMemo, useState } from "react";
import "../styles/SolarCalculator.css";
import residentialBg from "../assets/SolarCalcualtorBG.jpg";
import commercialBg from "../assets/SolarCommercialBG.jpg";


/* ===============================
   BC City Production Ratios Logic
   (from your provided file)
================================ */

const CITY_PRODUCTION_RATIOS = {
  "100 Mile House": 1147,
  "108 Mile Ranch": 1147,
  "70 Mile House": 1151,
  Abbotsford: 1013,
  "Adams Lake": 1146,
  Aldergrove: 1017,
  "Alert Bay": 967,
  Alexandria: 1113,
  "Alexis Creek": 1116,
  "Alkali Lake": 1145,
  "Anahim Lake": 1070,
  Anglemont: 1123,
  Argenta: 1152,
  Armstrong: 1144,
  Ashcroft: 1178,
  "Aspen Grove": 1136,
  Atlin: 967,
  Australian: 1111,
  Avola: 1111,
  Balfour: 1145,
  Bamfield: 968,
  Barrière: 1155,
  "Baynes Lake": 1241,
  "Bear Lake": 1057,
  Beaverdell: 1134,
  "Bella Coola": 934,
  "Big Bay": 962,
  "Birch Island": 1146,
  Birken: 1096,
  "Blind Bay": 1138,
  "Blue River": 1095,
  "Blueberry Creek": 1130,
  "Boston Bar": 1080,
  "Bowen Bay": 1020,
  Brackendale: 975,
  Brisco: 1213,
  "Britannia Beach": 975,
  Buick: 1151,
  Burnaby: 1008,
  "Burns Lake": 1024,
  Burton: 1123,
  "Cache Creek": 1172,
  "Campbell River": 1010,
  "Canal Flats": 1238,
  Castlegar: 1126,
  Cawston: 1154,
  Cedar: 1076,
  "Central Saanich": 1098,
  "Charlie Lake": 1169,
  Chase: 1151,
  Chemainus: 1072,
  Cherryville: 1127,
  Chetwynd: 1142,
  Chilliwack: 1007,
  "Christian Valley": 1109,
  "Christina Lake": 1136,
  Clearwater: 1144,
  Clinton: 1156,
  "Coal Harbour": 935,
  "Cobble Hill": 1075,
  Coldstream: 1146,
  Collettville: 1153,
  Comox: 1045,
  "Cooper Creek": 1153,
  Coquitlam: 992,
  Courtenay: 1042,
  "Cowichan Bay": 1077,
  Cranbrook: 1226,
  "Crawford Bay": 1153,
  Creston: 1179,
  "Cultus Lake": 1006,
  Cumberland: 1036,
  "Dawson Creek": 1177,
  "Dease Lake": 966,
  "Decker Lake": 1022,
  "Deer Park": 1140,
  Delta: 1049,
  "Denman Island": 1045,
  "Dogwood Valley": 1027,
  Donald: 1170,
  "Douglas Lake": 1156,
  Duncan: 1067,
  Edgewater: 1219,
  Edgewood: 1121,
  Elkford: 1242,
  Elko: 1236,
  Enderby: 1140,
  Errington: 1068,
  Esquimalt: 1106,
  "Fairmont Hot Springs": 1232,
  Falkland: 1149,
  "False Bay": 1057,
  "Fanny Bay": 1041,
  Fauquier: 1119,
  Ferndale: 1068,
  Fernie: 1240,
  Field: 1185,
  "Forest Grove": 1141,
  "Fort Babine": 984,
  "Fort Fraser": 1043,
  "Fort Langley": 998,
  "Fort Nelson": 1083,
  "Fort St. James": 1050,
  "Fort St. John": 1172,
  "Fraser Lake": 1036,
  Fruitvale: 1133,
  "Fulford Harbour": 1088,
  Ganges: 1087,
  "Garden Bay": 1014,
  Genelle: 1129,
  "Germansen Landing": 1032,
  Gibsons: 1018,
  "Gillies Bay": 1049,
  Gingolx: 835,
  Gitwinksihlkw: 891,
  "Gold River": 967,
  Golden: 1187,
  "Grand Forks": 1135,
  Granisle: 1002,
  Grasmere: 1243,
  Greenwood: 1125,
  Grindrod: 1136,
  Hagensborg: 954,
  "Harrison Hot Springs": 997,
  "Harrison Mills": 991,
  Harrogate: 1205,
  Hatzic: 1007,
  Hazelton: 966,
  Hedley: 1147,
  "Heriot Bay": 1008,
  "Highlands-District of": 1083,
  Hixon: 1081,
  "Honeymoon Bay": 1009,
  Hope: 1021,
  "Hornby Island": 1049,
  Horsefly: 1127,
  Hosmer: 1243,
  Houston: 1011,
  "Hudson's Hope": 1131,
  Huntingdon: 1022,
  Invermere: 1225,
  Jaffray: 1241,
  Kaleden: 1149,
  Kamloops: 1171,
  Kaslo: 1148,
  "Kelly Lake": 1170,
  Kelowna: 1150,
  Kemano: 874,
  Kent: 994,
  Keremeos: 1152,
  Kersley: 1106,
  Kimberley: 1215,
  Kingfisher: 1123,
  Kingsgate: 1183,
  Kispiox: 965,
  "Kitamaat Village": 848,
  Kitchener: 1189,
  Kitimat: 855,
  Kitseguecla: 959,
  Kitwanga: 949,
  Krestova: 1124,
  "Lac la Hache": 1146,
  Ladner: 1071,
  Ladysmith: 1066,
  Laidlaw: 1010,
  "Lake Country- District of": 1143,
  "Lake Cowichan": 1022,
  "Lake Errock": 987,
  "Lakelse Lake": 890,
  "Lakeview Heights": 1152,
  "Lang Bay": 1029,
  Langford: 1093,
  Langley: 1009,
  Lantzville: 1077,
  "Lax Kw'alaams": 816,
  Laxgaltsap: 859,
  Lazo: 1047,
  Likely: 1118,
  Lillooet: 1153,
  "Lions Bay": 977,
  "Little Fort": 1154,
  "Logan Lake": 1158,
  "Lone Butte": 1132,
  "Lower Post": 976,
  Lumby: 1136,
  Lund: 1034,
  Lytton: 1137,
  Mackenzie: 1063,
  Malakwa: 1110,
  "Mansons Landing": 1020,
  "Maple Ridge": 988,
  Mara: 1132,
  Marktosis: 956,
  Masset: 892,
  Mayne: 1099,
  McBride: 1142,
  "McLeod Lake": 1058,
  "McLure": 1159,
  "Meadow Creek": 1153,
  Merritt: 1155,
  Merville: 1037,
  Midway: 1138,
  "Mill Bay": 1082,
  Mission: 1002,
  "Moberly Lake": 1134,
  "Monte Creek": 1163,
  "Monte Lake": 1149,
  Montrose: 1131,
  Moyie: 1197,
  Nakusp: 1127,
  Nanaimo: 1081,
  "Nanoose Bay": 1069,
  Naramata: 1150,
  Nelson: 1131,
  Nelway: 1126,
  "New Aiyansh": 903,
  "New Denver": 1122,
  "New Hazelton": 967,
  "New Westminster": 1014,
  "North Bend": 1085,
  "North Cowichan": 1060,
  "North Saanich": 1095,
  "North Vancouver": 952,
  "Oak Bay": 1113,
  "Okanagan Falls": 1152,
  Olalla: 1146,
  Oliver: 1153,
  Osoyoos: 1153,
  Oyama: 1149,
  Parksville: 1068,
  Peachland: 1153,
  Pemberton: 1059,
  "Pender Island": 1102,
  Penticton: 1151,
  "Pitt Meadows": 991,
  "Port Alberni": 1020,
  "Port Coquitlam": 993,
  "Port Moody": 997,
  "Powell River": 1035,
  "Prince George": 1072,
  Princeton: 1139,
  "Qualicum Beach": 1063,
  Quesnel: 1099,
  "Radium Hot Springs": 1222,
  Revelstoke: 1107,
  Richmond: 1045,
  Rossland: 1104,
  Saanich: 1099,
  "Salmon Arm": 1139,
  "Salt Spring Island": 1088,
  Saturna: 1096,
  Savona: 1175,
  Sechelt: 1021,
  Sooke: 1073,
  Squamish: 976,
  Surrey: 1014,
  Terrace: 902,
  Tofino: 957,
  Trail: 1137,
  Tsawwassen: 1091,
  Ucluelet: 960,
  Valemount: 1158,
  Vancouver: 1025,
  Vernon: 1148,
  Victoria: 1110,
  "West Vancouver": 983,
  "White Rock": 1057,
  Whistler: 1019,
  "Williams Lake": 1136,
  Windermere: 1226,
  Yale: 1038,
  Yarrow: 988,
};

const DEFAULT_CITY_RATIO = 1077.461749;
const PANEL_KW = 0.54;
const PRICE_PER_WATT = 3;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatMoney(n) {
  if (!isFinite(n)) return "$0";
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatNumber(n, digits = 0) {
  if (!isFinite(n)) return "0";
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function getSiteDerate(hasSouthernObstruction) {
  return hasSouthernObstruction ? 0.85 : 0.9;
}

function calculateSolarSystem({ annualLoadKwh, selectedCity, hasSouthernObstruction }) {
  const rCity = CITY_PRODUCTION_RATIOS[selectedCity] ?? DEFAULT_CITY_RATIO;
  const kSite = getSiteDerate(hasSouthernObstruction);

  if (!annualLoadKwh || !rCity) return null;

  const panelCount = Math.ceil(annualLoadKwh / (PANEL_KW * rCity * kSite));
  const systemPrice = panelCount * PANEL_KW * 1000 * PRICE_PER_WATT;

  return { panelCount, systemPrice, rCity, kSite };
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

  const [resStep, setResStep] = useState(0);
  const [comStep, setComStep] = useState(0);

  // Residential inputs
  const [selectedCity, setSelectedCity] = useState("");
  const [hasSouthernObstruction, setHasSouthernObstruction] = useState(false);

  const [usageType, setUsageType] = useState("kwh"); // "kwh" | "bill"
  const [monthlyKwh, setMonthlyKwh] = useState(900);
  const [monthlyBill, setMonthlyBill] = useState(180);
  const [rate, setRate] = useState(0.14);

  const [customerName, setCustomerName] = useState("");

  // Contact form (shared)
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  const motivations = [
    "30% Clean Technology Investment Tax Credit",
    "Meet ESG Targets Without Disrupting Operations",
    "Control Energy Costs and Reduce Operational Risk",
  ];
  const [selectedMotivation, setSelectedMotivation] = useState("");

  // Derived monthly kWh
  const derivedMonthlyKwh = useMemo(() => {
    if (usageType === "kwh") return clamp(Number(monthlyKwh) || 0, 0, 100000);

    const bill = clamp(Number(monthlyBill) || 0, 0, 100000);
    const r = clamp(Number(rate) || 0, 0.0001, 10);
    return bill / r;
  }, [usageType, monthlyKwh, monthlyBill, rate]);

  // ✅ Calculations happen here
  const results = useMemo(() => {
    const annualLoadKwh = derivedMonthlyKwh * 12;

    const calc = calculateSolarSystem({
      annualLoadKwh,
      selectedCity: selectedCity || "Other",
      hasSouthernObstruction,
    });

    if (!calc) {
      return {
        annualLoadKwh,
        panelCount: 0,
        systemPrice: 0,
        rCity: DEFAULT_CITY_RATIO,
        kSite: getSiteDerate(hasSouthernObstruction),
      };
    }

    return {
      annualLoadKwh,
      panelCount: calc.panelCount,
      systemPrice: calc.systemPrice,
      rCity: calc.rCity,
      kSite: calc.kSite,
    };
  }, [derivedMonthlyKwh, selectedCity, hasSouthernObstruction]);

  function resetAll() {
    setMode(null);
    setResStep(0);
    setComStep(0);

    setSelectedCity("");
    setHasSouthernObstruction(false);

    setUsageType("kwh");
    setMonthlyKwh(900);
    setMonthlyBill(180);
    setRate(0.14);

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
    if (!selectedCity.trim()) return;
    if (!customerName.trim()) return;

    setResStep(3);
    window.setTimeout(() => setResStep(4), 900);
  }

  async function saveLead(payload) {
    // If using Vite proxy: change to "/api/solar-lead"
    const res = await fetch("http://localhost:3001/api/solar-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Save failed (${res.status})`);
    return data;
  }

  function buildPayload() {
    return {
      timestamp: new Date().toISOString(),
      mode,
      residential:
        mode === "res"
          ? {
              selectedCity,
              hasSouthernObstruction,
              usage: {
                inputType: usageType,
                monthlyKwh: usageType === "kwh" ? Number(monthlyKwh) : null,
                monthlyBill: usageType === "bill" ? Number(monthlyBill) : null,
                ratePerKwh: usageType === "bill" ? Number(rate) : null,
                derivedMonthlyKwh: Number(derivedMonthlyKwh),
              },
              customerName,
              results: resStep >= 4 ? { ...results } : null,
            }
          : null,
      commercial: mode === "com" ? { motivation: selectedMotivation || null } : null,
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
      await saveLead(buildPayload());
      if (which === "res") setResStep(6);
      if (which === "com") setComStep(2);
    } catch (e) {
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
            backgroundImage: mode === "res" ? `url(${residentialBg})` : `url(${commercialBg})`,
          }}
        />
      )}
      {mode && <div className="sc-bg-overlay" />}

      <div className="sc-content">
        <div className="sc-container">
          {!mode && (
            <>
              <h2 className="sc-title">Solar Calculator</h2>
              <p className="sc-subtitle">Get a quick estimate. Final pricing and production depend on your roof and site.</p>
            </>
          )}

          {!mode && (
            <div className="sc-card sc-animate-in">
              <div className="sc-row">
                <button type="button" className="sc-btn sc-btn-primary sc-btn-sweepBlue" onClick={startResidential}>
                  <span className="sc-btnLabel sc-btnLabel--base">Residential</span>
                  <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                </button>

                <button type="button" className="sc-btn sc-btn-ghost sc-btn-sweepBlue" onClick={startCommercial}>
                  <span className="sc-btnLabel sc-btnLabel--base">Commercial</span>
                  <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                </button>
              </div>
            </div>
          )}

          {mode === "res" && (
            <div className="sc-section sc-animate-in">
              <div className="sc-card">
                <div className="sc-card-top">
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

                {resStep === 0 && (
                  <div className="sc-step">
                    <p className="sc-text">What city are you in?</p>

                    <label className="sc-label">City</label>
                    <select
                      className="sc-input sc-select"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Select a city</option>
                      {Object.keys(CITY_PRODUCTION_RATIOS)
                        .sort()
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      <option value="Other">Other</option>
                    </select>

                    <label className="sc-check">
                      <input
                        type="checkbox"
                        checked={hasSouthernObstruction}
                        onChange={(e) => setHasSouthernObstruction(e.target.checked)}
                      />
                      <span>My roof has southern obstructions (trees/buildings)</span>
                    </label>

                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-sweepBlue" onClick={() => setResStep(1)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Next</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {resStep === 1 && (
                  <div className="sc-step">
                    <p className="sc-text">What’s your average monthly electricity usage?</p>

                    <div className="sc-row sc-row-tight">
                      <button
                        type="button"
                        className={`sc-btn sc-btn-sweepBlue ${usageType === "kwh" ? "sc-btn-primary" : "sc-btn-ghost"}`}
                        onClick={() => setUsageType("kwh")}
                      >
                        <span className="sc-btnLabel sc-btnLabel--base">Enter kWh</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>

                      <button
                        type="button"
                        className={`sc-btn sc-btn-sweepBlue ${usageType === "bill" ? "sc-btn-primary" : "sc-btn-ghost"}`}
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

                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-ghost sc-btn-sweepBlue" onClick={() => setResStep(0)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Back</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                      </button>

                      <button type="button" className="sc-btn sc-btn-primary sc-btn-sweepBlue" onClick={() => setResStep(2)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Next</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {resStep === 2 && (
                  <div className="sc-step">
                    <p className="sc-text">Can we get your name to prepare your estimate?</p>

                    <label className="sc-label">Your name</label>
                    <input
                      className="sc-input"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Full name"
                    />

                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-ghost sc-btn-sweepBlue" onClick={() => setResStep(1)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Back</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                      </button>

                      <button type="button" className="sc-btn sc-btn-primary sc-btn-sweepBlue" onClick={goEstimate}>
                        <span className="sc-btnLabel sc-btnLabel--base">Estimate</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>

                    {(!selectedCity.trim() || !customerName.trim()) && (
                      <div className="sc-hint">Please enter your city and name to continue.</div>
                    )}
                  </div>
                )}

                {resStep === 3 && (
                  <div className="sc-step">
                    <div className="sc-step-title">Estimating…</div>
                    <div className="sc-muted">
                      Building your estimate for <b>{customerName || "you"}</b>.
                    </div>
                    <div className="sc-progress" aria-hidden="true">
                      <div className="sc-progress-bar" />
                    </div>
                  </div>
                )}

                {resStep === 4 && (
                  <div className="sc-step">
                    <div className="sc-step-title">Your results are ready!</div>
                    <div className="sc-muted">
                      Estimate for <b>{customerName}</b> • <span>{selectedCity || "Other"}</span>
                    </div>

                    <div className="sc-grid">
                      <ResultCard
                        title="Panels required (100% offset)"
                        value={`${formatNumber(results.panelCount)} panels`}
                        sub={`Derate: ${results.kSite} • City ratio: ${formatNumber(results.rCity, 0)} kWh/kW·yr`}
                      />
                      <ResultCard
                        title="Estimated system price"
                        value={formatMoney(results.systemPrice)}
                        sub={`Assumes 540W panels • $${PRICE_PER_WATT}/W`}
                      />
                      <ResultCard title="Estimated annual usage" value={`${formatNumber(results.annualLoadKwh, 0)} kWh`} />
                    </div>

                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-ghost sc-btn-sweepBlue" onClick={() => setResStep(2)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Back</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                      </button>

                      <button
                        type="button"
                        className="sc-btn sc-btn-primary sc-btn-sweepBlue"
                        onClick={() => {
                          if (!contactName.trim()) setContactName(customerName);
                          setResStep(5);
                        }}
                      >
                        <span className="sc-btnLabel sc-btnLabel--base">Contact</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {resStep === 5 && (
                  <div className="sc-step">
                    <div className="sc-step-title">Contact form</div>

                    <div className="sc-form">
                      <div className="sc-form-full">
                        <label className="sc-label">Your full name</label>
                        <input className="sc-input" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                      </div>

                      <div>
                        <label className="sc-label">Phone number</label>
                        <input className="sc-input" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
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
                        <label className="sc-label">Message</label>
                        <textarea className="sc-textarea" value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} />
                      </div>
                    </div>

                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-ghost sc-btn-sweepBlue" onClick={() => setResStep(4)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Back</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                      </button>

                      <button
                        type="button"
                        className="sc-btn sc-btn-primary sc-btn-sweepBlue"
                        disabled={isSubmitting}
                        onClick={() => submitContact("res")}
                      >
                        <span className="sc-btnLabel sc-btnLabel--base">{isSubmitting ? "Submitting..." : "Submit"}</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>

                    {(!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) && (
                      <div className="sc-hint">Please fill in name, phone, and email.</div>
                    )}
                    {submitError && <div className="sc-error">{submitError}</div>}
                  </div>
                )}

                {resStep === 6 && (
                  <div className="sc-step">
                    <div className="sc-step-title">We’ve got your request!</div>
                    <div className="sc-text">One of our solar experts will reach out shortly.</div>
                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-primary sc-btn-sweepBlue" onClick={resetAll}>
                        <span className="sc-btnLabel sc-btnLabel--base">Done</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {mode === "com" && (
            <div className="sc-section sc-animate-in">
              <div className="sc-card">
                <div className="sc-card-top">
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

                {comStep === 0 && (
                  <div className="sc-step">
                    <p className="sc-text">What motivates you to go solar?</p>

                    <div className="sc-stack">
                      {motivations.map((m) => (
                        <button
                          key={m}
                          type="button"
                          className={`sc-btn sc-btn-sweepBlue ${selectedMotivation === m ? "sc-btn-primary" : "sc-btn-ghost"}`}
                          onClick={() => setSelectedMotivation(m)}
                        >
                          <span className="sc-btnLabel sc-btnLabel--base">{m}</span>
                          <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                        </button>
                      ))}
                    </div>

                    <div className="sc-actions">
                      <button
                        type="button"
                        className="sc-btn sc-btn-primary sc-btn-sweepBlue"
                        onClick={() => {
                          if (!selectedMotivation) return;
                          setComStep(1);
                        }}
                      >
                        <span className="sc-btnLabel sc-btnLabel--base">Continue</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>

                    {!selectedMotivation && <div className="sc-hint">Please pick one option.</div>}
                  </div>
                )}

                {comStep === 1 && (
                  <div className="sc-step">
                    <div className="sc-step-title">Contact form</div>

                    <div className="sc-form">
                      <div className="sc-form-full">
                        <label className="sc-label">Your full name</label>
                        <input className="sc-input" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                      </div>

                      <div>
                        <label className="sc-label">Phone number</label>
                        <input className="sc-input" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
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
                        <label className="sc-label">Message</label>
                        <textarea className="sc-textarea" value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} />
                      </div>
                    </div>

                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-ghost sc-btn-sweepBlue" onClick={() => setComStep(0)}>
                        <span className="sc-btnLabel sc-btnLabel--base">Back</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">←</span>
                      </button>

                      <button
                        type="button"
                        className="sc-btn sc-btn-primary sc-btn-sweepBlue"
                        disabled={isSubmitting}
                        onClick={() => submitContact("com")}
                      >
                        <span className="sc-btnLabel sc-btnLabel--base">{isSubmitting ? "Submitting..." : "Submit"}</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>

                    {(!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) && (
                      <div className="sc-hint">Please fill in name, phone, and email.</div>
                    )}
                    {submitError && <div className="sc-error">{submitError}</div>}
                  </div>
                )}

                {comStep === 2 && (
                  <div className="sc-step">
                    <div className="sc-step-title">We’ve got your request!</div>
                    <div className="sc-text">One of our solar experts will reach out shortly.</div>
                    <div className="sc-actions">
                      <button type="button" className="sc-btn sc-btn-primary sc-btn-sweepBlue" onClick={resetAll}>
                        <span className="sc-btnLabel sc-btnLabel--base">Done</span>
                        <span className="sc-btnLabel sc-btnLabel--hover">→</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}