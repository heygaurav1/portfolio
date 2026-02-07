import React, { useEffect, useState } from 'react';
import { personalInfo } from '../data';
import { X, ArrowRight, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const AboutDrawer = ({ isOpen, onClose }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);

    const handleShuffle = () => {
        if (personalInfo.favoriteSongs && personalInfo.favoriteSongs.length > 0) {
            let nextSong;
            do {
                const songs = personalInfo.favoriteSongs;
                const randomIndex = Math.floor(Math.random() * songs.length);
                nextSong = songs[randomIndex];
            } while (nextSong === currentSong && personalInfo.favoriteSongs.length > 1);
            setCurrentSong(nextSong);
        }
    };

    // Prevent scrolling and select a random song when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            handleShuffle();
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <>
            {/* Custom Cursor */}
            {isOpen && showCursor && (
                <div
                    className="fixed z-[65] pointer-events-none flex items-center justify-center w-24 h-24 bg-black rounded-full text-white font-semibold text-sm tracking-widest uppercase animate-fade-in-up shadow-2xl border border-white/10"
                    style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    Close
                </div>
            )}

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 cursor-none ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#121212] border-l border-white/10 z-[70] shadow-2xl p-8 md:p-12 overflow-y-auto transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}>

                <div className="flex justify-end mb-12">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-black text-white border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer shadow-lg"
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                        <img
                            src="https://github.com/heygaurav1.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                        Studying Data Science & AI/ML at Techno India University while building products that bridge the gap between imagination and data.
                    </h2>

                    <div className="space-y-6 text-lg text-secondary/80 font-light leading-relaxed">
                        <p>
                            I spend most of my time exploring how machine learning can solve real-world problems and building iOS apps as a creative outlet. My background in digital marketing gives me a unique perspective on how to turn complex data into stories and tools that people actually enjoy using.
                        </p>
                    </div>

                    {/* Future Milestones Section */}
                    {personalInfo.goals && personalInfo.goals.length > 0 && (
                        <div className="pt-4">
                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Target Milestones</h3>
                            <div className="flex flex-wrap gap-3">
                                {personalInfo.goals.map((goal, index) => (
                                    <div key={index} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-medium flex items-center gap-2 group/goal hover:border-blue-500/50 transition-all duration-300">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                        {goal}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Favorite Song / Currently Listening Section */}
                    {currentSong && (
                        <div className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Focus & Flow</h3>
                                <button
                                    onClick={handleShuffle}
                                    className="p-2 rounded-full hover:bg-white/5 text-neutral-500 hover:text-white transition-all cursor-pointer group"
                                    title="Switch Vibe"
                                >
                                    <RefreshCw size={14} className="group-active:rotate-180 transition-transform duration-500" />
                                </button>
                            </div>
                            <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
                                <iframe
                                    src={`https://open.spotify.com/embed/track/${currentSong}?utm_source=generator&theme=0`}
                                    width="100%"
                                    height="152"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <div className="pt-8 border-t border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6 font-display">Let's work together</h3>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const submitBtn = e.target.querySelector('button[type="submit"]');
                            const originalText = submitBtn.innerText;

                            try {
                                submitBtn.disabled = true;
                                submitBtn.innerText = 'Sending...';

                                const { error } = await supabase
                                    .from('contacts')
                                    .insert([{
                                        name: e.target.name.value,
                                        email: e.target.email.value,
                                        discord: e.target.discord.value,
                                        message: e.target.message.value
                                    }]);

                                if (error) throw error;
                                alert('Message sent successfully!');
                                e.target.reset();
                            } catch (err) {
                                console.error(err);
                                alert('Error sending message. Please try again.');
                            } finally {
                                submitBtn.disabled = false;
                                submitBtn.innerText = originalText;
                            }
                        }} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="w-full px-5 py-3 rounded-xl bg-black border border-white/10 focus:border-blue-500 focus:outline-none text-white transition-all text-sm"
                                    required
                                />
                                <input
                                    type="text"
                                    name="discord"
                                    placeholder="Discord Username"
                                    className="w-full px-5 py-3 rounded-xl bg-black border border-white/10 focus:border-blue-500 focus:outline-none text-white transition-all text-sm"
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email Address"
                                className="w-full px-5 py-3 rounded-xl bg-black border border-white/10 focus:border-blue-500 focus:outline-none text-white transition-all text-sm"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Description / How can I help?"
                                rows={4}
                                className="w-full px-5 py-3 rounded-xl bg-black border border-white/10 focus:border-blue-500 focus:outline-none text-white transition-all text-sm resize-none"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 group"
                            >
                                <span>Send Message</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutDrawer;
