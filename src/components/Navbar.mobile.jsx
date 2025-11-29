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
                    top: 10px; /* Reduced from 20px */
                    left: 50%;
                    transform: translateX(-50%);
                    width: 92%; /* Slightly wider on mobile */
                    max-width: 1200px;
                    padding: 0.8rem 1.5rem; /* Reduced padding */
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 40px; /* Slightly smaller radius */
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 5px 20px -5px rgba(255, 122, 162, 0.1);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: visible; /* Changed to visible to allow menu overflow if needed */
                }

                .navbar.scrolled {
                    top: 5px; /* Reduced from 10px */
                    padding: 0.6rem 1.2rem;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 10px 25px -5px rgba(255, 122, 162, 0.2);
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
                    border-radius: 40px;
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
                    font-size: 1.6rem; /* Slightly smaller */
                    transition: transform 0.3s ease;
                }
                
                .logo-link:hover .logo-emoji {
                    transform: rotate(20deg) scale(1.1);
                }

                .logo-text {
                    font-family: var(--font-header);
                    font-size: 1.3rem; /* Slightly smaller */
                    font-weight: 800;
                    color: var(--text-color);
                    letter-spacing: -0.5px;
                }

                .logo-accent {
                    color: var(--primary-pink);
                }

                .mobile-toggle {
                    background: none;
                    border: none;
                    font-size: 1.8rem; /* Larger icon */
                    color: var(--text-color);
                    cursor: pointer;
                    position: relative;
                    z-index: 10;
                    padding: 0.5rem; /* Larger tap target */
                    margin-right: -0.5rem; /* Compensate for padding */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-menu {
                    position: absolute;
                    top: calc(100% + 10px); /* Position below navbar */
                    left: 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(25px);
                    border-radius: 24px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 122, 162, 0.1);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: top center;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .mobile-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.2rem; /* Larger touch area */
                    border-radius: 16px;
                    text-decoration: none;
                    color: var(--text-color);
                    font-weight: 600;
                    font-size: 1.1rem; /* Larger text */
                    transition: all 0.2s;
                    animation: fadeIn 0.4s ease forwards;
                    opacity: 0;
                    background: rgba(255, 255, 255, 0.5);
                }
                
                .mobile-link:nth-child(1) { animation-delay: 0.05s; }
                .mobile-link:nth-child(2) { animation-delay: 0.1s; }
                .mobile-link:nth-child(3) { animation-delay: 0.15s; }
                .mobile-link:nth-child(4) { animation-delay: 0.2s; }
                .mobile-link:nth-child(5) { animation-delay: 0.25s; }
                .mobile-link:nth-child(6) { animation-delay: 0.3s; }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                .mobile-link:hover, .mobile-link.active {
                    background: var(--soft-pink);
                    color: var(--primary-pink);
                    transform: scale(1.02);
                }
                
                .mobile-link.active .mobile-icon {
                    color: var(--primary-pink);
                }

                .mobile-icon {
                    font-size: 1.4rem;
                    color: var(--secondary-pink);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
