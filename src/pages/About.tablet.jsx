import React from 'react';
import PageHeader from '../components/PageHeader';

const About = () => {
    return (
        <div className="min-h-screen bg-brand-bg pb-24">
            <PageHeader
                title="Our Mission"
                subtitle="Empowering women through knowledge, community, and care."
            />

            <div className="max-w-4xl mx-auto px-8">
                <div className="bg-white rounded-3xl shadow-sm border border-pink-50 p-10 md:p-12">
                    <div className="prose prose-lg prose-pink mx-auto">
                        <p className="lead text-xl text-gray-600 mb-8 font-light leading-relaxed">
                            HerHealth was born from a simple belief: <strong className="font-bold text-gray-900">Every woman deserves to understand her own body.</strong>
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 font-display">Why We Started</h3>
                        <p className="text-gray-600 leading-relaxed">
                            In a world where women's health is often misunderstood or stigmatized, we wanted to create a safe haven. A place where questions are answered with science, not judgment. Where "taboo" topics are discussed openly. And where you can find the tools you need to advocate for your own well-being.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 font-display">What We Offer</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="text-pink-500 mt-1">✓</span>
                                <span><strong>Medically Verified Content:</strong> All our articles are reviewed by healthcare professionals.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-pink-500 mt-1">✓</span>
                                <span><strong>Holistic Approach:</strong> We believe mental and emotional health are just as important as physical health.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-pink-500 mt-1">✓</span>
                                <span><strong>Privacy First:</strong> Your data is yours. Our symptom tracker works locally or on your own Google Drive.</span>
                            </li>
                        </ul>

                        <div className="mt-12 p-8 bg-pink-50 rounded-2xl border border-pink-100 text-center">
                            <p className="text-lg text-pink-800 font-medium italic mb-4">
                                "Health is not just about the absence of disease. It's about thriving in your own skin."
                            </p>
                            <p className="text-sm text-pink-600 font-bold uppercase tracking-wider">
                                — The HerHealth Team
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
