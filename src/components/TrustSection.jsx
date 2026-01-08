import React from 'react';
import { FaShieldAlt, FaUserMd, FaLock } from 'react-icons/fa';

const TrustSection = () => {
    return (
        <section className="py-20 bg-white border-t border-[var(--secondary-color)]">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Item 1 */}
                    <div className="flex flex-col items-center">
                        <FaUserMd className="text-3xl text-[var(--accent-teal)] mb-4" />
                        <h4 className="font-bold text-[var(--text-main)] mb-1">Medically Reviewed</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            All content vetted by certified healthcare professionals.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center">
                        <FaLock className="text-3xl text-[var(--accent-teal)] mb-4" />
                        <h4 className="font-bold text-[var(--text-main)] mb-1">Private & Secure</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            We don't sell your data. Your health journey is yours alone.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center">
                        <FaShieldAlt className="text-3xl text-[var(--accent-teal)] mb-4" />
                        <h4 className="font-bold text-[var(--text-main)] mb-1">Evidence Based</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            Built on the latest clinical guidelines and research.
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-center items-center gap-6 text-[var(--text-muted)] text-sm">
                    <span>Sources: WHO</span>
                    <span className="hidden md:block">•</span>
                    <span>ACOG</span>
                    <span className="hidden md:block">•</span>
                    <span>NIH</span>
                    <span className="hidden md:block">•</span>
                    <span>Mayo Clinic</span>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
