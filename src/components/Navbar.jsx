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
    FiMic,
    FiCheckCircle,
    FiChevronDown,
    FiBookmark
} from 'react-icons/fi';

const Navbar = () => {
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

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

    const primaryLinks = [
        { name: 'Home', path: '/', icon: FiHome },
        { name: 'Chapters', path: '/chapters', icon: FiBookOpen },
        { name: 'Videos', path: '/videos', icon: FiPlayCircle },
        { name: 'Expert Talks', path: '/expert-talks', icon: FiMic },
        { name: 'Guidance', path: '/guidance', icon: FiLayers },
        { name: 'Find Doctors', path: '/find-doctors', icon: FiHeart },
    ];

    const secondaryLinks = [
        { name: 'Your Library', path: '/library', icon: FiBookmark },
        { name: 'Resources', path: '/resources', icon: FiLayers },
        { name: 'Our Sources', path: '/sources', icon: FiCheckCircle },
        { name: 'About', path: '/about', icon: FiInfo },
    ];

    const isActive = (path) => location.pathname === path;
    const isMoreActive = secondaryLinks.some(link => isActive(link.path));

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
            <ul className="nav-links hidden md:flex items-center">
                {primaryLinks.map((link) => (
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

                {/* More Dropdown */}
                <li
                    className="nav-item relative"
                    onMouseEnter={() => setIsMoreOpen(true)}
                    onMouseLeave={() => setIsMoreOpen(false)}
                >
                    <button
                        className={`nav-link ${isMoreActive ? 'active' : ''} flex items-center gap-1`}
                    >
                        <span className="relative z-10 flex flex-col items-center">
                            More
                            {/* Active Dot for Parent - positioned relative to text */}
                            {isMoreActive && (
                                <span className="active-dot" style={{ bottom: '-6px' }} />
                            )}
                        </span>
                        <FiChevronDown className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className={`absolute top-full right-0 pt-4 w-48 transition-all duration-300 transform origin-top-right ${isMoreOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                    >
                        <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-2 shadow-xl flex flex-col gap-1">
                            {secondaryLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(link.path) ? 'bg-pink-50 text-[var(--primary-pink)]' : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--primary-pink)]'}`}
                                >
                                    <link.icon />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </li>
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
                    {[...primaryLinks, ...secondaryLinks].map((link) => (
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
                    max-width: 1250px;
                    padding: 0.8rem 2rem;
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
                    /* overflow: hidden; Removed to allow dropdown overflow */
                }

                .navbar.scrolled {
                    top: 10px;
                    padding: 0.6rem 2rem;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 10px 30px -5px rgba(255, 122, 162, 0.15);
                    width: 92%;
                    max-width: 1200px;
                }
                
                .navbar.scrolled .nav-link {
                    font-size: 0.9rem;
                    padding: 0.5rem 1rem;
                }
                
                .navbar.scrolled .logo-text {
                    font-size: 1.35rem;
                }
                
                .navbar.scrolled .logo-emoji {
                    font-size: 1.5rem;
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
                    z-index: -1; /* Moved behind content */
                    border-radius: 50px;
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
                    /* display: flex; handled by tailwind classes */
                    gap: 1.5rem;
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
                    padding: 0.6rem 1.0rem;
                    border-radius: 30px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    border: none;
                    cursor: pointer;
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
                
                .mobile-link:nth-child(n) { animation-delay: 0.1s; }

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