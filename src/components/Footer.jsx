import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-pink-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-2xl font-extrabold text-brand-primary font-display tracking-tight flex items-center gap-2 mb-6">
                            <span className="text-3xl">🌸</span> HerHealth
                        </Link>
                        <p className="text-slate-500 text-base leading-relaxed max-w-sm mb-6">
                            Empowering women through knowledge. A safe, judgment-free space to learn about your body, health, and well-being.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders if needed, or just keep it clean */}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 font-display text-lg">Platform</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link to="/chapters" className="hover:text-brand-primary transition-colors">Library</Link></li>
                            <li><Link to="/videos" className="hover:text-brand-primary transition-colors">Videos</Link></li>
                            <li><Link to="/resources" className="hover:text-brand-primary transition-colors">Resources</Link></li>
                            <li><Link to="/find-doctors" className="hover:text-brand-primary transition-colors">Find Doctors</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 font-display text-lg">Company</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} HerHealth Platform. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-400 flex items-center gap-1">
                        Made with <FaHeart className="text-pink-400" /> for women everywhere.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
