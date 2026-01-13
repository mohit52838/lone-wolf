import React, { useState, useEffect, useMemo } from 'react';
import VideoGrid from '../components/VideoGrid';
import VideoModal from '../components/VideoModal';
import videosData from '../data/videos.json';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentVideo, setCurrentVideo] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setVideos(videosData);
        const uniqueCategories = ['All', ...new Set(videosData.map(v => v.category))].sort();
        setCategories(uniqueCategories);
    }, []);

    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            if (selectedCategory !== 'All' && video.category !== selectedCategory) return false;

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    video.title.toLowerCase().includes(query) ||
                    video.description.toLowerCase().includes(query)
                );
            }
            return true;
        });
    }, [videos, selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="section-header-wrapper">
                    <span className="section-eyebrow">Visual Library</span>
                    <h1 className="section-heading">Videos & Tutorials</h1>
                    <p className="section-subtitle">
                        Verified educational content from trusted health sources.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-12 flex flex-col md:flex-row gap-8 md:items-center justify-between">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-rose-500 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Simple Search */}
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white border border-gray-200 rounded-full px-6 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all w-full md:w-64"
                    />
                </div>

                {/* Content */}
                <div>
                    <VideoGrid
                        videos={filteredVideos}
                        onPlay={setCurrentVideo}
                        savedIds={[]}
                        onToggleSave={() => { }}
                    />
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

export default Videos;
