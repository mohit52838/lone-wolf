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
    const location = useLocation();

    // GSAP Entrance Animation (Ported from Template)
    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }, []);

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
        <nav ref={navRef} className="navbar">
            <div className="logo-container">
                <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
                    <span className="logo-emoji">🌸</span>
                    <span className="logo-text">Her<span className="logo-accent">Health</span></span>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className="nav-links hidden md:flex">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                        >
                            {link.name}
                            <span className="link-underline"></span>
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

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 95%;
                    max-width: 1200px;
                    padding: 0.8rem 2rem;
                    background: var(--glass-bg);
                    backdrop-filter: blur(16px);
                    border: 1px solid var(--glass-border);
                    border-radius: 50px; /* Pill shape */
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 10px 30px -10px rgba(236, 64, 122, 0.1);
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                }

                .logo-emoji {
                    font-size: 1.8rem;
                }

                .logo-text {
                    font-family: var(--font-header);
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--text-color);
                    letter-spacing: -0.5px;
                }

                .logo-accent {
                    color: var(--accent-blue);
                }

                .nav-links {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-link {
                    color: var(--text-color);
                    text-decoration: none;
                    font-family: var(--font-body);
                    font-size: 0.95rem;
                    font-weight: 600;
                    position: relative;
                    transition: color 0.3s ease;
                    padding: 0.5rem 0;
                }

                .nav-link:hover, .nav-link.active {
                    color: var(--accent-blue);
                }

                .link-underline {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--accent-blue);
                    transition: width 0.3s ease;
                    border-radius: 2px;
                }

                .nav-link:hover .link-underline, .nav-link.active .link-underline {
                    width: 100%;
                }

                .mobile-toggle {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    cursor: pointer;
                }

                .mobile-menu {
                    position: absolute;
                    top: 110%;
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
                }

                .mobile-link:hover, .mobile-link.active {
                    background: var(--accent-cyan);
                    color: white;
                }
                
                .mobile-link.active .mobile-icon {
                    color: white;
                }

                .mobile-icon {
                    font-size: 1.2rem;
                    color: var(--accent-blue);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;