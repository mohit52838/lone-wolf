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
                <div className="mobile-menu-overlay md:hidden" onClick={() => setIsOpen(false)}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <link.icon className="mobile-icon" />
                                {link.name}
                            </Link>
                        ))}
                    </div>
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
                .mobile-icon {
                    font-size: 1.4rem;
                    color: var(--secondary-pink);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;