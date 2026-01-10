import React from 'react';
import { FaHeart, FaShieldAlt, FaLightbulb } from 'react-icons/fa';
import Card from '../components/Card';
import TrustSection from '../components/TrustSection';

const About = () => {
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6">

                {/* Hero Section: Calm & Respectful */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute inset-0 bg-rose-100 rounded-[2rem] transform rotate-3 scale-95 opacity-50"></div>
                        <img
                            src="https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&q=80&w=800"
                            alt="Hands resting on a journal in sunlight"
                            className="rounded-[2rem] shadow-lg w-full object-cover h-[500px] relative z-10"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 font-bold rounded-full text-sm mb-6 uppercase tracking-wider">
                            Safe Space
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-main)] mb-8 font-display leading-tight">
                            You are not alone. <br />You are <span className="text-[var(--primary-color)]">understood.</span>
                        </h1>
                        <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-8">
                            HerHealth is a quiet corner of the internet dedicated to you. No judgment, no confusing jargon—just clear, warm guidance for the body you live in.
                        </p>
                        <blockquote className="text-lg text-[var(--text-main)] font-medium border-l-4 border-rose-300 pl-6 italic">
                            "We believe that understanding your health should feel like a conversation with a trusted friend, not a lecture."
                        </blockquote>
                    </div>
                </div>

                {/* Why We Are Here - Letter Style */}
                <div className="max-w-3xl mx-auto mb-24">
                    <Card className="md:!p-8 !p-5 bg-white border border-[var(--secondary-pink)] shadow-sm relative" title={null}>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-display">A Note to You</h2>

                            <div className="prose prose-lg prose-p:text-gray-900 prose-p:leading-snug prose-p:font-medium">
                                <p className="text-[var(--primary-color)] font-bold text-xl mb-0">Dear Reader,</p>
                                <p className="mb-1">
                                    Navigating women's health can sometimes feel like solving a puzzle without all the pieces. Whether it's unexplained pain, a cycle that keeps changing, or simply the desire to know more, we know it can be overwhelming.
                                </p>
                                <p className="mb-1">
                                    That's why we're here. To validate your questions. To respect your experiences. To provide you with knowledge that empowers you to walk into any medical appointment with confidence.
                                </p>
                                <p className="text-black font-bold mb-2">
                                    You deserve to feel at home in your own body.
                                </p>
                                <p className="text-[var(--primary-color)] italic text-lg mt-1 border-t border-gray-100 pt-2">
                                    With care,<br />
                                    <span className="font-display font-bold not-italic text-2xl">The HerHealth Team</span>
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>

            {/* Trust & Sources Section */}
            <TrustSection />

            {/* Disclaimer */}
            <div className="text-center max-w-2xl mx-auto opacity-60">
                <p className="text-sm text-[var(--text-light)]">
                    Medical Disclaimer: The information provided on HerHealth is for educational purposes only. Always seek the advice of your physician.
                </p>
            </div>
        </div>
    );
};

export default About;
