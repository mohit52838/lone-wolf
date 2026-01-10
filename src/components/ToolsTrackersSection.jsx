import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaStethoscope, FaUserMd, FaPlayCircle, FaArrowRight, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Card from './Card';

const ToolsTrackersSection = () => {
    const tools = [
        {
            id: 'tracker',
            title: 'Period & Cycle Tracker',
            description: 'Log your symptoms and predict your next cycle with AI-driven insights.',
            icon: <FaCalendarAlt />,
            link: '/resources#tracker',
            color: 'bg-red-50 text-red-500',
            delay: 0
        },
        {
            id: 'guides',
            title: 'Health Guide',
            description: 'Downloadable PDF guides and educational resources.',
            icon: <FaFilePdf />, // Changed icon to represent guides
            link: '/resources#guides',
            color: 'bg-blue-50 text-blue-500',
            delay: 0.1
        },
        {
            id: 'doctors',
            title: 'Find Specialists',
            description: 'Connect with trusted healthcare professionals near you.',
            icon: <FaUserMd />,
            link: '/find-doctors',
            color: 'bg-green-50 text-green-500',
            delay: 0.2
        },
        {
            id: 'videos',
            title: 'Health Library',
            description: 'Expert-led video guides on women\'s health topics.',
            icon: <FaPlayCircle />,
            link: '/videos',
            color: 'bg-purple-50 text-purple-500',
            delay: 0.3
        }
    ];

    return (
        <section className="py-20 bg-[var(--bg-color)] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] font-display mb-4">
                        Tools for your wellbeing
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg">
                        Practical resources designed to give you control over your health journey.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: tool.delay, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full !p-6" title={null}>
                                <Link
                                    to={tool.link}
                                    className="group block h-full relative z-10"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            {tool.icon}
                                        </div>

                                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 font-display group-hover:text-[var(--primary-color)] transition-colors">
                                            {tool.title}
                                        </h3>

                                        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                                            {tool.description}
                                        </p>

                                        <div className="mt-auto flex items-center text-sm font-semibold text-[var(--primary-color)] group-hover:translate-x-1 transition-transform">
                                            Try Tool <FaArrowRight className="ml-2 text-xs" />
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 -ml-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -mr-32"></div>
        </section>
    );
};

export default ToolsTrackersSection;
