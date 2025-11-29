import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import {
    FiHome,
    FiBookOpen,
    FiPlayCircle,
    FiLayers,
    FiHeart,
    FiInfo,
    FiMenu,
    FiX
} from 'react-icons/fi';

const Navbar = () => {
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState(null);

    // GSAP Entrance & Scroll Listener
    useEffect(() => {
        // Entrance
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
        );

        // Scroll Handler
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Spotlight Effect
    const handleMouseMove = (e) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        navRef.current.style.setProperty('--mouse-x', `${x}px`);
        navRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: FiHome },
        { name: 'Chapters', path: '/chapters', icon: FiBookOpen },
        { name: 'Videos', path: '/videos', icon: FiPlayCircle },
        { name: 'Resources', path: '/resources', icon: FiLayers },
        { name: 'Find Doctors', path: '/find-doctors', icon: FiHeart },
        { name: 'About', path: '/about', icon: FiInfo },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            ref={navRef}
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Overlay */}
            <div className="spotlight-overlay"></div>

            <div className="logo-container">
                <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
                    <span className="logo-emoji">🌸</span>
                    <span className="logo-text">Her<span className="logo-accent">Health</span></span>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className="nav-links hidden md:flex">
                {navLinks.map((link) => (
                    <li key={link.name} className="nav-item">
                        <Link
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span className="relative z-10">{link.name}</span>

                            {/* Liquid Swipe Background */}
                            {hoveredLink === link.name && (
                                <span className="liquid-bg" />
                            )}

                            {/* Active Dot */}
                            {isActive(link.path) && (
                                <span className="active-dot" />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Toggle */}
            <button
                className="mobile-toggle md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <link.icon className="mobile-icon" />
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
                .navbar {
                    position: fixed;
                    top: 15px; /* Between mobile (10px) and desktop (20px) */
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90%;
                    max-width: 1000px;
                    padding: 0.8rem 2rem; /* Balanced padding */
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 45px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 8px 25px -8px rgba(255, 122, 162, 0.1);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                }

                .navbar.scrolled {
                    top: 10px;
                    padding: 0.6rem 1.5rem;
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 12px 30px -5px rgba(255, 122, 162, 0.2);
                    width: 95%;
                }

                /* Spotlight Effect */
                .spotlight-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        600px circle at var(--mouse-x) var(--mouse-y),
                        rgba(255, 122, 162, 0.08),
                        transparent 40%
                    );
                    pointer-events: none;
                    z-index: 0;
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                    position: relative;
                    z-index: 10;
                }

                .logo-emoji {
                    font-size: 1.7rem; /* Balanced size */
                    transition: transform 0.3s ease;
                }
                
                .logo-link:hover .logo-emoji {
                    transform: rotate(20deg) scale(1.1);
                }

                .logo-text {
                    font-family: var(--font-header);
                    font-size: 1.4rem; /* Balanced size */
                    font-weight: 800;
                    color: var(--text-color);
                    letter-spacing: -0.5px;
                }

                .logo-accent {
                    color: var(--primary-pink);
                }

                .nav-links {
                    display: flex;
                    gap: 0.3rem; /* Tighter gap for tablet */
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    z-index: 10;
                }

                .nav-item {
                    position: relative;
                }

                .nav-link {
                    color: var(--text-color);
                    text-decoration: none;
                    font-family: var(--font-body);
                    font-size: 0.9rem; /* Slightly smaller font */
                    font-weight: 600;
                    position: relative;
                    padding: 0.5rem 1rem; /* Reduced padding */
                    border-radius: 25px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .nav-link:hover {
                    color: var(--primary-pink);
                    text-shadow: 0 0 15px rgba(255, 122, 162, 0.5);
                    transform: translateY(-1px);
                }
                
                .nav-link.active {
                    color: var(--primary-pink);
                }

                /* Liquid Swipe Background */
                .liquid-bg {
                    position: absolute;
                    inset: 0;
                    background: rgba(255, 122, 162, 0.1);
                    border-radius: 30px;
                    z-index: 0;
                    animation: liquidIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    filter: blur(4px);
                }

                @keyframes liquidIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                /* Active Dot & Underline */
                .active-dot {
                    position: absolute;
                    bottom: 4px; /* Adjusted */
                    left: 50%;
                    transform: translateX(-50%);
                    width: 16px; /* Smaller dot */
                    height: 3px;
                    background: var(--primary-pink);
                    border-radius: 2px;
                    box-shadow: 0 0 10px var(--primary-pink);
                    animation: widthGrow 0.3s ease-out forwards;
                }

                @keyframes widthGrow {
                    from { width: 0; opacity: 0; }
                    to { width: 16px; opacity: 1; }
                }

                .mobile-toggle {
                    display: none; /* Ensure hidden on tablet if we use desktop layout, or show if we want hamburger */
                }
                
                /* If screen is smaller tablet (e.g. portrait), we might want hamburger. 
                   But for now, assuming tablet uses desktop-like navbar as per plan. */
                @media (max-width: 768px) {
                    .nav-links { display: none; }
                    .mobile-toggle { display: block; font-size: 1.5rem; background: none; border: none; cursor: pointer; color: var(--text-color); }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
