import React, { useState } from 'react';
import ChapterCard from '../components/ChapterCard';
import PageHeader from '../components/PageHeader';
import { chapters } from '../data/chapters';

const Chapters = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChapters = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            <PageHeader
                title="Educational Chapters"
                subtitle="Explore our comprehensive guide to women's health, organized for easy learning."
            />

            <div className="max-w-6xl mx-auto px-6">
                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-12 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent sm:text-sm shadow-sm transition-all"
                        placeholder="Search topics (e.g., 'PCOS', 'Diet', 'Mental Health')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredChapters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredChapters.map((chapter) => (
                            <ChapterCard
                                key={chapter.id}
                                id={chapter.id}
                                title={chapter.title}
                                description={chapter.description}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No chapters found matching "{searchTerm}".</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-brand-pink hover:underline font-medium"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chapters;
