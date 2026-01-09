import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Chapters', path: '/chapters' },
        { name: 'Resources', path: '/resources' },
        { name: 'Find Doctors', path: '/find-doctors' },
        { name: 'Videos', path: '/videos' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full border border-white/20 px-6 py-3 ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-md py-3'
                : 'bg-white/40 backdrop-blur-sm shadow-sm py-4'
                }`}
        >
            <div className="w-full">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-[var(--secondary-color)] p-2 rounded-full text-[var(--primary-color)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[20deg] group-hover:scale-110 group-hover:bg-rose-50">
                            <FaHeartbeat className="text-xl" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[var(--text-main)] font-display transition-colors duration-300 group-hover:text-rose-700">
                            Her<span className="text-[var(--primary-color)]">Health</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out overflow-hidden group ${location.pathname === link.path
                                    ? 'bg-[var(--secondary-color)] text-[var(--primary-color)] shadow-sm'
                                    : 'text-[var(--text-muted)] hover:text-rose-600'
                                    }`}
                            >
                                <span className={`absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${location.pathname === link.path ? 'hidden' : ''}`}></span>
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            to="/resources"
                            className="btn-primary text-sm px-6 py-2.5 shadow-soft hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-white no-underline"
                        >
                            Get Tracker
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ease-in-out transform origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'
                    }`}
            >
                <div className="px-4 py-6 space-y-2 flex flex-col items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`block w-full text-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${location.pathname === link.path
                                ? 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
                                : 'text-[var(--text-muted)] hover:bg-gray-50'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 w-full">
                        <Link
                            to="/resources"
                            className="block w-full text-center btn-primary py-3 text-white"
                        >
                            Get Tracker
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;