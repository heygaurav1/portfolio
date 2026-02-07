import React, { useState } from 'react';
import { Menu, MoreHorizontal, Moon, Sun } from 'lucide-react';
import AboutDrawer from './AboutDrawer';
import { personalInfo } from '../data';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onOpenResume, onViewBlog, activeView = 'home' }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { theme, setTheme, effectiveTheme } = useTheme();

    const handleNavigation = (item) => {
        const isBlogPage = activeView === 'blog';

        if (item === 'Projects') {
            const projectsElement = document.getElementById('projects');
            if (isBlogPage && onViewBlog) {
                onViewBlog();
                setTimeout(() => {
                    const element = document.getElementById('projects');
                    if (element) {
                        const offset = element.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                }, 400);
            } else if (projectsElement) {
                const offset = projectsElement.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        } else if (item === 'Blog') {
            const blogElement = document.getElementById('blog');
            if (isBlogPage && onViewBlog) {
                onViewBlog();
                setTimeout(() => {
                    const element = document.getElementById('blog');
                    if (element) {
                        const offset = element.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                }, 400);
            } else if (blogElement) {
                const offset = blogElement.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        } else if (item === 'Contact') {
            const contactCard = document.getElementById('contact-card');
            if (isBlogPage && onViewBlog) {
                onViewBlog();
                setTimeout(() => {
                    const card = document.getElementById('contact-card');
                    if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 400);
            } else if (contactCard) {
                contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        } else if (item === 'About') {
            setIsDrawerOpen(true);
        } else if (item === 'Home') {
            if (isBlogPage && onViewBlog) {
                onViewBlog();
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (typeof window !== 'undefined') {
                    window.history.pushState('', document.title, window.location.pathname + window.location.search);
                }
            }
        }
    };

    return (
        <>
            {/* Centered Floating Pill Navbar */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
                <div className="flex items-center p-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-2xl transition-all duration-500">
                    <nav className="flex items-center gap-1 group/nav">
                        {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((item) => {
                            const isActive = (activeView === item.toLowerCase() || (item === 'Home' && activeView === 'home'));
                            return (
                                <button
                                    key={item}
                                    onClick={() => handleNavigation(item)}
                                    className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-normal transition-all duration-500 cursor-pointer group/item z-10 ${isActive
                                        ? 'text-neutral-900 dark:text-orange-400 font-medium'
                                        : 'text-neutral-500 dark:text-neutral-400'
                                        }`}
                                >
                                    <span className={`relative z-20 transition-all duration-500 group-hover/item:text-neutral-900 dark:group-hover/item:text-orange-400 group-hover/item:scale-105 inline-block`}>
                                        {item}
                                    </span>
                                    <div className={`absolute inset-0 rounded-full z-0 transition-all duration-500 ${isActive
                                        ? 'bg-blue-400/10 dark:bg-orange-500/10 opacity-100 group-hover/nav:opacity-0 group-hover/item:opacity-100 backdrop-blur-md border border-blue-200/50 dark:border-orange-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(251,146,60,0.2)]'
                                        : 'bg-blue-400/5 dark:bg-amber-500/5 opacity-0 group-hover/item:opacity-100 group-hover/item:backdrop-blur-md group-hover/item:border group-hover/item:border-blue-100/30 dark:group-hover/item:border-orange-500/10 group-hover/item:shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:group-hover/item:shadow-[0_0_10px_rgba(251,146,60,0.1)]'
                                        }`}></div>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Divider */}
                    <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800 mx-2"></div>

                    {/* 3-Dot Menu Dropdown */}
                    <div className="relative group pr-1">
                        <button className="p-2.5 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-black hover:bg-neutral-100 dark:hover:bg-white transition-all duration-300">
                            <MoreHorizontal size={20} />
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-4 w-56 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                            <div className="flex flex-col gap-1">
                                {personalInfo.socials.slice(0, 3).map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                            <Icon size={18} />
                                            <span className="text-sm font-medium">{social.name}</span>
                                        </a>
                                    );
                                })}

                                {/* Resume Link */}
                                <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    <span className="text-sm font-medium">Resume</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Right Controls (Theme + Hamburger) */}
            <div className="fixed top-6 right-6 md:right-12 z-50 flex items-center gap-4">

                {/* Theme Toggle Dropdown */}
                <div className="relative group">
                    <button
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all shadow-sm cursor-pointer"
                    >
                        {theme === 'dark' ? <Moon size={20} /> : theme === 'light' ? <Sun size={20} /> : <div className="relative"><Sun size={20} className="opacity-50" /><Moon size={12} className="absolute -bottom-1 -right-1" /></div>}
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-4 w-40 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-[70]">
                        <div className="flex flex-col gap-1">
                            {[
                                { id: 'light', name: 'Light', icon: Sun, color: 'text-blue-600', bg: 'bg-blue-400/10', hover: 'hover:bg-blue-400/5', hoverColor: 'hover:text-blue-600' },
                                { id: 'dark', name: 'Dark', icon: Moon, color: 'text-orange-400', bg: 'bg-orange-500/10', hover: 'hover:bg-orange-500/5', hoverColor: 'hover:text-orange-400' },
                                { id: 'system', name: 'System', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>, color: 'text-neutral-900 dark:text-neutral-100', bg: 'bg-neutral-100 dark:bg-white/10', hover: 'hover:bg-neutral-50 dark:hover:bg-white/5', hoverColor: 'hover:text-neutral-900 dark:hover:text-neutral-100' }
                            ].map((option) => {
                                const Icon = option.icon;
                                const isActive = theme === option.id;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => setTheme(option.id)}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                            ? `${option.bg} ${option.color} shadow-sm`
                                            : `text-neutral-500 dark:text-neutral-400 ${option.hover} ${option.hoverColor}`}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={16} />
                                            <span className="text-sm font-medium">{option.name}</span>
                                        </div>
                                        {isActive && <div className={`w-1.5 h-1.5 rounded-full ${option.id === 'light' ? 'bg-blue-500' : option.id === 'dark' ? 'bg-orange-400' : 'bg-neutral-400'}`}></div>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm"
                >
                    <Menu size={24} />
                </button>
            </div>

            <AboutDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
};

export default Navbar;
