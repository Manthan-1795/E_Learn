import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Contact Us Section */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <span>support@elearnhub.com</span>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <span>+91 9876543210</span>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <p className="footer-subtitle">Stay connected with us on social media</p>
            <div className="social-icons">
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
  <i className="bi bi-facebook"></i>
</a>

<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
  <i className="bi bi-twitter"></i>
</a>

<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
  <i className="bi bi-instagram"></i>
</a>

<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
  <i className="bi bi-linkedin"></i>
</a>

<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
  <i className="bi bi-youtube"></i>
</a>

            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 E-Learn Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

