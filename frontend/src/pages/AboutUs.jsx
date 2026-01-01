import React from "react";
import about_img from "../assets/about_img.jpg";
import Footer from "./Footer";
import "./AboutUs.css";
import Navbar from "../components/Navbar";

function AboutUs() {
  const reviews = [
    {
      id: 1,
      name: "Sumit Kumar",
      rating: 5,
      comment:
        "E-Learn Hub has transformed my learning experience! The courses are well-structured and the mentors are incredibly supportive.",
      role: "MERN Stack Developer",
    },
    {
      id: 2,
      name: "Radha Sharma",
      rating: 5,
      comment:
        "Best online learning platform I've used. The quality of content and the community support is outstanding.",
      role: "Data Analyst",
    },
    {
      id: 3,
      name: "Anil Mehta",
      rating: 5,
      comment:
        "I've completed multiple courses here and each one exceeded my expectations. Highly recommend!",
      role: "Machine Learning Engineer",
    },
    {
      id: 4,
      name: "Priya Singh",
      rating: 5,
      comment:
        "The platform is user-friendly and the instructors are experts in their fields. Great investment in my career!",
      role: "Java Developer",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      rating: 5,
      comment:
        "E-Learn Hub helped me switch careers successfully. The courses are practical and industry-relevant.",
      role: "Data Scientist",
    },
    {
      id: 6,
      name: "Piyush Gupta",
      rating: 5,
      comment:
        "Excellent platform with diverse course offerings. The learning materials are comprehensive and easy to follow.",
      role: "FULL Stack Developer",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="aboutus-container">
        <div className="aboutus-header">
          <h1>About Us</h1>
        </div>

        <div className="aboutus-content">
          <div className="aboutus-text">
            <h2>Welcome to E-Learn Hub</h2>
            <p>
              Welcome to E-Learn Hub, your ultimate destination for online
              learning and skill development. Our mission is to empower
              individuals worldwide by providing access to high-quality
              educational resources and expert mentorship.
            </p>
            <p>
              At E-Learn Hub, we believe that learning should be accessible,
              engaging, and tailored to individual needs. Whether you're a
              student looking to enhance your knowledge, a professional seeking
              to upskill, or a lifelong learner passionate about exploring new
              subjects, we have something for everyone.
            </p>
            <p>
              Our platform offers a diverse range of courses across various
              domains, including technology, business, arts, and personal
              development. Each course is designed and delivered by industry
              experts and experienced educators who are dedicated to helping you
              succeed.
            </p>
            <p>
              Join our vibrant community of learners and mentors today and
              embark on a transformative learning journey with E-Learn Hub!
            </p>
          </div>
          <div className="aboutus-image-wrapper">
            <img src={about_img} alt="About Us" className="aboutus-image" />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2 className="reviews-title">What Our Students Say</h2>
          <p className="reviews-subtitle">
            Hear from our community of learners
          </p>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>
                <p className="review-comment">"{review.comment}"</p>
                <div className="review-author">
                  <h4 className="review-name">{review.name}</h4>
                  <p className="review-role">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
