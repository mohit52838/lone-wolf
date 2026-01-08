import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { FaArrowRight } from 'react-icons/fa';

const Chapters = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChapters = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16 text-center md:text-left">
                    <span className="text-xs font-bold tracking-widest text-rose-500 uppercase mb-4 block">Knowledge Base</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore our guides</h1>
                    <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                        Medically verified articles designed to help you understand your body better. Use the search below to find specific topics.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-16">
                    <div className="relative max-w-xl">
                        <input
                            type="text"
                            className="w-full text-lg py-4 pl-6 pr-12 rounded-full border border-gray-200 bg-white shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-light"
                            placeholder="Search topics (e.g., 'Anxiety', 'Cycle')..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                </div>

                {/* List View */}
                <div className="space-y-6">
                    {filteredChapters.length > 0 ? (
                        filteredChapters.map((chapter) => (
                            <Link key={chapter.id} to={`/chapter/${chapter.id}`} className="block group">
                                <div className="bg-white rounded-[1.5rem] overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-red-100 flex flex-col md:flex-row h-full md:h-64">
                                    {/* Image Section */}
                                    <div className="w-full md:w-1/3 h-48 md:h-full relative overflow-hidden">
                                        {chapter.image ? (
                                            <img
                                                src={chapter.image}
                                                alt={chapter.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-300">
                                                <span className="text-4xl font-display font-bold">{chapter.id}</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex-1 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">Guide {chapter.id}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 font-display mb-3 group-hover:text-rose-600 transition-colors">
                                            {chapter.title}
                                        </h2>
                                        <p className="text-gray-500 font-light leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
                                            {chapter.description}
                                        </p>
                                        <div className="flex items-center text-sm font-semibold text-rose-500 group-hover:translate-x-1 transition-transform mt-auto">
                                            Read Article <FaArrowRight className="ml-2" size={12} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg mb-2">No guides found for "{searchTerm}".</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-rose-500 font-medium hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chapters;
