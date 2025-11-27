import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos, onPlay, savedIds, onToggleSave }) => {
    if (!videos || videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-pink-50 p-4 rounded-full mb-3">
                    <svg className="w-8 h-8 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-gray-600 font-medium">No videos found</h3>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={onPlay}
                    isSaved={savedIds.includes(video.id)}
                    onToggleSave={onToggleSave}
                />
            ))}
        </div>
    );
};

export default VideoGrid;
