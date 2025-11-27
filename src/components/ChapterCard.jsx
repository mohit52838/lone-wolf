import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChapterCard = ({ id, title, description }) => {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(233, 30, 99, 0.15)" }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden transition-colors"
        >
            <div className="h-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary w-full"></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-pink-50 text-brand-primary font-bold text-sm border border-pink-100 shadow-sm">
                        {id}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight group-hover:text-brand-primary transition-colors">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm flex-grow leading-relaxed line-clamp-3">
                    {description}
                </p>
            </div>
            <div className="px-6 pb-6 pt-0">
                <Link
                    to={`/chapter/${id}`}
                    className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-pink-700 transition-colors"
                >
                    Read Chapter
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
};

export default ChapterCard;
