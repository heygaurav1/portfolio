import React from 'react';
import { blogPosts, recommendedTopics } from '../blogData';
import { ArrowLeft, Search, Bell, Edit, Bookmark, MoreHorizontal, MessageCircle, PlayCircle, Send, Clock, Github, BookOpen, Brain } from 'lucide-react';
import Navbar from './Navbar';
import Calendar from './Calendar';
import { supabase } from '../lib/supabaseClient';

const BlogPage = ({ onBack, onOpenResume }) => {
    const [activeCategory, setActiveCategory] = React.useState('For you');
    const [formData, setFormData] = React.useState({
        name: '',
        discord: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!formData.name || !formData.email) {
            alert('Please fill in at least your name and email!');
            return;
        }

        console.log('Blog Sidebar Form Submitted:', formData);
        alert(`Thanks ${formData.name}! Your message from the Blog section has been sent. (Mock Submission)`);

        setFormData({
            name: '',
            discord: '',
            email: ''
        });
    };

    const filteredPosts = activeCategory === 'For you'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    const isComingSoon = filteredPosts.length === 0;

    return (
        <div className="min-h-screen bg-background text-primary transition-colors duration-500 pt-24 pb-20">

            {/* Use Main Navbar */}
            <Navbar activeView="blog" onOpenResume={onOpenResume} onViewBlog={onBack} />

            {/* Back Button - Top Left */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </button>
            </div>

            {/* Header Section for consistency */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-display">Blog</h1>
                    <p className="text-secondary/80 max-w-2xl text-lg font-serif italic">
                        Sharing my thoughts on detailed coding tutorials, design patterns, and my journey in tech.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="https://medium.com/new-story"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-all text-sm font-medium group"
                    >
                        <Edit size={18} className="text-blue-400" />
                        <span>Write Post</span>
                    </a>
                    <button className="text-secondary/50 cursor-not-allowed flex items-center gap-2 text-sm font-medium">
                        View all posts <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">

                {/* Main Feed Column */}
                <div className="w-full lg:w-2/3 flex flex-col gap-12">

                    {/* Category Tabs - Robust Sticky */}
                    <div className="sticky top-[84px] z-30 bg-background/80 backdrop-blur-xl border-b border-border transition-all duration-300 -mx-6 md:-mx-12 px-6 md:px-12">
                        <div className="flex items-center gap-8 text-sm font-medium text-secondary pt-4 pb-4 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveCategory('For you')}
                                className={`${activeCategory === 'For you' ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'} pb-4 -mb-[18px] shrink-0 cursor-pointer transition-colors relative z-10`}
                            >
                                For you
                            </button>
                            {['Data All', 'System Design', 'Learning Resources', 'Design', 'AI/ML', 'Data Science', 'Web3'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`${activeCategory === cat ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'} hover:text-primary transition-colors shrink-0 cursor-pointer pb-4 -mb-[18px] relative z-10`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Articles List or Coming Soon */}
                    <div className="flex flex-col">
                        {isComingSoon ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center">
                                <p className="text-secondary max-w-sm">
                                    More insights for <strong>{activeCategory}</strong> will appear here.
                                </p>
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <a
                                    key={post.id}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-10 border-b border-border flex flex-col md:flex-row gap-8 group/card hover:bg-white/[0.02] transition-colors -mx-6 md:-mx-12 px-6 md:px-12"
                                >
                                    {/* Text Content */}
                                    <div className="flex-1 flex flex-col justify-center">

                                        {/* Author Header */}
                                        <div className="flex items-center gap-2 mb-3 text-xs md:text-sm">
                                            <img src={post.author.image} alt={post.author.name} className="w-6 h-6 rounded-full border border-border" />
                                            <span className="text-primary font-medium group-hover/card:underline">{post.author.name}</span>
                                            <span className="text-secondary">·</span>
                                            <span className="text-secondary">{post.date}</span>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 font-display leading-tight group-hover/card:text-blue-400 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-secondary font-serif text-base md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
                                            {post.subtitle}
                                        </p>

                                        {/* Footer Actions */}
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 rounded-full bg-surface text-xs font-medium text-secondary">
                                                    {post.tags[0]}
                                                </span>
                                                <span className="text-xs text-secondary">{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnail Image (Right Side) */}
                                    <div className="w-full md:w-48 h-32 md:h-32 shrink-0 rounded-lg overflow-hidden md:order-last order-first bg-surface shadow-md">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover/card:scale-105 group-hover/card:opacity-100 transition-all duration-500" />
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Sidebar (Staff Picks & Calendar) */}
                <div className="hidden lg:block w-1/3 border-l border-border pl-12 relative">
                    <div className="sticky top-32 flex flex-col gap-10">

                        {/* Calendar Component */}
                        <div className="animate-fade-in-up">
                            <Calendar />
                        </div>

                        {/* Let's Talk Sidebar Card */}
                        <div className="p-8 rounded-2xl bg-surface/50 dark:bg-white/5 backdrop-blur-xl border border-border dark:border-white/10 shadow-xl text-center">
                            {/* Lightbulb Icon */}
                            <div className="mb-6 flex justify-center">
                                <div className="relative">
                                    <svg
                                        className="w-12 h-12 text-yellow-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <div className="absolute inset-0 blur-lg bg-yellow-500/20 rounded-full"></div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-primary font-display">
                                Have Something
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                    Cool in Mind?
                                </span>
                            </h3>

                            <p className="text-secondary text-xs mb-6">
                                Let's build something great together.
                            </p>

                            <form onSubmit={async (e) => {
                                if (e) e.preventDefault();
                                if (!formData.name || !formData.email) {
                                    alert('Please fill in at least your name and email!');
                                    return;
                                }

                                const submitBtn = e.target.querySelector('button[type="submit"]');
                                const originalText = submitBtn.innerText;

                                try {
                                    submitBtn.disabled = true;
                                    submitBtn.innerText = 'Sending...';

                                    const { error } = await supabase
                                        .from('contacts')
                                        .insert([{
                                            name: formData.name,
                                            email: formData.email,
                                            discord: formData.discord,
                                            message: "Message from Blog Sidebar"
                                        }]);

                                    if (error) throw error;
                                    alert(`Thanks ${formData.name}! Your message has been sent to Supabase.`);
                                    setFormData({ name: '', discord: '', email: '' });
                                } catch (err) {
                                    console.error(err);
                                    alert('Error sending message. Please try again.');
                                } finally {
                                    submitBtn.disabled = false;
                                    submitBtn.innerText = originalText;
                                }
                            }} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary text-xs"
                                    required
                                />
                                <input
                                    type="text"
                                    name="discord"
                                    value={formData.discord}
                                    onChange={handleChange}
                                    placeholder="Discord"
                                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary text-xs"
                                />
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary text-xs"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Resources Section Added */}
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-white mb-6 font-display">Resources</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: "My Medium Articles", url: "https://medium.com/@heygaurav1", icon: BookOpen },
                                    { name: "Research Papers", url: "https://medium.com/@heygaurav1", icon: Brain },
                                    { name: "Project Repositories", url: "https://github.com/heygaurav1", icon: Github }
                                ].map((link, i) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-secondary/70 hover:text-blue-400 transition-colors group"
                                        >
                                            <Icon size={16} className="group-hover:scale-110 transition-transform" />
                                            <span className="text-sm font-medium">{link.name}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

// Helper Icon for sidebar
const MinusCircle = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
);

export default BlogPage;
