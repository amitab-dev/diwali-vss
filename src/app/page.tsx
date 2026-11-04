import { BurstButton } from "./_components/burst-button";
import { DiyaSection } from "./_components/diyas";
import { FireworksCanvas } from "./_components/fireworks";
import { WishWall } from "./_components/wish-wall";

export default function Home() {
  return (
    <>
      <FireworksCanvas />

      <div className="container">
        <header className="interactive-element">
          <div className="company-title-card">
            <h2 className="company-name">Visionary Staffing Solutions LLP</h2>
          </div>
          <div>
            <span className="office-badge">Pune Office</span>
          </div>
          <h1 className="hero-title">Happy Diwali!</h1>
          <p className="hero-subtitle">Warmest Diwali Wishes from Girish Sahane 🪔</p>
        </header>

        <DiyaSection />

        <article className="md-card interactive-element">
          <div className="md-header">
            <div className="md-avatar">GS</div>
            <div className="md-info">
              <h3>Girish Sahane</h3>
              <p>Managing Director — Visionary Staffing Solutions LLP</p>
            </div>
          </div>
          <div className="md-body">
            <p>Dear Team &amp; Partners,</p>
            <p>
              As we celebrate Diwali, the festival of light, wisdom, and new beginnings, I want to
              extend my heartfelt gratitude to each member of our VSS Pune family. Your dedication,
              resilience, and unwavering commitment continue to illuminate our pathway toward
              excellence in recruitment operations and staffing solutions.
            </p>
            <p>
              May this auspicious season light up your lives with health, happiness, and abundant
              success. Together, let us continue to innovate, empower talent, and achieve new
              milestones in the coming year.
            </p>
            <p>Wishing you and your families a joyous, prosperous, and safe Diwali!</p>
          </div>
          <div className="md-signature">Girish Sahane</div>
        </article>

        <div className="actions-panel interactive-element">
          <BurstButton />
        </div>

        <WishWall />

        <footer className="interactive-element">
          <div className="brand-footer-links">
            <a href="mailto:info@visionarystaffingsolutions.in">
              ✉️ info@visionarystaffingsolutions.in
            </a>
            <a
              href="https://www.linkedin.com/company/visionary-staffing-solutions-llp"
              target="_blank"
            >
              🔗 LinkedIn Company Page
            </a>
          </div>
          <p style={{ marginTop: 15 }}>
            &copy; 2026 Visionary Staffing Solutions LLP. Built for VSS Pune Office Celebration.
          </p>
        </footer>
      </div>
    </>
  );
}
