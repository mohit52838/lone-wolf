import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const VideoModal = ({ video, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!video) return null;

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl transform transition-all scale-100"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-900/20 to-transparent absolute top-0 left-0 right-0 z-10 pointer-events-none">
                    <h3 className="text-white font-bold text-lg drop-shadow-md opacity-0">Playing Video</h3>
                    <button
                        onClick={onClose}
                        className="pointer-events-auto bg-black/50 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-md group"
                        aria-label="Close modal"
                    >
                        <FaTimes className="text-xl group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Video Container */}
                <div className="relative pt-[56.25%] bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Footer Info */}
                <div className="bg-white p-6 border-t-4 border-pink-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">{video.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                    {video.official && (
                        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                            ✓ Official Health Source
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
