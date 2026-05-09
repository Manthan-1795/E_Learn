import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/userService";
import { useAuth } from "../contex/AuthContext";
import "./Home.css";

const STATS = [
  { value: "12,000+", label: "Students Enrolled" },
  { value: "80+", label: "Expert Courses" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "50+", label: "Industry Mentors" },
];

const FEATURES = [
  {
    icon: "🎥",
    title: "Video-First Learning",
    desc: "HD recorded sessions you can rewatch anytime, at your own pace.",
  },
  {
    icon: "🧑‍💻",
    title: "Hands-On Projects",
    desc: "Every course comes with real-world projects to build your portfolio.",
  },
  {
    icon: "🏆",
    title: "Career Support",
    desc: "Resume reviews, mock interviews, and placement guidance included.",
  },
  {
    icon: "📱",
    title: "Learn Anywhere",
    desc: "Mobile-friendly platform — learn on your phone, tablet, or laptop.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Mentors",
    desc: "Instructors with 5–15 years of industry experience in their field.",
  },
  {
    icon: "🔐",
    title: "Lifetime Access",
    desc: "Buy once, access forever — including all future course updates.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Full-Stack Developer @ Infosys",
    text: "E-Learn Hub's MERN course landed me my first job in 4 months. The projects were exactly what interviewers asked about!",
    avatar: "PS",
    stars: 5,
  },
  {
    name: "Rahul Verma",
    role: "Data Analyst @ TCS",
    text: "Clear explanations, real datasets, and a mentor who actually responds. Worth every rupee.",
    avatar: "RV",
    stars: 5,
  },
  {
    name: "Ananya Iyer",
    role: "ML Engineer @ Startup",
    text: "Went from zero Python knowledge to deploying ML models in 3 months. The structured path made all the difference.",
    avatar: "AI",
    stars: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="home-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  // Redirect admin away from student home page
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  useEffect(() => {
    getCourses()
      .then((res) => {
        if (res.status === "Success") setCourses(res.data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <span className="home-badge">🚀 New courses added every month</span>
          <h1 className="home-hero-title">
            Build Skills That
            <br />
            <span className="home-hero-accent">Land Real Jobs</span>
          </h1>
          <p className="home-hero-subtitle">
            Industry-crafted courses in web dev, data science, and more — taught
            by engineers who work at top companies.
          </p>
          <div className="home-hero-actions">
            <button
              className="home-btn-primary"
              onClick={() => navigate("/courses")}
            >
              Explore Courses
            </button>
            <button
              className="home-btn-ghost"
              onClick={() => navigate("/aboutus")}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="home-hero-visual">
          <div className="home-hero-card home-hero-card--1">
            <span className="home-hero-card-icon">📚</span>
            <div>
              <div className="home-hero-card-title">MERN Stack</div>
              <div className="home-hero-card-sub">48 videos · 3 months</div>
            </div>
          </div>
          <div className="home-hero-card home-hero-card--2">
            <span className="home-hero-card-icon">🤖</span>
            <div>
              <div className="home-hero-card-title">Machine Learning</div>
              <div className="home-hero-card-sub">60 videos · 4 months</div>
            </div>
          </div>
          <div className="home-hero-card home-hero-card--3">
            <span className="home-hero-card-icon">☕</span>
            <div>
              <div className="home-hero-card-title">Java + Spring</div>
              <div className="home-hero-card-sub">55 videos · 3.5 months</div>
            </div>
          </div>
          <div className="home-hero-orb" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="home-stats">
        {STATS.map((s) => (
          <div key={s.label} className="home-stat">
            <span className="home-stat-value">{s.value}</span>
            <span className="home-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURED COURSES ── */}
      {courses.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Featured Courses</h2>
            <button
              className="home-see-all"
              onClick={() => navigate("/courses")}
            >
              See all →
            </button>
          </div>
          <div className="home-courses-grid">
            {courses.map((c) => (
              <div key={c.course_id} className="home-course-card">
                <div className="home-course-thumb">
                  <span className="home-course-emoji">📘</span>
                </div>
                <div className="home-course-body">
                  <h3 className="home-course-name">{c.course_name}</h3>
                  <p className="home-course-desc">{c.description}</p>
                  <div className="home-course-footer">
                    <span className="home-course-price">₹ {c.fees}</span>
                    <button
                      className="home-course-btn"
                      onClick={() => navigate(`/course/${c.course_id}`)}
                    >
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FEATURES ── */}
      <section className="home-section home-section--alt">
        <div className="home-section-header">
          <h2 className="home-section-title">Why E‑Learn Hub?</h2>
          <p className="home-section-sub">
            Everything you need to go from beginner to job-ready.
          </p>
        </div>
        <div className="home-features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="home-feature-card">
              <span className="home-feature-icon">{f.icon}</span>
              <h4 className="home-feature-title">{f.title}</h4>
              <p className="home-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">What Our Students Say</h2>
          <p className="home-section-sub">Real results from real learners.</p>
        </div>
        <div className="home-testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="home-testimonial-card">
              <StarRating count={t.stars} />
              <p className="home-testimonial-text">"{t.text}"</p>
              <div className="home-testimonial-author">
                <div className="home-testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="home-testimonial-name">{t.name}</div>
                  <div className="home-testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <h2 className="home-cta-title">Ready to start learning?</h2>
          <p className="home-cta-sub">
            Join thousands of students already building their future.
          </p>
          <div className="home-cta-actions">
            <button
              className="home-btn-primary home-btn-primary--white"
              onClick={() => navigate("/courses")}
            >
              Get Started Free
            </button>
            <button
              className="home-btn-ghost home-btn-ghost--white"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
