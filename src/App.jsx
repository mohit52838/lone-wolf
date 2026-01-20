import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import ScrollToTop from './components/ScrollToTop';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import Videos from './pages/Videos';
import Resources from './pages/Resources';
import About from './pages/About';
import Footer from './components/Footer';
import ChapterPage from './pages/ChapterPage';
import FindDoctors from './pages/FindDoctors';
import Guidance from './pages/Guidance';
import ExpertTalks from './pages/ExpertTalks';
import OurSources from './pages/OurSources';
import Library from './pages/Library';

let hasHandledReload = false;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (hasHandledReload) return;

    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      hasHandledReload = true;
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <LibraryProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />

        <Navbar />

        <main className={`flex-grow ${!isHomePage ? '' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapter/:id" element={<ChapterPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/find-doctors" element={<FindDoctors />} />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/expert-talks" element={<ExpertTalks />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/sources" element={<OurSources />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LibraryProvider>
  );
}

export default App;
