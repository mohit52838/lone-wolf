import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ChaptersSlider = ({ chapters = [] }) => {
    // Show top 8 chapters
    const displayChapters = chapters.slice(0, 8);

    return (
        <section className="py-24 bg-[#FFF9F5]">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)] mb-4">
                            Explore the Library
                        </h2>
                        <p className="text-[var(--text-muted)]">
                            Comprehensive guides on everything from menstruation to menopause.
                        </p>
                    </div>
                    <Link to="/chapters" className="hidden md:flex items-center gap-2 text-[var(--primary-color)] font-bold hover:underline mt-4 md:mt-0">
                        View all chapters <FaArrowRight />
                    </Link>
                </div>

                <div className="overflow-x-auto pb-8 hide-scrollbar">
                    <div className="flex gap-6 px-4 w-max">
                        {displayChapters.map((chapter) => (
                            <Link
                                to={`/chapter/${chapter.id}`}
                                key={chapter.id}
                                className="group relative w-[280px] md:w-[300px] flex-shrink-0 flex flex-col h-[380px] bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[var(--secondary-color)]"
                            >
                                {/* Simulated Book Cover / Header Area */}
                                {/* Book Cover / Image Area */}
                                <div className="h-40 rounded-xl bg-[var(--bg-color)] mb-6 relative overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                                    {chapter.image ? (
                                        <img
                                            src={chapter.image}
                                            alt={chapter.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#FFECE4]">
                                            <span className="text-[var(--primary-color)] font-bold text-4xl opacity-20">
                                                {chapter.id}
                                            </span>
                                        </div>
                                    )}
                                    {/* Soft Warm Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--primary-color)] mb-2">
                                        Guide
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 leading-tight line-clamp-2 font-display">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-4 leading-relaxed">
                                        {chapter.description}
                                    </p>

                                    <div className="mt-auto flex items-center text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary-color)] transition-colors">
                                        Read Guide
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/chapters" className="inline-flex items-center gap-2 text-[var(--primary-color)] font-bold">
                        View all chapters <FaArrowRight />
                    </Link>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default ChaptersSlider;
