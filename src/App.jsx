import React, { useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects'; // Moved import to top
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ResumeModal from './components/ResumeModal';
import Experience from './components/Experience';
import Footer from './components/Footer';
import BlogSection from './components/BlogSection';
import BlogPage from './components/BlogPage';
import BentoProfile from './components/BentoProfile';
import ThreeBackground from './components/ThreeBackground';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [view, setView] = useState('home'); // 'home' or 'blog'

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-primary font-sans selection:bg-blue-500/30 selection:text-white relative transition-colors duration-700">

        <ThreeBackground />
        {/* <Cursor /> - Disabled due to performance issues */}

        {loading && <Preloader onComplete={() => setLoading(false)} />}

        {!loading && (
          <>
            {view === 'home' && (
              <>
                <Navbar
                  activeView="home"
                  onOpenResume={() => setShowResume(true)}
                  onViewBlog={() => { setView('blog'); setTimeout(() => window.scrollTo(0, 0), 0); }}
                />
                <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />

                <main className="animate-fade-in-up">
                  <Hero onOpenResume={() => setShowResume(true)} />
                  <Skills />
                  <Projects />
                  <BlogSection onViewAll={() => { setView('blog'); setTimeout(() => window.scrollTo(0, 0), 0); }} />
                  <Footer />
                </main>
              </>
            )}

            {view === 'blog' && (
              <BlogPage
                onBack={() => { setView('home'); window.scrollTo(0, 0); }}
                onOpenResume={() => setShowResume(true)}
              />
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
