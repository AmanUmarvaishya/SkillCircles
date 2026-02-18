import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="skill-footer" data-aos="zoom-in">
      <div className="container">
        <div className="row gy-4">

          {/* Brand Section */}
          <div className="col-md-4">
            <h4 className="footer-title">SkillCircle</h4>
            <p className="footer-text">
              Exchange skills, learn from others, and grow together in a
              collaborative community.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4">
            <h5 className="footer-subtitle">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">Explore Skills</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-4">
            <h5 className="footer-subtitle">Connect With Us</h5>
            <div className="footer-socials">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaGithub /></a>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="text-center footer-bottom">
          © {new Date().getFullYear()} SkillXchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
