import React, { useState, useEffect, useMemo } from 'react';
import VideoGrid from '../components/VideoGrid';
import VideoModal from '../components/VideoModal';
import VideosSidebar from '../components/VideosSidebar';
import videosData from '../data/videos.json';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showOfficialOnly, setShowOfficialOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentVideo, setCurrentVideo] = useState(null);
    const [savedIds, setSavedIds] = useState([]);
    const [categories, setCategories] = useState([]);

    // Load data and saved videos
    useEffect(() => {
        setVideos(videosData);

        // Extract unique categories
        const uniqueCategories = [...new Set(videosData.map(v => v.category))].sort();
        setCategories(uniqueCategories);

        // Load saved videos from localStorage
        const saved = localStorage.getItem('herhealth_watch_later');
        if (saved) {
            setSavedIds(JSON.parse(saved));
        }
    }, []);

    // Handle Watch Later toggle
    const handleToggleSave = (id) => {
        const newSavedIds = savedIds.includes(id)
            ? savedIds.filter(savedId => savedId !== id)
            : [...savedIds, id];

        setSavedIds(newSavedIds);
        localStorage.setItem('herhealth_watch_later', JSON.stringify(newSavedIds));
    };

    // Filter videos
    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            // Category filter
            if (selectedCategory !== 'All' && video.category !== selectedCategory) return false;

            // Official filter
            if (showOfficialOnly && !video.official) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    video.title.toLowerCase().includes(query) ||
                    video.description.toLowerCase().includes(query) ||
                    video.tags.some(tag => tag.toLowerCase().includes(query))
                );
            }

            return true;
        });
    }, [videos, selectedCategory, showOfficialOnly, searchQuery]);

    return (
        <div className="min-h-screen bg-[#fff5fa] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        <span className="text-[#e6007e]">Videos</span> & Tutorials
                    </h1>
                    <p className="text-gray-600 max-w-2xl">
                        Curated educational content from trusted sources like WHO, health ministries, and medical experts.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar (Desktop) */}
                    <div className="w-full lg:w-1/4 flex-shrink-0">
                        <VideosSidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            showOfficialOnly={showOfficialOnly}
                            onToggleOfficial={setShowOfficialOnly}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Active Filters Summary (Mobile/Tablet mainly) */}
                        <div className="mb-4 flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-gray-500">Showing {filteredVideos.length} videos</span>
                            {selectedCategory !== 'All' && (
                                <span className="bg-pink-100 text-[#e6007e] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    {selectedCategory}
                                    <button onClick={() => setSelectedCategory('All')} className="hover:text-pink-900">×</button>
                                </span>
                            )}
                            {showOfficialOnly && (
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    Official Only
                                    <button onClick={() => setShowOfficialOnly(false)} className="hover:text-green-900">×</button>
                                </span>
                            )}
                        </div>

                        <VideoGrid
                            videos={filteredVideos}
                            onPlay={setCurrentVideo}
                            savedIds={savedIds}
                            onToggleSave={handleToggleSave}
                        />
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {currentVideo && (
                <VideoModal
                    video={currentVideo}
                    onClose={() => setCurrentVideo(null)}
                />
            )}
        </div>
    );
};

export default Videos;
