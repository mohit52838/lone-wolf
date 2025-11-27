import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { chapters } from '../data/chapters';
import {
    FaBookOpen,
    FaHeartbeat,
    FaStethoscope,
    FaUsers,
    FaArrowRight
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
    const sliderContainerRef = useRef(null);

    useLayoutEffect(() => {
        // 1. Initial Soft Bloom (Load Animation - Re-themed)
        const tl = gsap.timeline();

        tl.to(heroRef.current, { opacity: 1, duration: 0.8 })
            .fromTo(gridRef.current,
                { scale: 1.2, opacity: 0, rotationX: 45 },
                { scale: 1, opacity: 0.6, rotationX: 20, duration: 2.5, ease: "power2.out" }
            )
            .fromTo(titleRef.current,
                { opacity: 0, y: 80, filter: "blur(12px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power3.out" },
                "-=2"
            )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=1.2"
            )
            .fromTo(".hero-cta",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.8"
            );

        // 2. Advanced Parallax Effect (Multi-layer)
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            // Grid moves slowly
            gsap.to(gridRef.current, {
                rotationX: 20 + yPos * 5,
                rotationY: xPos * 5,
                x: xPos * 20,
                duration: 2,
                ease: "power2.out"
            });

            // Particles move faster (depth)
            gsap.to(particlesRef.current, {
                x: xPos * 60,
                y: yPos * 60,
                duration: 1.5,
                ease: "power2.out"
            });

            // Content moves opposite (float)
            gsap.to(contentRef.current, {
                x: xPos * -30,
                y: yPos * -30,
                duration: 1.5,
                ease: "power2.out"
            });

            // UI Circles move wildly
            gsap.to(uiRef.current, {
                x: xPos * -80,
                y: yPos * -80,
                rotation: xPos * 20,
                duration: 2.5,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 3. Continuous Animations (Floating Petals)
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((p, i) => {
            gsap.to(p, {
                y: -window.innerHeight,
                x: `random(-100, 100)`,
                rotation: `random(0, 360)`,
                duration: `random(15, 30)`,
                repeat: -1,
                ease: "none",
                delay: `random(0, 15)`
            });
        });

        // Button Tilt Effect
        const buttons = document.querySelectorAll('.btn-tilt');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;

                gsap.to(btn, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });

        // 4. Scroll Reveal Animations
        const sections = [
            '.highlights-section',
            '.cta-section'
        ];

        sections.forEach(section => {
            gsap.fromTo(section,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Staggered Cards Reveal (Highlights)
        gsap.fromTo(".feature-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".features-grid",
                    start: "top 85%"
                }
            }
        );

        // 5. Horizontal Scroll-Jacking (Latest Chapters) - RESTORED
        if (sliderRef.current && sliderContainerRef.current) {
            const container = sliderContainerRef.current;
            const totalScroll = container.scrollWidth - window.innerWidth;

            gsap.to(container, {
                x: -totalScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: sliderRef.current,
                    pin: true,
                    scrub: 1,
                    // Adjust 'end' to control speed/distance of scroll
                    // Reduced multiplier to 0.8 to make horizontal scroll faster/more sensitive
                    end: () => "+=" + (container.scrollWidth * 0.8),
                    invalidateOnRefresh: true,
                }
            });
        }

        // Removed Staggered Reveal Animation

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Show latest 10 chapters + "See More" card
    const featuredChapters = chapters.slice(0, 10);

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
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="soft-particle" style={{
                            left: `${Math.random() * 100}%`,
                            top: '110%',
                            width: `${Math.random() * 15 + 5}px`,
                            height: `${Math.random() * 15 + 5}px`,
                            opacity: Math.random() * 0.3 + 0.1,
                            backgroundColor: i % 3 === 0 ? 'var(--accent-cyan)' : (i % 3 === 1 ? 'var(--accent-purple)' : '#fff')
                        }}></div>
                    ))}
                </div>

                {/* Layer 4: Soft Overlay */}
                <div className="layer-overlay"></div>

                {/* Soft UI Elements */}
                <div ref={uiRef} className="hero-ui">
                    <div className="ui-circle circle-1"></div>
                    <div className="ui-circle circle-2"></div>
                    <div className="ui-circle circle-3"></div>
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
                        <Link to="/chapters" className="btn-primary btn-tilt">Start Learning</Link>
                        <Link to="/about" className="btn-secondary btn-tilt">Our Mission</Link>
                    </div>
                </div>
            </section>

            {/* 2. HIGHLIGHTS SECTION (Cards) */}
            <section className="highlights-section">
                <div className="section-header">
                    <h2 className="section-title">Why HerHealth?</h2>
                    <div className="header-line"></div>
                </div>
                <div className="features-grid">
                    <Card title="Expert Knowledge" className="feature-card">
                        <p>Access medically verified information curated by health professionals to ensure you get accurate and reliable advice.</p>
                        <div className="card-icon"><FaStethoscope /></div>
                    </Card>
                    <Card title="Holistic Approach" className="feature-card">
                        <p>We focus on the whole person—physical, mental, and emotional well-being—because health is more than just the absence of disease.</p>
                        <div className="card-icon"><FaHeartbeat /></div>
                    </Card>
                    <Card title="Safe Community" className="feature-card">
                        <p>Join a supportive, judgment-free environment where you can share experiences and learn from others on similar journeys.</p>
                        <div className="card-icon"><FaUsers /></div>
                    </Card>
                </div>
            </section>

            {/* 3. CHAPTERS SLIDER (Horizontal Scroll-Jacking) */}
            <section ref={sliderRef} className="chapters-preview">
                <div className="chapters-header">
                    <h2 className="section-title">Latest Chapters</h2>
                </div>
                <div className="soft-frame-top"></div>

                <div ref={sliderContainerRef} className="chapters-scroll-container">
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

                    {/* See All Chapters Card */}
                    <div className="chapter-slide">
                        <Link to="/chapters" className="see-more-card">
                            <div className="see-more-content">
                                <span className="see-more-text">See All Chapters</span>
                                <div className="see-more-icon-wrapper">
                                    <FaArrowRight />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="soft-frame-bottom"></div>
            </section>

            {/* CTA Footer */}
            <section className="cta-section">
                <h2 className="section-title">Ready to take control?</h2>
                <Link to="/resources" className="btn-primary pulse-btn btn-tilt">Open Symptom Tracker</Link>
            </section>

            <style>{`
        .home-page {
          overflow-x: hidden;
          background: var(--bg-color);
        }

        /* HERO SECTION STYLES */
        .hero-section {
          height: 100vh;
          width: 100%;
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
            background: linear-gradient(-45deg, #fff5f7, #fae8f1, #ffd3e2, #fff0f5);
            background-size: 400% 400%;
            animation: moving-gradient 15s ease infinite;
            z-index: 0; 
        }
        
        .layer-grid { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; transform-style: preserve-3d; }
        .grid-plane { position: absolute; bottom: -50%; left: -50%; width: 200%; height: 200%; background-image: linear-gradient(var(--tron-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--tron-grid-color) 1px, transparent 1px); background-size: 80px 80px; opacity: 0.5; mask-image: linear-gradient(to top, black 20%, transparent 80%); }
        .layer-particles { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .soft-particle { position: absolute; border-radius: 50%; filter: blur(2px); }
        .hero-ui { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
        .ui-circle { position: absolute; border-radius: 50%; border: 1px solid var(--accent-cyan); opacity: 0.1; }
        .circle-1 { width: 600px; height: 600px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .circle-2 { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%, -50%); border-style: dashed; }
        .circle-3 { width: 800px; height: 800px; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px dotted var(--accent-purple); animation: spin 60s linear infinite; }
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }

        .hero-content { position: relative; z-index: 5; text-align: center; max-width: 900px; padding: 0 20px; }
        .hero-title { 
            font-size: 5rem; 
            line-height: 1.1; 
            margin-bottom: 2rem; 
            color: var(--text-color); 
            font-weight: 800; 
            font-family: var(--font-header);
            animation: pulseText 4s ease-in-out infinite;
        }
        
        @keyframes pulseText {
            0%, 100% { text-shadow: 0 0 20px rgba(255, 122, 162, 0.1); }
            50% { text-shadow: 0 0 40px rgba(255, 122, 162, 0.3); }
        }

        .text-gradient { background: linear-gradient(to right, var(--primary-pink), var(--secondary-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.5rem; color: #64748b; margin: 0 auto 3rem; font-family: var(--font-body); max-width: 600px; }
        .hero-cta { display: flex; gap: 1rem; justify-content: center; }
        
        .btn-primary { 
            padding: 1rem 2.5rem; 
            background: var(--primary-pink); 
            color: white; 
            border-radius: 50px; 
            font-weight: 700; 
            text-decoration: none; 
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            box-shadow: 0 10px 20px -5px rgba(255, 122, 162, 0.4); 
            display: inline-block; 
        }
        
        .btn-primary:hover { 
            transform: scale(1.03) translateY(-2px); 
            box-shadow: 0 20px 40px -5px rgba(255, 122, 162, 0.6); 
            background: var(--accent-blue);
        }
        
        .btn-secondary { padding: 1rem 2.5rem; background: white; color: var(--text-color); border: 1px solid #e2e8f0; border-radius: 50px; font-weight: 700; text-decoration: none; transition: all 0.3s; display: inline-block; }
        .btn-secondary:hover { background: #f8fafc; border-color: var(--primary-pink); color: var(--primary-pink); }

        /* HIGHLIGHTS SECTION */
        .highlights-section { padding: 40px 5%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 10; }
        .section-header { margin-bottom: 30px; text-align: center; }
        .section-title { font-size: 3rem; font-family: var(--font-header); color: var(--text-color); margin-bottom: 1rem; }
        .header-line { width: 100px; height: 4px; background: var(--primary-pink); margin: 0 auto; border-radius: 2px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .feature-card { height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
        .card-icon { font-size: 3rem; color: var(--accent-cyan); margin-top: 2rem; opacity: 0.2; align-self: flex-end; }

        /* CHAPTERS HORIZONTAL SCROLL */
        .chapters-preview { 
            height: 100vh; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            overflow: hidden; 
            background: #fff; 
            position: relative; 
        }
        .chapters-header { padding: 0 5%; margin-bottom: 50px; z-index: 2; }
        
        .chapters-scroll-container {
            display: flex;
            gap: 40px;
            padding: 20px 5%;
            width: max-content; /* Ensure container is wide enough */
            z-index: 2;
        }
        /* Removed overflow-x: auto to prevent manual scroll */
        
        .chapter-slide { 
            min-width: 300px; 
            width: 350px;
            height: 450px; 
            flex-shrink: 0;
            position: relative; 
        }
        
        .slide-content { display: flex; flex-direction: column; height: 100%; }
        .slide-icon { font-size: 2.5rem; color: var(--accent-purple); margin-bottom: 1.5rem; }
        .read-more { margin-top: auto; color: var(--primary-pink); font-weight: 700; text-decoration: none; }

        /* See More Card */
        .see-more-card {
            display: flex;
            height: 100%;
            width: 100%;
            background: linear-gradient(135deg, var(--soft-pink), #fff);
            border-radius: 20px;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            border: 2px dashed var(--primary-pink);
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px -10px rgba(255, 122, 162, 0.2);
        }
        .see-more-card:hover {
            transform: scale(1.02) translateY(-5px);
            box-shadow: 0 20px 40px -10px rgba(255, 122, 162, 0.4);
            background: #fff;
        }
        .see-more-content {
            text-align: center;
            color: var(--primary-pink);
        }
        .see-more-text {
            display: block;
            font-size: 1.5rem;
            font-weight: 800;
            font-family: var(--font-header);
            margin-bottom: 1rem;
        }
        .see-more-icon-wrapper {
            font-size: 2rem;
            transition: transform 0.3s ease;
        }
        .see-more-card:hover .see-more-icon-wrapper {
            transform: translateX(10px);
        }

        .soft-frame-top, .soft-frame-bottom { position: absolute; left: 0; width: 100%; height: 40px; background: repeating-linear-gradient(90deg, var(--accent-cyan), var(--accent-cyan) 2px, transparent 2px, transparent 20px); opacity: 0.1; }
        .soft-frame-top { top: 0; }
        .soft-frame-bottom { bottom: 0; }

        /* CTA SECTION */
        .cta-section { padding: 150px 20px; text-align: center; background: radial-gradient(circle at center, rgba(255, 122, 162, 0.05), transparent 70%); }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .chapters-preview { height: auto; padding: 100px 0; }
          .chapters-scroll-container { 
              padding: 20px 20px; 
              gap: 20px; 
          }
          .chapter-slide { width: 85vw; min-width: 85vw; height: 400px; }
          .ui-circle { width: 300px; height: 300px; }
        }
      `}</style>
        </div>
    );
};

export default Home;
