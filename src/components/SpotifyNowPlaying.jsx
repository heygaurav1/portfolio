import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import { myPlaylist } from '../playlistData';

const SpotifyNowPlaying = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    const currentTrack = myPlaylist[currentIndex];

    // Auto-rotate through playlist every 10 seconds
    useEffect(() => {
        const rotateInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % myPlaylist.length);
            setProgress(0);
        }, 10000);

        return () => clearInterval(rotateInterval);
    }, []);

    // Animate progress bar
    useEffect(() => {
        if (!isAnimating) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const increment = 100 / 100; // 100 steps over 10 seconds
                return prev >= 100 ? 0 : prev + increment;
            });
        }, 100);

        return () => clearInterval(progressInterval);
    }, [currentIndex, isAnimating]);

    if (!currentTrack) {
        return null;
    }

    return (
        <div className="md:col-span-2 lg:col-span-4 row-span-2 glass-card p-6 rounded-[2.5rem] flex flex-col justify-between group overflow-hidden relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-50"></div>

            {/* Album art and track info */}
            <div className="relative z-10 flex gap-4 items-start">
                {currentTrack.albumArt && (
                    <div className="flex-shrink-0 relative">
                        <img
                            src={currentTrack.albumArt}
                            alt={currentTrack.album}
                            className="w-20 h-20 rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 group-hover:scale-105"
                            onError={(e) => {
                                // Fallback to gradient background if image fails
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div
                            className="w-20 h-20 rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-br from-green-500/20 to-purple-500/20 items-center justify-center hidden"
                        >
                            <Music size={32} className="text-green-500" />
                        </div>

                        {isAnimating && (
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <div className="flex gap-0.5 items-end h-3">
                                    <div className="w-0.5 bg-white rounded-full equalizer-bar" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-0.5 bg-white rounded-full equalizer-bar" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-0.5 bg-white rounded-full equalizer-bar" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Music size={12} />
                        My Playlist
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-1 truncate transition-all duration-300">
                        {currentTrack.name}
                    </h4>
                    <p className="text-sm text-secondary truncate">
                        {currentTrack.artist}
                    </p>
                    <p className="text-xs text-secondary/70 truncate mt-1">
                        {currentTrack.album}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 mt-4">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-secondary/50">
                        {currentIndex + 1} / {myPlaylist.length}
                    </span>
                    <button
                        onClick={() => setIsAnimating(!isAnimating)}
                        className="text-[10px] text-secondary/50 hover:text-green-500 transition-colors"
                    >
                        {isAnimating ? '⏸' : '▶️'}
                    </button>
                </div>
            </div>

            {/* Spotify branding */}
            <div className="absolute bottom-4 right-4 opacity-30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
            </div>
        </div>
    );
};

export default SpotifyNowPlaying;
