import React from 'react';
import PageHeader from '../components/PageHeader';

const About = () => {
    return (
        <div className="min-h-screen bg-white pb-24">
            <PageHeader
                title="About HerHealth"
                subtitle="Empowering women through knowledge, community, and care."
            />

            <div className="max-w-3xl mx-auto px-6">
                <div className="prose prose-lg prose-pink mx-auto">
                    <p className="lead text-xl text-gray-600 mb-8 font-light">
                        HerHealth was born from a simple belief: **Every woman deserves to understand her own body.**
                    </p>

                    <h3>The Problem</h3>
                    <p>
                        For too long, women's health has been shrouded in silence, stigma, and misinformation. From the hush-hush nature of menstruation to the dismissal of pain in endometriosis, women often navigate their health journeys in the dark.
                    </p>

                    <h3>Our Mission</h3>
                    <p>
                        We exist to bridge the gap between medical jargon and daily life. We provide accurate, evidence-based, and judgment-free information to help you advocate for yourself in the doctor's office and at home.
                    </p>

                    <div className="bg-pink-50 p-8 rounded-2xl my-12 not-prose border border-pink-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">Our Core Values</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm mr-3 mt-1">✓</span>
                                <span className="text-gray-700"><strong>Inclusivity:</strong> We serve all women and people with uteruses.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm mr-3 mt-1">✓</span>
                                <span className="text-gray-700"><strong>Accuracy:</strong> Our content is referenced from WHO, CDC, and ACOG guidelines.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm mr-3 mt-1">✓</span>
                                <span className="text-gray-700"><strong>Empathy:</strong> We understand that health is emotional as well as physical.</span>
                            </li>
                        </ul>
                    </div>

                    <h3>Disclaimer</h3>
                    <p className="text-sm text-gray-500 italic">
                        The information provided on HerHealth is for educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
