import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { chapters } from '../data/chapters';
import videos from '../data/videos.json';
import {
    FaBookOpen,
    FaVideo,
    FaHeartbeat,
    FaArrowRight,
    FaStethoscope,
    FaLeaf,
    FaUsers
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const particlesRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const uiRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        // 1. Initial Soft Bloom (Load Animation - Re-themed)
        const tl = gsap.timeline();

        tl.to(heroRef.current, { opacity: 1, duration: 0.5 })
            .fromTo(gridRef.current,
                { scale: 1.5, opacity: 0, rotationX: 45 },
                { scale: 1, opacity: 0.6, rotationX: 20, duration: 2.5, ease: "power2.out" }
            )
            .fromTo(titleRef.current,
                { opacity: 0, y: 50, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
                "-=2"
            )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=1"
            );

        // 2. Parallax Effect (Gentle Float)
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            gsap.to(gridRef.current, {
                rotationX: 20 + yPos * 2,
                rotationY: xPos * 2,
                x: xPos * 10,
                duration: 1.5
            });

            gsap.to(particlesRef.current, {
                x: xPos * 30,
                y: yPos * 30,
                duration: 2
            });

            gsap.to(contentRef.current, {
                x: xPos * -15,
                y: yPos * -15,
                duration: 1.5
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 3. Continuous Animations (Floating Petals)
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((p, i) => {
            gsap.to(p, {
                y: -window.innerHeight,
                x: "random(-50, 50)",
                rotation: "random(0, 360)",
                duration: "random(10, 20)",
                repeat: -1,
                ease: "none",
                delay: "random(0, 10)"
            });
        });

        // Horizontal Scroll for Chapters (Ported from Projects Slider)
        const slider = sliderRef.current;
        if (slider) {
            gsap.to(slider, {
                x: () => -(slider.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".chapters-preview",
                    start: "top top",
                    end: () => "+=" + slider.scrollWidth,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const featuredChapters = chapters.slice(0, 5);

    return (
        <div className="home-page">
            {/* HERO SECTION */}
            <section ref={heroRef} className="hero-section">
                {/* Layer 1: Soft Background */}
                <div className="layer-bg"></div>

                {/* Layer 2: Floral/Soft Grid */}
                <div ref={gridRef} className="layer-grid">
                    <div className="grid-plane"></div>
                </div>

                {/* Layer 3: Floating Petals/Particles */}
                <div ref={particlesRef} className="layer-particles">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="soft-particle" style={{
                            left: `${Math.random() * 100}%`,
                            top: '110%',
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.4 + 0.1,
                            backgroundColor: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)'
                        }}></div>
                    ))}
                </div>

                {/* Layer 4: Soft Overlay */}
                <div className="layer-overlay"></div>

                {/* Soft UI Elements */}
                <div ref={uiRef} className="hero-ui">
                    <div className="ui-circle circle-1"></div>
                    <div className="ui-circle circle-2"></div>
                </div>

                <div ref={contentRef} className="hero-content">
                    <h1 ref={titleRef} className="hero-title">
                        Empowering Women,<br />
                        <span className="text-gradient">Embracing Health.</span>
                    </h1>
                    <p ref={subtitleRef} className="hero-subtitle">
                        Your trusted companion for menstrual health, reproductive wellness, and holistic self-care.
                    </p>
                    <div className="hero-cta">
                        <Link to="/chapters" className="btn-primary">Start Learning</Link>
                        <Link to="/about" className="btn-secondary">Our Mission</Link>
                    </div>
                </div>
            </section>

            {/* Features Section (Ported from Tech Highlights) */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Why HerHealth?</h2>
                    <div className="header-line"></div>
                </div>
                <div className="features-grid">
                    <Card title="Expert Knowledge" className="feature-card">
                        <p>Medically verified content from trusted sources.</p>
                        <div className="card-icon"><FaStethoscope /></div>
                    </Card>
                    <Card title="Holistic Care" className="feature-card">
                        <p>Focusing on physical, mental, and emotional well-being.</p>
                        <div className="card-icon"><FaHeartbeat /></div>
                    </Card>
                    <Card title="Community" className="feature-card">
                        <p>Join a supportive network of women sharing their journeys.</p>
                        <div className="card-icon"><FaUsers /></div>
                    </Card>
                </div>
            </section>

            {/* Chapters Slider (Ported from Projects Slider) */}
            <section className="chapters-preview">
                <div className="chapters-header">
                    <h2 className="section-title">Latest Chapters</h2>
                </div>
                <div className="soft-frame-top"></div>
                <div ref={sliderRef} className="chapters-slider">
                    {featuredChapters.map((chapter, i) => (
                        <div key={chapter.id} className="chapter-slide">
                            <Card title={`Chapter ${chapter.id}`} className="h-full">
                                <div className="slide-content">
                                    <div className="slide-icon">
                                        <FaBookOpen />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 text-slate-800">{chapter.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-3">{chapter.description}</p>
                                    <Link to={`/chapter/${chapter.id}`} className="read-more">Read More</Link>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="soft-frame-bottom"></div>
            </section>

            {/* CTA Footer */}
            <section className="cta-section">
                <h2 className="section-title">Ready to take control?</h2>
                <Link to="/resources" className="btn-primary pulse-btn">Open Symptom Tracker</Link>
            </section>

            <style jsx>{`
        .home-page {
          overflow-x: hidden;
          background: var(--bg-color);
        }

        /* HERO SECTION */
        .hero-section {
          height: 100vh;
          width: 100vw;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          opacity: 0;
        }

        .layer-bg {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 50%, #fff0f5 0%, #fff 100%);
            z-index: 0;
        }

        .layer-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          transform-style: preserve-3d;
        }

        .grid-plane {
          position: absolute;
          bottom: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(var(--tron-grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--tron-grid-color) 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.5;
          mask-image: linear-gradient(to top, black 20%, transparent 80%);
        }

        .layer-particles {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .soft-particle {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          filter: blur(2px);
        }

        .hero-ui {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .ui-circle {
            position: absolute;
            border-radius: 50%;
            border: 1px solid var(--accent-cyan);
            opacity: 0.1;
        }
        .circle-1 { width: 600px; height: 600px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .circle-2 { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%, -50%); border-style: dashed; }

        .hero-content {
          position: relative;
          z-index: 5;
          text-align: center;
          max-width: 900px;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 5rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: var(--text-color);
          font-weight: 800;
          font-family: var(--font-header);
        }

        .text-gradient {
            background: linear-gradient(to right, var(--accent-blue), var(--accent-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #64748b;
          margin: 0 auto 3rem;
          font-family: var(--font-body);
          max-width: 600px;
        }

        .hero-cta {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .btn-primary {
            padding: 1rem 2.5rem;
            background: var(--accent-blue);
            color: white;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 10px 20px -5px rgba(236, 64, 122, 0.4);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -5px rgba(236, 64, 122, 0.5);
        }

        .btn-secondary {
            padding: 1rem 2.5rem;
            background: white;
            color: var(--text-color);
            border: 1px solid #e2e8f0;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s;
        }
        .btn-secondary:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
        }

        /* FEATURES SECTION */
        .features-section {
          padding: 120px 5%;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .section-header {
          margin-bottom: 80px;
          text-align: center;
        }

        .section-title {
            font-size: 3rem;
            font-family: var(--font-header);
            color: var(--text-color);
            margin-bottom: 1rem;
        }

        .header-line {
          width: 100px;
          height: 4px;
          background: var(--accent-blue);
          margin: 0 auto;
          border-radius: 2px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .feature-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .card-icon {
            font-size: 3rem;
            color: var(--accent-cyan);
            margin-top: 2rem;
            opacity: 0.2;
            align-self: flex-end;
        }

        /* CHAPTERS SLIDER */
        .chapters-preview {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          background: #fff;
          position: relative;
        }

        .chapters-header {
            padding: 0 5%;
            margin-bottom: 50px;
            z-index: 2;
        }

        .chapters-slider {
          display: flex;
          gap: 50px;
          padding-left: 5%;
          width: max-content;
          z-index: 2;
        }

        .chapter-slide {
          width: 350px;
          height: 450px;
          position: relative;
        }

        .slide-content {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .slide-icon {
            font-size: 2.5rem;
            color: var(--accent-purple);
            margin-bottom: 1.5rem;
        }

        .read-more {
            margin-top: auto;
            color: var(--accent-blue);
            font-weight: 700;
            text-decoration: none;
        }

        .soft-frame-top, .soft-frame-bottom {
          position: absolute;
          left: 0;
          width: 100%;
          height: 40px;
          background: repeating-linear-gradient(90deg, var(--accent-cyan), var(--accent-cyan) 2px, transparent 2px, transparent 20px);
          opacity: 0.1;
        }
        .soft-frame-top { top: 0; }
        .soft-frame-bottom { bottom: 0; }

        /* CTA SECTION */
        .cta-section {
          padding: 150px 20px;
          text-align: center;
          background: radial-gradient(circle at center, rgba(236, 64, 122, 0.05), transparent 70%);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .chapters-preview { height: auto; padding: 100px 0; }
          .chapters-slider { flex-direction: column; width: 100%; padding: 0 20px; }
          .chapter-slide { width: 100%; height: auto; }
          .ui-circle { width: 300px; height: 300px; }
        }
      `}</style>
        </div>
    );
};

export default Home;
