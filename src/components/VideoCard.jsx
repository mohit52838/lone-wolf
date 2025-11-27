import React from 'react';
import { FaPlay, FaCheckCircle, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const VideoCard = ({ video, onPlay, isSaved, onToggleSave }) => {
    const handlePlay = () => {
        onPlay(video);
    };

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-pink-50 flex flex-col h-full">
            {/* Thumbnail Container */}
            <div
                className="relative aspect-video bg-gray-100 cursor-pointer overflow-hidden"
                onClick={handlePlay}
            >
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                        <FaPlay className="text-[#e6007e] text-lg" />
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                    {video.duration}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                {/* Category & Save */}
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-[#e6007e] bg-pink-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {video.category}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(video.id);
                        }}
                        className="text-gray-400 hover:text-[#e6007e] transition-colors focus:outline-none"
                        aria-label={isSaved ? "Remove from Watch Later" : "Add to Watch Later"}
                    >
                        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                </div>

                {/* Title */}
                <h3
                    className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-[#e6007e] transition-colors cursor-pointer"
                    onClick={handlePlay}
                >
                    {video.title}
                </h3>

                {/* Channel Info */}
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                    <span className="text-xs text-gray-500 font-medium truncate max-w-[150px]" title={video.source}>
                        {video.source}
                    </span>
                    {video.official && (
                        <span className="flex items-center gap-0.5 bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full" title="Official Source">
                            <FaCheckCircle className="text-[8px]" /> Official
                        </span>
                    )}
                    {!video.official && video.expertVerified && (
                        <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full" title="Expert Verified">
                            Expert
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
                    {video.description}
                </p>

                {/* Footer Actions */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <button
                        onClick={handlePlay}
                        className="text-xs font-semibold text-[#e6007e] hover:text-pink-700 flex items-center gap-1"
                    >
                        <FaPlay className="text-[10px]" /> Watch Now
                    </button>
                    <span className="text-[10px] text-gray-400">
                        {new Date(video.published).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
