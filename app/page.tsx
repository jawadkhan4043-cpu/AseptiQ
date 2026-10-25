"use client";

import { useState, type FormEvent } from "react";
import { rooms, scenarioChoices, startingEvents, team, type QualityEvent } from "@/lib/demo-data";

type Screen = "Overview" | "Training lab" | "Quality events" | "Competencies";

const navigation: { name: Screen; icon: string }[] = [
  { name: "Overview", icon: "◫" },
  { name: "Training lab", icon: "◎" },
  { name: "Quality events", icon: "◇" },
  { name: "Competencies", icon: "♙" },
];

const copy: Record<Screen, { eyebrow: string; title: string; subtitle: string }> = {
  Overview: {
    eyebrow: "STERILE OPERATIONS / WORKSPACE",
    title: "Readiness, in clear view.",
    subtitle: "Connect room signals, staff training, and quality follow-up in one calm workspace.",
  },
  "Training lab": {
    eyebrow: "PRACTICE MODE / FICTIONAL SCENARIO",
    title: "Learn through the signal.",
    subtitle: "Practice a simulated quality event using the fictional site context shown below.",
  },
  "Quality events": {
    eyebrow: "QUALITY WORKFLOW / DEMO",
    title: "Keep each event traceable.",
    subtitle: "Assign ownership and follow review status for fictional quality records.",
  },
  Competencies: {
    eyebrow: "TEAM READINESS / DEMO",
    title: "Make training visible.",
    subtitle: "Review fictional qualification and training dates for the demo team.",
  },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("Overview");
  const [events, setEvents] = useState<QualityEvent[]>(startingEvents);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("Aseptic Suite 02");
  const [newCategory, setNewCategory] = useState("Environmental");
  const [notice, setNotice] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [checkedScenario, setCheckedScenario] = useState(false);
  const openCount = events.filter((event) => event.status !== "Closed").length;

  function addEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTitle.trim();

    if (!title) {
      setNotice("Enter an event name before saving.");
      return;
    }

    const created: QualityEvent = {
      id: "QE-" + String(Date.now()).slice(-4),
      title,
      location: newLocation,
      category: newCategory,
      urgency: "Routine",
      status: "Needs review",
      age: "Just added",
      owner: "Unassigned",
    };

    setEvents((current) => [created, ...current]);
    setNewTitle("");
    setShowForm(false);
    setNotice("Demo event added.");
  }

  function assignEvent(id: string) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, status: "In review" as const, owner: "Maya Patel" }
          : event,
      ),
    );
    setNotice("Event moved to In review.");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">AseptiQ</div>
            <div className="brand-caption">STERILE OPERATIONS</div>
          </div>
        </div>

        <div className="workspace-card">
          <span className="small-label">DEMO FACILITY</span>
          <strong>Northstar Medical</strong>
          <span className="workspace-dot">● Fictional workspace</span>
        </div>

        <div className="side-label">WORKSPACE</div>

        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={"nav-item " + (screen === item.name ? "active" : "")}
              onClick={() => {
                setScreen(item.name);
                setNotice("");
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.name === "Quality events" && (
                <span className="nav-count">{openCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-safety">
            <span className="shield">✓</span>
            <div>
              <strong>Training environment</strong>
              <p>Fictional records only</p>
            </div>
          </div>

          <div className="user-card">
            <div className="avatar">MP</div>
            <div>
              <strong>Maya Patel</strong>
              <span>Pharmacy team</span>
            </div>
            <span className="user-menu">···</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Northstar Medical</span>
            <span className="crumb-slash">/</span>
            <strong>{screen}</strong>
          </div>
          <div className="topbar-actions">
            <span className="live-status"><i /> DEMO MODE</span>
            <button className="icon-button" aria-label="Notifications">♧</button>
            <div className="top-avatar">MP</div>
          </div>
        </header>

        <div className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">{copy[screen].eyebrow}</p>
              <h1>{copy[screen].title}</h1>
              <p className="page-subtitle">{copy[screen].subtitle}</p>
            </div>
            <button
              className="button button-primary"
              onClick={() => {
                setScreen("Quality events");
                setShowForm(true);
                setNotice("");
              }}
            >
              ＋ New quality event
            </button>
          </section>

          {notice && (
            <div className="notice" role="status">
              <span>✓</span>
              {notice}
              <button aria-label="Dismiss notice" onClick={() => setNotice("")}>
                ×
              </button>
            </div>
          )}

          {screen === "Overview" && (
            <>
              <section className="hero-grid">
                <div className="hero-card">
                  <div className="hero-topline">
                    <span className="hero-kicker">SHIFT READINESS</span>
                    <span className="hero-chip"><i /> REVIEW IN PROGRESS</span>
                  </div>
                  <div className="hero-copy">
                    <h2>A steady shift<br />starts with <em>clear signals.</em></h2>
                    <p>A fictional snapshot of room checks, team readiness, and review ownership.</p>
                    <button
                      className="button button-light"
                      onClick={() => setScreen("Training lab")}
                    >
                      Open training lab <span>↗</span>
                    </button>
                  </div>
                  <div className="hero-orbit orbit-one" />
                  <div className="hero-orbit orbit-two" />
                  <div className="hero-number">
                    <strong>92</strong><span>%</span><small>DEMO READINESS</small>
                  </div>
                </div>

                <div className="focus-card">
                  <div className="focus-heading">
                    <div>
                      <p className="eyebrow">TODAY’S PRACTICE</p>
                      <h3>Pressure alarm</h3>
                    </div>
                    <div className="focus-icon">◎</div>
                  </div>
                  <p className="focus-description">
                    A simulated room signal appears during a shift. Review the fictional SOP context and choose a response.
                  </p>
                  <div className="focus-meta">
                    <span>TRAINING SCENARIO</span><span>~ 3 MIN</span>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => {
                      setScreen("Training lab");
                      setSelectedChoice(null);
                      setCheckedScenario(false);
                    }}
                  >
                    Start practice <span>→</span>
                  </button>
                </div>
              </section>

              <section className="metrics-grid">
                <article className="metric-card">
                  <div className="metric-top">
                    <span>SHIFT READINESS</span><span className="metric-icon mint">◉</span>
                  </div>
                  <strong>92%</strong>
                  <small>Demo checklist progress</small>
                  <div className="mini-progress"><i style={{ width: "92%" }} /></div>
                </article>

                <article className="metric-card">
                  <div className="metric-top">
                    <span>TEAM QUALIFICATIONS</span><span className="metric-icon blue">♙</span>
                  </div>
                  <strong>8 <small className="of-total">/ 9</small></strong>
                  <small>One training review due soon</small>
                  <button className="metric-link" onClick={() => setScreen("Competencies")}>
                    View team ↗
                  </button>
                </article>

                <article className="metric-card">
                  <div className="metric-top">
                    <span>ROOM SIGNALS</span><span className="metric-icon amber">⌁</span>
                  </div>
                  <strong>01</strong>
                  <small>Needs review in demo data</small>
                  <button className="metric-link" onClick={() => setScreen("Quality events")}>
                    Open room view ↗
                  </button>
                </article>

                <article className="metric-card">
                  <div className="metric-top">
                    <span>OPEN QUALITY EVENTS</span><span className="metric-icon violet">◇</span>
                  </div>
                  <strong>{String(openCount).padStart(2, "0")}</strong>
                  <small>Fictional review records</small>
                  <button className="metric-link" onClick={() => setScreen("Quality events")}>
                    View event list ↗
                  </button>
                </article>
              </section>

              <section className="dashboard-grid">
                <article className="panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">ROOM OVERVIEW</p>
                      <h3>Readiness by area</h3>
                    </div>
                    <button className="subtle-button" onClick={() => setScreen("Quality events")}>
                      All areas ↗
                    </button>
                  </div>

                  <div className="room-list">
                    {rooms.map((room) => (
                      <div className="room-row" key={room.code}>
                        <div className="room-symbol">⌂</div>
                        <div className="room-main">
                          <div className="room-title-row">
                            <strong>{room.name}</strong>
                            <span className={"status-pill " + (room.status === "Ready" ? "good" : "watch")}>
                              <i />{room.status}
                            </span>
                          </div>
                          <span>{room.code} · {room.detail}</span>
                          <div className="room-bar"><i style={{ width: room.score + "%" }} /></div>
                        </div>
                        <strong className="room-score">{room.score}%</strong>
                      </div>
                    ))}
                  </div>
                  <p className="panel-footnote">Demo indicators only. Follow your facility’s approved procedures.</p>
                </article>

                <article className="panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">QUALITY WORKFLOW</p>
                      <h3>Needs attention</h3>
                    </div>
                    <button className="subtle-button" onClick={() => setScreen("Quality events")}>
                      View all ↗
                    </button>
                  </div>

                  <div className="attention-list">
                    {events.slice(0, 3).map((event) => (
                      <div className="attention-row" key={event.id}>
                        <div className={"attention-mark " + (event.urgency === "High" ? "high" : "")}>!</div>
                        <div className="attention-copy">
                          <strong>{event.title}</strong>
                          <span>{event.id} · {event.location}</span>
                        </div>
                        <span className={"priority " + (event.urgency === "High" ? "priority-high" : "")}>
                          {event.status === "Closed" ? "Closed" : event.urgency}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="panel-action" onClick={() => setScreen("Quality events")}>
                    Open quality events <span>→</span>
                  </button>
                </article>
              </section>

              <div className="disclaimer">
                <span>i</span>
                <p>
                  <strong>Fictional training workspace.</strong> This demo does not provide compounding instructions, clinical advice, or batch-release decisions. Use your organization’s current procedures for real work.
                </p>
              </div>
            </>
          )}

          {screen === "Training lab" && (
            <section className="training-layout">
              <article className="training-panel">
                <div className="scenario-label"><span>01</span> ENVIRONMENTAL SIGNAL · PRACTICE</div>
                <h2>Pressure alarm mid-shift</h2>
                <p className="training-intro">
                  During a fictional training shift, the room-monitor panel displays an alert. The demo SOP card below is the only reference for this exercise.
                </p>
                <div className="sop-card">
                  <span className="sop-icon">▤</span>
                  <div>
                    <strong>Fictional demo SOP context</strong>
                    <p>
                      In this practice scenario, pause the simulation, notify the assigned QA contact, and document the event before continuing the exercise.
                    </p>
                  </div>
                </div>

                <div className="question-block">
                  <p className="eyebrow">CHOOSE A RESPONSE</p>
                  <div className="choice-list">
                    {scenarioChoices.map((choice, index) => (
                      <button
                        key={choice}
                        className={"choice " + (selectedChoice === index ? "selected" : "")}
                        onClick={() => {
                          setSelectedChoice(index);
                          setCheckedScenario(false);
                        }}
                      >
                        <span className="choice-number">0{index + 1}</span>
                        <span>{choice}</span>
                        <span className="choice-radio">{selectedChoice === index ? "●" : "○"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {checkedScenario && (
                  <div className={"scenario-feedback " + (selectedChoice === 0 ? "correct" : "review")}>
                    <strong>{selectedChoice === 0 ? "Scenario complete" : "Review the demo SOP"}</strong>
                    <p>
                      {selectedChoice === 0
                        ? "That matches the expected response in this fictional exercise. Real procedures depend on your facility’s approved SOP."
                        : "For this fictional exercise, choose the response that follows the demo SOP card. Real procedures depend on your facility’s approved SOP."}
                    </p>
                  </div>
                )}

                <div className="training-actions">
                  <button
                    className="button button-primary"
                    disabled={selectedChoice === null}
                    onClick={() => setCheckedScenario(true)}
                  >
                    Check my response <span>→</span>
                  </button>
                  <button
                    className="button button-quiet"
                    onClick={() => {
                      setSelectedChoice(null);
                      setCheckedScenario(false);
                    }}
                  >
                    Reset scenario
                  </button>
                </div>
              </article>

              <aside className="training-aside">
                <div className="aside-card dark-aside">
                  <p className="eyebrow">LEARNING PATH</p>
                  <h3>Aseptic operations</h3>
                  <p>Short fictional scenarios for quality-workflow practice.</p>
                  <div className="lesson-progress"><i /></div>
                  <span>1 of 4 demo scenarios</span>
                </div>
                <div className="aside-card">
                  <p className="eyebrow">PRACTICE RULE</p>
                  <h3>Stay within the scenario.</h3>
                  <p>
                    This prototype teaches workflow awareness. It does not replace site training, professional judgment, or current procedures.
                  </p>
                </div>
              </aside>
            </section>
          )}

          {screen === "Quality events" && (
            <section className="panel events-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">DEMO QUALITY RECORDS</p>
                  <h3>Event review queue</h3>
                  <p className="panel-description">
                    {openCount} open fictional event{openCount === 1 ? "" : "s"}
                  </p>
                </div>
                <button
                  className="button button-primary"
                  onClick={() => setShowForm((value) => !value)}
                >
                  {showForm ? "Close form" : "＋ Add demo event"}
                </button>
              </div>

              {showForm && (
                <form className="event-form" onSubmit={addEvent}>
                  <div className="form-heading">
                    <div>
                      <p className="eyebrow">NEW FICTIONAL RECORD</p>
                      <h4>Add a quality event</h4>
                    </div>
                    <span className="form-demo-tag">DEMO ONLY</span>
                  </div>

                  <label>
                    Event name
                    <input
                      required
                      maxLength={80}
                      value={newTitle}
                      onChange={(event) => setNewTitle(event.target.value)}
                      placeholder="Example: Room monitor signal"
                    />
                  </label>

                  <div className="form-row">
                    <label>
                      Location
                      <select value={newLocation} onChange={(event) => setNewLocation(event.target.value)}>
                        <option>Aseptic Suite 01</option>
                        <option>Aseptic Suite 02</option>
                        <option>Preparation Room</option>
                      </select>
                    </label>
                    <label>
                      Category
                      <select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
                        <option>Environmental</option>
                        <option>Documentation</option>
                        <option>Equipment</option>
                        <option>Training</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button className="button button-primary" type="submit">Save demo event</button>
                    <button className="button button-quiet" type="button" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="event-table">
                <div className="event-table-head">
                  <span>EVENT</span>
                  <span>LOCATION</span>
                  <span>PRIORITY</span>
                  <span>OWNER / STATUS</span>
                  <span>ACTION</span>
                </div>

                {events.map((event) => (
                  <div className="event-table-row" key={event.id}>
                    <div className="event-name">
                      <span className={"event-dot " + (event.urgency === "High" ? "red-dot" : "")} />
                      <div>
                        <strong>{event.title}</strong>
                        <span>{event.id} · {event.category} · {event.age}</span>
                      </div>
                    </div>
                    <span className="table-location">{event.location}</span>
                    <span className={"priority " + (event.urgency === "High" ? "priority-high" : "")}>
                      {event.urgency}
                    </span>
                    <div className="owner-status">
                      <strong>{event.owner}</strong>
                      <span>{event.status}</span>
                    </div>
                    {event.status === "Needs review" ? (
                      <button className="row-action" onClick={() => assignEvent(event.id)}>
                        Assign to me
                      </button>
                    ) : (
                      <span className="done-label">✓ In progress</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="disclaimer">
                <span>i</span>
                <p>
                  Example records are fictional. This queue is not a regulated quality management system and does not approve or release a batch.
                </p>
              </div>
            </section>
          )}

          {screen === "Competencies" && (
            <section className="panel competency-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">FICTIONAL STAFF RECORDS</p>
                  <h3>Competency overview</h3>
                  <p className="panel-description">A training-status mockup for the demo team.</p>
                </div>
                <span className="form-demo-tag">NO REAL PERSONNEL DATA</span>
              </div>

              <div className="team-list">
                {team.map((person, index) => (
                  <div className="team-row" key={person.name}>
                    <div className={"avatar team-avatar avatar-" + index}>{person.initials}</div>
                    <div className="team-person">
                      <strong>{person.name}</strong>
                      <span>{person.role}</span>
                    </div>
                    <div className="team-qualification">
                      <span className={"status-pill " + (person.status === "Current" ? "good" : "watch")}>
                        <i />{person.status}
                      </span>
                      <small>{person.due}</small>
                    </div>
                    <div className="team-progress">
                      <div className="room-bar">
                        <i style={{ width: (person.status === "Current" ? "100%" : "68%") }} />
                      </div>
                      <span>{person.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="disclaimer">
                <span>i</span>
                <p>
                  Training dates and names are invented for this prototype. Use approved systems and local training rules in real operations.
                </p>
              </div>
            </section>
          )}

          <footer className="app-footer">
            <span><b>AseptiQ</b> · Sterile operations training demo</span>
            <span>Fictional records only · Not for clinical or batch-release use</span>
          </footer>
        </div>
      </main>
    </div>
  );
}