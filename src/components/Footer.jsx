import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-[var(--secondary-color)] pt-8 pb-6 relative z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Column 1: Brand & Mission */}
                    <div className="col-span-1">
                        <Link to="/" className="text-xl font-extrabold text-[var(--primary-color)] font-display tracking-tight flex items-center gap-2 mb-3">
                            <span className="text-2xl">🌸</span> HerHealth
                        </Link>
                        <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                            Empowering women through knowledge. A safe, judgment-free space to learn about your body, health, and well-being.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-3 font-display text-base">Quick Links</h4>
                        <ul className="space-y-1 text-slate-500 text-xs">
                            <li><Link to="/" className="hover:text-[var(--primary-color)] transition-colors">Home</Link></li>
                            <li><Link to="/chapters" className="hover:text-[var(--primary-color)] transition-colors">Chapters</Link></li>
                            <li><Link to="/videos" className="hover:text-[var(--primary-color)] transition-colors">Videos</Link></li>
                            <li><Link to="/resources" className="hover:text-[var(--primary-color)] transition-colors">Resources</Link></li>
                            <li><Link to="/find-doctors" className="hover:text-[var(--primary-color)] transition-colors">Find Doctors</Link></li>
                            <li><Link to="/about" className="hover:text-[var(--primary-color)] transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Disclaimer */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-3 font-display text-base">Disclaimer</h4>
                        <p className="text-slate-400 text-[10px] leading-relaxed">
                            The content on HerHealth is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-slate-400">
                        &copy; {new Date().getFullYear()} HerHealth Platform. All rights reserved.
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        Made with <FaHeart className="text-pink-400" /> for women everywhere.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
