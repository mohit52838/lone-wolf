import React from 'react';
import { FaStethoscope, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Card from './Card';

const MissionSection = () => {
    const features = [
        {
            icon: <FaStethoscope className="text-3xl" />,
            title: "Expert Knowledge",
            desc: "Medically reviewed content you can trust, bridging the gap between clinical journals and daily advice."
        },
        {
            icon: <FaHeartbeat className="text-3xl" />,
            title: "Holistic Health",
            desc: "Focusing on the whole person – physical, mental, and emotional well-being."
        },
        {
            icon: <FaUsers className="text-3xl" />,
            title: "Safe Community",
            desc: "A judgment-free space to share experiences and find support from women like you."
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)] mb-6">
                        Why we built HerHealth
                    </h2>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        We believe every woman deserves access to effortless, accurate, and empathetic healthcare information. Our mission is to decode your body's signals and empower you with knowledge.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="flex flex-col items-center text-center h-full !p-8 bg-white" title={null}>
                                <div className="card-content flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-[#FFF9F5] flex items-center justify-center text-[var(--primary-color)] mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-[var(--text-main)] transition-colors group-hover:text-[var(--primary-color)]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
