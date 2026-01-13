import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import Card from './Card'; // Use the ported legacy Card

const ChaptersSlider = ({ chapters = [] }) => {
    // Show top 13 chapters (Parity: Increase from 8)
    const displayChapters = chapters.slice(0, 13);

    // Horizontal Scroll with Smart Multiplier & GSAP Smoothing (Legacy Parity)
    React.useEffect(() => {
        const container = document.getElementById('chapters-scroll-container');
        if (!container) return;

        const handleWheel = (e) => {
            // Only hijack scroll if we have horizontal content to scroll
            if (container.scrollWidth > container.clientWidth) {
                // Dynamic multiplier: Higher for trackpads (small delta), lower for mice (large delta)
                const isTrackpad = Math.abs(e.deltaY) < 50;
                const multiplier = isTrackpad ? 20.0 : 10.0; // Match legacy multiplier
                const scrollAmount = e.deltaY * multiplier;
                const currentScroll = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;

                // Check if we are at the boundaries and trying to scroll past them
                const atStart = currentScroll <= 1;
                const atEnd = currentScroll >= maxScroll - 1;
                const scrollingUp = e.deltaY < 0;
                const scrollingDown = e.deltaY > 0;

                if ((atStart && scrollingUp) || (atEnd && scrollingDown)) {
                    // Manually scroll the window to prevent "stuck" feeling
                    window.scrollBy({ top: e.deltaY, behavior: 'auto' });
                    // Legacy behavior: Let native event happen
                    return;
                }

                // Prevent vertical scroll and hijack for horizontal
                e.preventDefault();

                let targetScroll = currentScroll + scrollAmount;

                // Clamp target to bounds
                targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

                // Use GSAP for smooth scrolling
                gsap.to(container, {
                    scrollLeft: targetScroll,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: true
                });
            }
        };

        // Add non-passive listener to allow preventDefault
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <section className="py-24 bg-[#FFF9F5]">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)] mb-4">
                            Explore the Library
                        </h2>
                        <p className="text-[var(--text-muted)]">
                            Comprehensive guides on everything from menstruation to menopause.
                        </p>
                    </div>
                    <Link to="/chapters" className="hidden md:flex items-center gap-2 text-[var(--primary-color)] font-bold hover:underline mt-4 md:mt-0">
                        View all chapters <FaArrowRight />
                    </Link>
                </div>

                <div
                    id="chapters-scroll-container"
                    className="overflow-x-auto pb-12 hide-scrollbar flex gap-6 px-4 w-full"
                >
                    {displayChapters.map((chapter) => (
                        <div key={chapter.id} className="relative w-[280px] md:w-[300px] flex-shrink-0 h-[420px] hover:z-30 overflow-visible transition-all duration-300">
                            <Card className="h-full flex flex-col !p-6" title={null}>
                                <Link to={`/chapter/${chapter.id}`} className="flex flex-col h-full group">
                                    {/* Book Cover / Image Area */}
                                    <div className="h-40 rounded-xl bg-[var(--bg-color)] mb-6 relative overflow-hidden shadow-sm transition-all">
                                        {chapter.image ? (
                                            <img
                                                src={chapter.image}
                                                alt={chapter.title}
                                                className="w-full h-full object-cover transform transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#FFECE4]">
                                                <span className="text-[var(--primary-color)] font-bold text-4xl opacity-20">
                                                    {chapter.id}
                                                </span>
                                            </div>
                                        )}
                                        {/* Soft Warm Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 transition-opacity"></div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--primary-color)] mb-2">
                                            Guide
                                        </div>
                                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 leading-tight line-clamp-2 font-display">
                                            {chapter.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-4 leading-relaxed">
                                            {chapter.description}
                                        </p>

                                        <div className="mt-auto flex items-center text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary-color)] transition-colors">
                                            Read Guide
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/chapters" className="inline-flex items-center gap-2 text-[var(--primary-color)] font-bold">
                        View all chapters <FaArrowRight />
                    </Link>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default ChaptersSlider;
