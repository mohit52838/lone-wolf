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
    FiX,
    FiMic
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
        { name: 'Expert Talks', path: '/expert-talks', icon: FiMic },
        { name: 'Resources', path: '/resources', icon: FiLayers },
        { name: 'Guidance', path: '/guidance', icon: FiLayers },
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
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 95%;
                    max-width: 1200px;
                    padding: 1rem 2.5rem;
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 10px 30px -10px rgba(255, 122, 162, 0.1);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                }

                .navbar.scrolled {
                    top: 10px;
                    padding: 0.5rem 1.75rem;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 10px 30px -5px rgba(255, 122, 162, 0.15);
                    width: 90%;
                    max-width: 1000px;
                }
                
                .navbar.scrolled .nav-link {
                    font-size: 0.85rem;
                    padding: 0.4rem 0.8rem;
                }
                
                .navbar.scrolled .logo-text {
                    font-size: 1.25rem;
                }
                
                .navbar.scrolled .logo-emoji {
                    font-size: 1.4rem;
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
                    font-size: 1.8rem;
                    transition: transform 0.3s ease;
                }
                
                .logo-link:hover .logo-emoji {
                    transform: rotate(20deg) scale(1.1);
                }

                .logo-text {
                    font-family: var(--font-header);
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--text-color);
                    letter-spacing: -0.5px;
                }

                .logo-accent {
                    color: var(--primary-pink);
                }

                .nav-links {
                    display: flex;
                    gap: 0.5rem;
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
                    font-size: 0.95rem;
                    font-weight: 600;
                    position: relative;
                    padding: 0.6rem 1.2rem;
                    border-radius: 30px;
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
                    bottom: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 3px;
                    background: var(--primary-pink);
                    border-radius: 2px;
                    box-shadow: 0 0 10px var(--primary-pink);
                    animation: widthGrow 0.3s ease-out forwards;
                }

                @keyframes widthGrow {
                    from { width: 0; opacity: 0; }
                    to { width: 20px; opacity: 1; }
                }

                .mobile-toggle {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    cursor: pointer;
                    position: relative;
                    z-index: 10;
                }

                .mobile-menu {
                    position: absolute;
                    top: 120%;
                    left: 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 24px;
                    padding: 1rem;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .mobile-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 12px;
                    text-decoration: none;
                    color: var(--text-color);
                    font-weight: 600;
                    transition: background 0.2s;
                    animation: fadeIn 0.4s ease forwards;
                    opacity: 0;
                }
                
                .mobile-link:nth-child(1) { animation-delay: 0.1s; }
                .mobile-link:nth-child(2) { animation-delay: 0.15s; }
                .mobile-link:nth-child(3) { animation-delay: 0.2s; }
                .mobile-link:nth-child(4) { animation-delay: 0.25s; }
                .mobile-link:nth-child(5) { animation-delay: 0.3s; }
                .mobile-link:nth-child(6) { animation-delay: 0.35s; }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                .mobile-link:hover, .mobile-link.active {
                    background: var(--soft-pink);
                    color: var(--primary-pink);
                }
                
                .mobile-link.active .mobile-icon {
                    color: var(--primary-pink);
                }

                .mobile-icon {
                    font-size: 1.2rem;
                    color: var(--secondary-pink);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;