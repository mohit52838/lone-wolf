import React from 'react';
import { FaHeart, FaShieldAlt, FaLightbulb } from 'react-icons/fa';

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
                            You are not alone. <br />You are <span className="text-rose-500">understood.</span>
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
                    <div className="bg-rose-50/50 p-10 md:p-14 rounded-3xl border border-rose-100 relative">
                        {/* Decorative element resembling a letter stamp or fold could go here via CSS if desired, keeping it clean for now */}

                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-8 font-display">A Note to You</h2>

                        <div className="prose prose-lg prose-p:text-[var(--text-muted)] prose-p:leading-loose">
                            <p className="font-medium text-rose-800">Dear Reader,</p>
                            <p>
                                Navigating women's health can sometimes feel like solving a puzzle without all the pieces. Whether it's unexplained pain, a cycle that keeps changing, or simply the desire to know <em>more</em>, we know it can be overwhelming.
                            </p>
                            <p>
                                That's why we're here. To validate your questions. To respect your experiences. To provide you with knowledge that empowers you to walk into any medical appointment with confidence.
                            </p>
                            <p>
                                You deserve to feel at home in your own body.
                            </p>
                            <p className="italic text-rose-800 mt-8">
                                With care,<br />
                                <span className="font-display font-bold not-italic text-lg">The HerHealth Team</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center max-w-2xl mx-auto opacity-60">
                    <p className="text-sm text-[var(--text-light)]">
                        Medical Disclaimer: The information provided on HerHealth is for educational purposes only. Always seek the advice of your physician.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;
