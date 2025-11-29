import React, { useState } from 'react';
import ChapterCard from '../components/ChapterCard';
import PageHeader from '../components/PageHeader';
import { chapters } from '../data/chapters';
import { FaSearch } from 'react-icons/fa';

const Chapters = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChapters = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[var(--bg-color)] pb-24">
            <PageHeader
                title="Educational Chapters"
                subtitle="Explore our comprehensive guide to women's health, organized for easy learning."
            />

            <div className="max-w-6xl mx-auto px-6">
                {/* Search Bar */}
                <div className="mb-10 relative max-w-xl mx-auto">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search chapters..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-pink-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all shadow-sm"
                    />
                </div>

                {/* Chapters Grid - 2 Columns for Tablet */}
                {filteredChapters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
