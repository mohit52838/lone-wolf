import React, { useState, useEffect, useMemo } from 'react';
import VideoGrid from '../components/VideoGrid';
import VideoModal from '../components/VideoModal';
import expertTalksData from '../data/expertTalks.json';

const ExpertTalks = () => {
    const [videos, setVideos] = useState([]);
    const [activeMode, setActiveMode] = useState('All'); // 'All' | 'Podcasts' | 'Expert Conversations'
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentVideo, setCurrentVideo] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setVideos(expertTalksData);
    }, []);

    // 1. Determine which videos belong to the current MODE
    const videosInCurrentMode = useMemo(() => {
        if (activeMode === 'Podcasts') {
            return expertTalksData.filter(v => v.type === 'podcast');
        } else if (activeMode === 'Expert Conversations') {
            return expertTalksData.filter(v => v.type === 'expert-talk');
        }
        return expertTalksData;
    }, [activeMode]);

    // 2. Derive categories ONLY from the videos in the current mode
    useEffect(() => {
        // Extract categories from the mode-filtered videos
        const uniqueCategories = [...new Set(videosInCurrentMode.map(v => v.category))].sort();
        // STRICT RULE: 'All' must ALWAYS be the first item
        setCategories(['All', ...uniqueCategories]);

        // If the currently selected category is NOT in the new list, reset to All
        // Exception: If current is 'All', it's always valid
        if (selectedCategory !== 'All' && !uniqueCategories.includes(selectedCategory)) {
            setSelectedCategory('All');
        }
    }, [videosInCurrentMode, activeMode, selectedCategory]);
    // ^ Dependency on activeMode ensures we re-evaluate when mode switches

    // 3. Filter the videos based on Mode + Category + Search
    const filteredVideos = useMemo(() => {
        return videosInCurrentMode.filter(video => {
            // Category Filter
            if (selectedCategory !== 'All' && video.category !== selectedCategory) return false;

            // Search Filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    video.title.toLowerCase().includes(query) ||
                    video.author.toLowerCase().includes(query) ||
                    video.description.toLowerCase().includes(query)
                );
            }
            return true;
        });
    }, [videosInCurrentMode, selectedCategory, searchQuery]);

    const handleModeChange = (mode) => {
        setActiveMode(mode);
        // We do NOT manually reset selectedCategory here because the useEffect above 
        // will handle it intelligently (only resetting if the category is invalid for the new mode).
        // This allows keeping "Mental Health" active if it exists in both modes.
    };

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <span className="text-[#e6007e] font-bold tracking-wider uppercase text-sm mb-2 block">In-Depth Learning</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                        Expert Talks & Podcasts
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
                        Explore long-form conversations and deep dives with world-leading experts in women's health.
                    </p>
                </div>

                {/* MODE SWITCH (Primary Navigation) */}
                <div className="flex justify-center md:justify-start mb-8">
                    <div className="bg-gray-100/80 p-1.5 rounded-full inline-flex gap-1">
                        {['All', 'Podcasts', 'Expert Conversations'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => handleModeChange(mode)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeMode === mode
                                    ? 'bg-white text-[#e6007e] shadow-sm ring-1 ring-gray-200'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SECONDARY FILTERS (Categories & Search) */}
                <div className="mb-12 flex flex-col md:flex-row gap-8 md:items-center justify-between">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center md:justify-start">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${selectedCategory === cat
                                    ? 'bg-[#e6007e] text-white border-[#e6007e]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Simple Search */}
                    <input
                        type="text"
                        placeholder="Search topics or experts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white border border-gray-200 rounded-full px-6 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e6007e] focus:ring-1 focus:ring-[#e6007e] transition-all w-full md:w-64"
                    />
                </div>

                {/* Content */}
                <div>
                    {filteredVideos.length > 0 ? (
                        <VideoGrid
                            videos={filteredVideos}
                            onPlay={setCurrentVideo}
                            savedIds={[]}
                            onToggleSave={() => { }}
                        />
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p>No content found matching your filters.</p>
                        </div>
                    )}
                </div>

            </div>

            {currentVideo && (
                <VideoModal
                    video={currentVideo}
                    onClose={() => setCurrentVideo(null)}
                />
            )}
        </div>
    );
};

export default ExpertTalks;
