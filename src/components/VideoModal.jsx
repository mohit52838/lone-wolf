import React, { useEffect, useRef } from 'react';
import { FaTimes, FaExternalLinkAlt, FaShareAlt, FaExclamationTriangle } from 'react-icons/fa';

const VideoModal = ({ video, onClose }) => {
    const modalRef = useRef(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!video) return null;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: `Check out this video on HerHealth: ${video.title}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(video.sourceUrl);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white z-10">
                    <h2 id="modal-title" className="font-bold text-gray-800 text-lg line-clamp-1 pr-4">
                        {video.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800"
                        aria-label="Close modal"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black flex-shrink-0">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                        title={video.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Info & Meta */}
                <div className="p-6 overflow-y-auto bg-white">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold text-gray-700">{video.source}</span>
                                {video.official && (
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                        Official Source
                                    </span>
                                )}
                                {!video.official && video.expertVerified && (
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                        Expert Verified
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500">
                                Published on {new Date(video.published).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                <FaShareAlt /> Share
                            </button>
                            <a
                                href={video.sourceUrl || video.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#e6007e] hover:bg-pink-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <FaExternalLinkAlt /> Open in YouTube
                            </a>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {video.description}
                    </p>

                    {/* Disclaimer */}
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
                        <FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-amber-800 mb-1">Medical Disclaimer</h4>
                            <p className="text-xs text-amber-700">
                                This content is for educational purposes only. Videos are embedded from YouTube and hosted by their respective channels.
                                We curate authoritative sources, but please verify medical advice with a qualified professional.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
