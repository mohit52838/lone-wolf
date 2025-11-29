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
                duration: `random(10, 25)`,
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

        // 5. Horizontal Scroll (Native-friendly with Wheel Support)
        const container = sliderContainerRef.current;
        let handleWheel;

        if (container) {
            handleWheel = (e) => {
                // Only hijack scroll if we have horizontal content to scroll
                if (container.scrollWidth > container.clientWidth) {
                    // Prevent vertical scroll
                    e.preventDefault();

                    // Calculate target scroll position
                    // Multiplier 3.0 for fast but controlled speed
                    const scrollAmount = e.deltaY * 3.0;
                    const currentScroll = container.scrollLeft;
                    let targetScroll = currentScroll + scrollAmount;

                    // Clamp target to bounds
                    targetScroll = Math.max(0, Math.min(targetScroll, container.scrollWidth - container.clientWidth));

                    // Use GSAP for smooth scrolling
                    gsap.to(container, {
                        scrollLeft: targetScroll,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    });
                }
            };

            // Add non-passive listener to allow preventDefault
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container && handleWheel) {
                container.removeEventListener('wheel', handleWheel);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Show latest 5 chapters for mobile to keep page length manageable
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
                    {
                        [...Array(30)].map((_, i) => ( // Reduced particles for mobile performance
                            <div key={i} className="soft-particle" style={{
                                left: `${Math.random() * 100}%`,
                                top: '110%',
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                opacity: Math.random() * 0.3 + 0.1,
                                backgroundColor: i % 3 === 0 ? 'var(--accent-cyan)' : (i % 3 === 1 ? 'var(--accent-purple)' : '#fff')
                            }}></div>
                        ))
                    }
                </div>

                {/* Layer 4: Soft Overlay */}
                <div className="layer-overlay"></div>

                <div ref={contentRef} className="hero-content">
                    <h1 ref={titleRef} className="hero-title">
                        Empowering <br />
                        <span className="text-gradient">Women.</span>
                    </h1>
                    <p ref={subtitleRef} className="hero-subtitle">
                        Your trusted companion for menstrual health, reproductive wellness, and holistic self-care.
                    </p>
                    <div className="hero-cta">
                        <Link to="/chapters" className="btn-primary btn-tilt">Start Learning</Link>
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
                        <p>Access medically verified information curated by health professionals.</p>
                        <div className="card-icon"><FaStethoscope /></div>
                    </Card>
                    <Card title="Holistic Approach" className="feature-card">
                        <p>We focus on physical, mental, and emotional well-being.</p>
                        <div className="card-icon"><FaHeartbeat /></div>
                    </Card>
                    <Card title="Safe Community" className="feature-card">
                        <p>A supportive, judgment-free environment to share experiences.</p>
                        <div className="card-icon"><FaUsers /></div>
                    </Card>
                </div>
            </section>

            {/* 3. CHAPTERS SLIDER (Horizontal Snap Scroll) */}
            <section ref={sliderRef} className="chapters-preview">
                <div className="chapters-header">
                    <h2 className="section-title">Latest Chapters</h2>
                    <p className="text-sm text-gray-500 mt-2">Swipe to explore</p>
                </div>

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
            </section>

            {/* CTA Footer */}
            <section className="cta-section">
                <h2 className="section-title mb-4">Ready to take control?</h2>
                <Link to="/resources#symptom-tracker" className="btn-primary pulse-btn btn-tilt w-full block text-center">Open Symptom Tracker</Link>
            </section>

            <style>{`
        .home-page {
          background: var(--bg-color);
          overflow-x: hidden; /* Prevent horizontal scroll on body */
        }

        /* HERO SECTION STYLES */
        .hero-section {
          min-height: 90vh; /* Reduced height for mobile */
          width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 60px; /* Account for navbar */
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
        .grid-plane { position: absolute; bottom: -50%; left: -50%; width: 200%; height: 200%; background-image: linear-gradient(var(--tron-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--tron-grid-color) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.3; mask-image: linear-gradient(to top, black 20%, transparent 80%); }
        .layer-particles { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .soft-particle { position: absolute; border-radius: 50%; filter: blur(2px); }

        .hero-content { position: relative; z-index: 5; text-align: center; max-width: 100%; padding: 0 20px; }
        .hero-title { 
            font-size: 3.5rem; /* Smaller font for mobile */
            line-height: 1.1; 
            margin-bottom: 1.5rem; 
            color: var(--text-color); 
            font-weight: 800; 
            font-family: var(--font-header);
        }
        
        .text-gradient { background: linear-gradient(to right, var(--primary-pink), var(--secondary-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.1rem; color: #64748b; margin: 0 auto 2.5rem; font-family: var(--font-body); max-width: 100%; line-height: 1.6; }
        .hero-cta { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
        
        .btn-primary { 
            padding: 1rem 2rem; 
            background: var(--primary-pink); 
            color: white; 
            border-radius: 50px; 
            font-weight: 700; 
            text-decoration: none; 
            transition: all 0.3s; 
            box-shadow: 0 10px 20px -5px rgba(255, 122, 162, 0.4); 
            display: block;
            width: 100%;
            text-align: center;
        }
        
        /* HIGHLIGHTS SECTION */
        .highlights-section { padding: 60px 20px; position: relative; z-index: 10; }
        .section-header { margin-bottom: 30px; text-align: center; }
        .section-title { font-size: 2.2rem; font-family: var(--font-header); color: var(--text-color); margin-bottom: 0.5rem; }
        .header-line { width: 60px; height: 3px; background: var(--primary-pink); margin: 0 auto; border-radius: 2px; }
        .features-grid { display: flex; flex-direction: column; gap: 20px; }
        .feature-card { padding: 1.5rem; }
        .card-icon { font-size: 2.5rem; color: var(--accent-cyan); margin-top: 1.5rem; opacity: 0.2; align-self: flex-end; }

        /* CHAPTERS HORIZONTAL SCROLL */
        .chapters-preview { 
            padding: 60px 0; 
            background: #fff; 
            position: relative; 
            overflow: hidden;
        }
        .chapters-header { padding: 0 20px; margin-bottom: 30px; text-align: center; }
        
        .chapters-scroll-container {
            display: flex;
            gap: 15px;
            padding: 10px 20px 30px 20px; /* Bottom padding for shadow */
            width: 100%;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none; /* Firefox */
        }
        .chapters-scroll-container::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
        }
        
        .chapter-slide { 
            min-width: 85vw; /* Show mostly one card */
            width: 85vw;
            height: 400px; 
            flex-shrink: 0;
            position: relative; 
            scroll-snap-align: center;
        }
        
        .slide-content { display: flex; flex-direction: column; height: 100%; }
        .slide-icon { font-size: 2rem; color: var(--accent-purple); margin-bottom: 1rem; }
        .read-more { margin-top: auto; color: var(--primary-pink); font-weight: 700; text-decoration: none; padding: 10px 0; display: block; }

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
            box-shadow: 0 5px 15px rgba(255, 122, 162, 0.1);
        }
        .see-more-text {
            display: block;
            font-size: 1.2rem;
            font-weight: 800;
            font-family: var(--font-header);
            margin-bottom: 0.5rem;
        }

        /* CTA SECTION */
        .cta-section { padding: 80px 20px; text-align: center; background: radial-gradient(circle at center, rgba(255, 122, 162, 0.05), transparent 70%); }
      `}</style>
        </div>
    );
};

export default Home;
