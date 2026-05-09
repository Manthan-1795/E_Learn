import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./AdminCredentials.css";

export default function AdminCredentials() {
  const navigate = useNavigate();
  const [emailCopied, setEmailCopied] = useState(false);
  const [passCopied, setPassCopied] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        setPassCopied(true);
        setTimeout(() => setPassCopied(false), 2000);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="ac-page">
        {/* ── Hero banner ── */}
        <div className="ac-hero">
          <div className="ac-hero-glow" />
          <div className="ac-hero-content">
            <div className="ac-shield">🛡️</div>
            <h1 className="ac-hero-title">Admin Demo Access</h1>
            <p className="ac-hero-sub">
              Explore the full admin panel with the credentials below. This is a
              read-only demo environment — feel free to look around!
            </p>
          </div>
        </div>

        <div className="ac-body">
          {/* ── Credentials card ── */}
          <div className="ac-card ac-cred-card">
            <div className="ac-card-header">
              <span className="ac-card-icon">🔐</span>
              <h2 className="ac-card-title">Login Credentials</h2>
            </div>

            <div className="ac-cred-field">
              <label className="ac-cred-label">Email address</label>
              <div className="ac-cred-row">
                <code className="ac-cred-value">admin@gmail.com</code>
                <button
                  className={`ac-copy-btn${emailCopied ? " ac-copy-btn--done" : ""}`}
                  onClick={() => copyToClipboard("admin@gmail.com", "email")}
                  aria-label="Copy email"
                >
                  {emailCopied ? (
                    <>
                      <i className="bi bi-check2" /> Copied
                    </>
                  ) : (
                    <>
                      <i className="bi bi-clipboard" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="ac-divider" />

            <div className="ac-cred-field">
              <label className="ac-cred-label">Password</label>
              <div className="ac-cred-row">
                <code className="ac-cred-value">admin</code>
                <button
                  className={`ac-copy-btn${passCopied ? " ac-copy-btn--done" : ""}`}
                  onClick={() => copyToClipboard("admin", "pass")}
                  aria-label="Copy password"
                >
                  {passCopied ? (
                    <>
                      <i className="bi bi-check2" /> Copied
                    </>
                  ) : (
                    <>
                      <i className="bi bi-clipboard" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <button className="ac-login-btn" onClick={() => navigate("/login")}>
              Go to Login →
            </button>
          </div>

          {/* ── What you can do ── */}
          <div className="ac-card ac-features-card">
            <div className="ac-card-header">
              <span className="ac-card-icon">⚡</span>
              <h2 className="ac-card-title">What you can explore</h2>
            </div>
            <div className="ac-features-grid">
              {[
                {
                  icon: "📋",
                  title: "Manage Courses",
                  desc: "Add, update, and view all courses on the platform.",
                },
                {
                  icon: "🎥",
                  title: "Manage Videos",
                  desc: "Upload YouTube video links and attach them to courses.",
                },
                {
                  icon: "👥",
                  title: "View Students",
                  desc: "See all enrolled students and filter by course.",
                },
                {
                  icon: "🗑️",
                  title: "Delete Courses",
                  desc: "Remove outdated courses from the platform.",
                },
              ].map((f) => (
                <div key={f.title} className="ac-feature-item">
                  <span className="ac-feature-icon">{f.icon}</span>
                  <div>
                    <div className="ac-feature-title">{f.title}</div>
                    <div className="ac-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Note ── */}
          <div className="ac-note">
            <i className="bi bi-info-circle-fill" />
            <p>
              This is a demo environment. Data may be reset periodically. Please
              do not change the admin password so others can continue accessing
              the demo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
