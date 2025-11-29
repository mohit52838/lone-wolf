import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Column 1: Brand & Mission */}
                <div className="footer-brand">
                    <Link to="/" className="text-xl font-extrabold text-brand-primary font-display tracking-tight flex items-center gap-2 mb-3">
                        <span className="text-2xl">🌸</span> <h3 className="inline m-0">HerHealth</h3>
                    </Link>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                        Empowering women through knowledge. A safe, judgment-free space to learn about your body, health, and well-being.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/chapters">Chapters</Link></li>
                        <li><Link to="/videos">Videos</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                        <li><Link to="/find-doctors">Find Doctors</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>

                {/* Column 3: Disclaimer */}
                <div className="footer-section">
                    <h4>Disclaimer</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed">
                        The content on HerHealth is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} HerHealth Platform. All rights reserved.
                </p>
                <p className="flex items-center justify-center gap-1 mt-2">
                    Made with <FaHeart className="text-pink-400" /> for women everywhere.
                </p>
            </div>

            <style>{`
                .footer {
                    background: #fff;
                    padding: 80px 5% 40px;
                    border-top: 1px solid rgba(230, 0, 126, 0.1);
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 40px;
                }
                
                .footer-brand h3 {
                    font-family: var(--font-header);
                    font-size: 1.8rem;
                    color: var(--primary-pink);
                }
                
                .footer-section h4 {
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: var(--text-color);
                }
                
                .footer-section ul {
                    list-style: none;
                    padding: 0;
                }
                
                .footer-section li {
                    margin-bottom: 0.8rem;
                }
                
                .footer-section a {
                    color: var(--text-body);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-section a:hover {
                    color: var(--primary-pink);
                }
                
                .footer-bottom {
                    margin-top: 60px;
                    padding-top: 30px;
                    border-top: 1px solid #eee;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.9rem;
                }

                /* Tablet Layout (2x2 Grid) */
                @media (min-width: 768px) and (max-width: 1024px) {
                    .footer {
                        padding: 60px 40px 30px;
                    }
                    
                    .footer-content {
                        grid-template-columns: repeat(2, 1fr); /* 2 columns */
                        gap: 30px;
                    }
                }

                @media (max-width: 768px) {
                    .footer {
                        padding: 50px 5% 30px; /* Reduced padding */
                    }
                    
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                    
                    .footer-brand {
                        text-align: center;
                    }
                    
                    .footer-section {
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
