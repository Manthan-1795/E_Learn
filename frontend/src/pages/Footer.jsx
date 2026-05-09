import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>

            <div className="footer-contact">
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <span>koremanthanp@gmail.com</span>
              </div>

              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <span>+91 7020483701</span>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="footer-section footer-social-section">
            <h3 className="footer-title">Follow Us</h3>

            <p className="footer-subtitle">
              Stay connected with us on social media
            </p>

            <div className="social-icons">
              <a
                href="https://github.com/Manthan-1795"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/manthan-kore-678982372/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2026 E-Learn Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
