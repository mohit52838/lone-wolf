import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={sectionRef} className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FFF9F5]">
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full max-w-7xl">

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-2 md:order-1 text-center md:text-left"
                >
                    <span className="inline-block py-1 px-3 mb-6 bg-red-100 text-[var(--primary-color)] text-sm font-bold tracking-wide rounded-full uppercase">
                        Evidence-based Approach
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold font-display leading-[1.1] mb-6 text-[var(--text-main)]">
                        Your body, your health, <span className="text-[var(--primary-color)] italic">understood.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--text-muted)] mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                        Join millions of women taking control of their reproductive health with medically verified guides and holistic support.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link to="/chapters" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                            Start Learning
                        </Link>
                        <Link to="/resources#symptom-tracker" className="btn btn-secondary text-lg px-8 py-4">
                            Track Symptoms
                        </Link>
                    </div>

                    {/* Trust Indicator */}
                    <div className="mt-12 flex items-center justify-center md:justify-start gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                    <img src={`https://randomuser.me/api/portraits/women/${40 + i}.jpg`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-[var(--text-muted)]">
                            Trusted by <strong>10,000+</strong> women
                        </p>
                    </div>
                </motion.div>

                {/* Visual Side - Natural, Warm Image */}
                <div className="order-1 md:order-2 relative h-[400px] md:h-[600px] w-full items-center justify-center hidden md:flex">
                    <motion.div
                        style={{ y }}
                        className="relative w-full h-full"
                    >
                        {/* Main Image Mask */}
                        <div className="absolute inset-0 rounded-[50px] overflow-hidden shadow-2xl rotate-2">
                            <img
                                src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop"
                                alt="Happy woman in sunlight"
                                className="w-full h-full object-cover"
                            />
                            {/* Soft warm overlay */}
                            <div className="absolute inset-0 bg-[var(--primary-color)] mix-blend-color opacity-20"></div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FEE2E2] rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FFEDD5] rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                    </motion.div>
                </div>
            </div>

            {/* Background Blob for warmth */}
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-[#FFF0E6] to-transparent -z-0 opacity-60"></div>
        </section>
    );
};

export default HeroSection;
