import React from 'react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';

const About = () => {
    return (
        <div className="min-h-screen pb-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-lavender/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
            </div>

            <PageHeader
                title="About HerHealth"
                subtitle="Empowering women through knowledge, community, and care."
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Intro Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <p className="text-2xl md:text-3xl text-[var(--text-body)] font-light leading-relaxed font-display">
                        HerHealth was born from a simple belief: <br className="hidden md:block" />
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-pink)] to-[var(--accent-purple)]">
                            Every woman deserves to understand her own body.
                        </span>
                    </p>
                </div>

                {/* Problem & Mission Grid */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-24 items-stretch">
                    <Card title="The Problem" className="h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-50 -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
                        <p className="text-lg text-[var(--text-body)] leading-relaxed relative z-10">
                            For too long, women's health has been shrouded in silence, stigma, and misinformation. From the hush-hush nature of menstruation to the dismissal of pain in endometriosis, women often navigate their health journeys in the dark, feeling unheard and unsupported.
                        </p>
                    </Card>

                    <Card title="Our Mission" className="h-full">
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-pink/20 rounded-full blur-2xl opacity-40 -ml-16 -mb-16 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
                        <p className="text-lg text-[var(--text-body)] leading-relaxed relative z-10">
                            We exist to bridge the gap between medical jargon and daily life. We provide accurate, evidence-based, and judgment-free information to help you advocate for yourself in the doctor's office and at home. We are your partner in health.
                        </p>
                    </Card>
                </div>

                {/* Core Values Section */}
                <div className="mb-24">
                    <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-color)] mb-16 text-center font-display">Our Core Values</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <Card title="Inclusivity" className="h-full">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-lavender/30 to-brand-purple/10 flex items-center justify-center text-[var(--accent-purple)] mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="text-[var(--text-body)] leading-relaxed">
                                We serve all women and people with uteruses. Our community is a safe space for everyone, regardless of background or identity.
                            </p>
                        </Card>

                        {/* Value 2 */}
                        <Card title="Accuracy" className="h-full">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center text-blue-600 mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-[var(--text-body)] leading-relaxed">
                                Trust is everything. Our content is rigorously researched and referenced from WHO, CDC, and ACOG guidelines.
                            </p>
                        </Card>

                        {/* Value 3 */}
                        <Card title="Empathy" className="h-full">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100/50 flex items-center justify-center text-[var(--primary-pink)] mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-[var(--text-body)] leading-relaxed">
                                We understand that health is emotional as well as physical. We approach every topic with compassion and care.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="max-w-4xl mx-auto border-t border-gray-200/50 pt-12 text-center">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Medical Disclaimer</h3>
                    <p className="text-sm text-gray-500 italic leading-relaxed">
                        The information provided on HerHealth is for educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
