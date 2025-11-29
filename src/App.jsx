import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Desktop Components
import NavbarDesktop from './components/Navbar';
import HomeDesktop from './pages/Home';
import ChaptersDesktop from './pages/Chapters';
import VideosDesktop from './pages/Videos';
import ResourcesDesktop from './pages/Resources';
import AboutDesktop from './pages/About';

// Tablet Components
import NavbarTablet from './components/Navbar.tablet';
import HomeTablet from './pages/Home.tablet';
import ChaptersTablet from './pages/Chapters.tablet';
import VideosTablet from './pages/Videos.tablet';
import ResourcesTablet from './pages/Resources.tablet';
import AboutTablet from './pages/About.tablet';

// Mobile Components
import NavbarMobile from './components/Navbar.mobile';
import HomeMobile from './pages/Home.mobile';
import ChaptersMobile from './pages/Chapters.mobile';
import VideosMobile from './pages/Videos.mobile';
import ResourcesMobile from './pages/Resources.mobile';
import AboutMobile from './pages/About.mobile';

// Shared Components
import Footer from './components/Footer';
import ChapterPage from './pages/ChapterPage';
import FindDoctors from './pages/FindDoctors';

let hasHandledReload = false;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Viewport Logic
  const [viewport, setViewport] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewport('mobile');
      } else if (width >= 640 && width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hasHandledReload) return;

    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      hasHandledReload = true;
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Component Selection Helper
  const getComponent = (Desktop, Tablet, Mobile) => {
    if (viewport === 'mobile') return <Mobile />;
    if (viewport === 'tablet') return <Tablet />;
    return <Desktop />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Conditional Navbar */}
      {getComponent(NavbarDesktop, NavbarTablet, NavbarMobile)}

      <main className={`flex-grow ${!isHomePage ? 'pt-24' : ''}`}>
        <Routes>
          <Route path="/" element={getComponent(HomeDesktop, HomeTablet, HomeMobile)} />
          <Route path="/chapters" element={getComponent(ChaptersDesktop, ChaptersTablet, ChaptersMobile)} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
          <Route path="/resources" element={getComponent(ResourcesDesktop, ResourcesTablet, ResourcesMobile)} />
          <Route path="/about" element={getComponent(AboutDesktop, AboutTablet, AboutMobile)} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/videos" element={getComponent(VideosDesktop, VideosTablet, VideosMobile)} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
