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
            font - weight: 500;
        text - decoration: none;
        border - radius: 20px;
        transition: color 0.3s ease;
        display: flex;
        align - items: center;
        font - size: 0.95rem; /* Slightly smaller font for tablet */
    }

                .nav - link: hover, .nav - link.active {
    color: var(--primary - pink);
}

                .active - dot {
    position: absolute;
    bottom: 6px;
    left: 50 %;
    transform: translateX(-50 %);
    width: 4px;
    height: 4px;
    background - color: var(--primary - pink);
    border - radius: 50 %;
}

                .mobile - toggle {
    background: none;
    border: none;
    font - size: 1.8rem;
    color: var(--text - color);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align - items: center;
    justify - content: center;
    z - index: 1001;
}

                /* Mobile Menu Overlay */
                .mobile - menu - overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    backdrop - filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z - index: 998;
    display: flex;
    justify - content: flex - end; /* Align menu to right */
}

                .mobile - menu - overlay.open {
    opacity: 1;
    visibility: visible;
}

                /* Mobile Menu Content */
                .mobile - menu {
    width: 80 %;
    max - width: 300px;
    height: 100 %;
    background: rgba(255, 255, 255, 0.98);
    padding: 6rem 2rem 2rem;
    display: flex;
    flex - direction: column;
    gap: 1rem;
    box - shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
    transform: translateX(100 %);
    transition: transform 0.4s cubic - bezier(0.16, 1, 0.3, 1);
}

                .mobile - menu.open {
    transform: translateX(0);
}

                .mobile - link {
    display: flex;
    align - items: center;
    gap: 1rem;
    padding: 1rem;
    font - size: 1.1rem;
    font - weight: 600;
    color: var(--text - color);
    text - decoration: none;
    border - radius: 12px;
    transition: all 0.2s ease;
}

                .mobile - link: hover, .mobile - link.active {
    background: var(--bg - pink);
    color: var(--primary - pink);
    transform: translateX(5px);
}

                .mobile - icon {
    font - size: 1.4rem;
    color: var(--secondary - pink);
}

/* Tablet Adjustments (768px - 1024px) */
@media(min - width: 768px) and(max - width: 1024px) {
                    .navbar {
        width: 90 %;
        padding: 0.8rem 1.5rem;
    }
                    
                    .nav - links {
        gap: 0.2rem;
    }
                    
                    .nav - link {
        padding: 0.5rem 0.8rem;
        font - size: 0.9rem;
    }
                    
                    .logo - text {
        font - size: 1.3rem;
    }
}
`}</style>
            </nav>
        );
    };

    export default Navbar;