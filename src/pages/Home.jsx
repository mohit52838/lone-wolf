import React, { useLayoutEffect } from 'react';
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import ChaptersSlider from '../components/ChaptersSlider';

import ToolsTrackersSection from '../components/ToolsTrackersSection';
import { chapters } from '../data/chapters';

const Home = () => {
    // Reset any potential scroll issues on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-color)]">
            {/* 1. Hero: Warm, Inviting, Human */}
            <HeroSection />

            {/* 2. Mission: Why HerHealth? */}
            <MissionSection />

            {/* 3. Chapters: Clean Learning Path */}
            <ChaptersSlider chapters={chapters} />

            {/* 4. Tools & Trackers: Useful resources */}
            <ToolsTrackersSection />


        </div>
    );
};

export default Home;
