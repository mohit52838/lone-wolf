import React from 'react';
import { FaShieldAlt, FaUserMd, FaLock } from 'react-icons/fa';

const TrustSection = () => {
    return (
        <div className="py-12 mt-8">
            <div className="max-w-5xl mx-auto text-center">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Item 1 */}
                    <div className="flex flex-col items-center">
                        <FaUserMd className="text-3xl text-[var(--primary-color)] mb-4" />
                        <h4 className="font-bold text-[var(--text-main)] mb-1">Medically Reviewed</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            All content vetted by certified healthcare professionals.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center">
                        <FaLock className="text-3xl text-[var(--primary-color)] mb-4" />
                        <h4 className="font-bold text-[var(--text-main)] mb-1">Private & Secure</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            We don't sell your data. Your health journey is yours alone.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center">
                        <FaShieldAlt className="text-3xl text-[var(--primary-color)] mb-4" />
                        <h4 className="font-bold text-[var(--text-main)] mb-1">Evidence Based</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            Built on the latest clinical guidelines and research.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100/60 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[var(--text-muted)] text-sm">
                    <span className="font-medium mr-2">Sources:</span>
                    <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--text-main)] hover:text-[var(--primary-color)] transition-colors">WHO</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://www.acog.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--text-main)] hover:text-[var(--primary-color)] transition-colors">ACOG</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://www.nih.gov/" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--text-main)] hover:text-[var(--primary-color)] transition-colors">NIH</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://www.mayoclinic.org/" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--text-main)] hover:text-[var(--primary-color)] transition-colors">Mayo Clinic</a>
                </div>
            </div>
        </div>
    );
};

export default TrustSection;
