import React from 'react';
import { personalInfo } from '../data';
import { ArrowUpRight, Send, Heart } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [formData, setFormData] = React.useState({
        name: '',
        discord: '',
        email: '',
        message: ''
    });
    const [viewCount, setViewCount] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submissionStatus, setSubmissionStatus] = React.useState(null); // 'success' | 'error' | null

    React.useEffect(() => {
        // Increment and get views for the portfolio
        fetch('https://api.counterapi.dev/v1/gouravpaul_portfolio/visits/up')
            .then(res => res.json())
            .then(data => setViewCount(data.count))
            .catch(() => setViewCount(342)); // Fallback to a reasonable number if API fails
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in Name, Email, and Description!');
            return;
        }

        setIsSubmitting(true);
        setSubmissionStatus(null);

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        discord: formData.discord,
                        email: formData.email,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            setSubmissionStatus('success');
            setFormData({
                name: '',
                discord: '',
                email: '',
                message: ''
            });

            // Reset status after 5 seconds
            setTimeout(() => setSubmissionStatus(null), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
            const isPlaceholder = import.meta.env.VITE_SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE';
            if (isPlaceholder) {
                alert('Connection failed: Please replace the placeholder API Key in your .env file with your actual Supabase Anon Key.');
            } else {
                alert('Error sending message. Please check your Supabase "contacts" table and RLS policies.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const footerLinks = {
        navigation: [
            { name: 'Home', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Blog', href: '#blog' },
            { name: 'Skills', href: '#skills' },
        ],
        resources: [
            { name: 'Resume', href: '/resume.html', external: true },
            { name: 'GitHub', href: 'https://github.com/heygaurav1', external: true },
            { name: 'Medium', href: 'https://medium.com/@heygaurav1', external: true },
            { name: 'LeetCode', href: 'https://leetcode.com/heygaurav1', external: true },
            { name: 'Codeforces', href: 'https://codeforces.com/profile/heygaurav1', external: true },
        ],
        connect: [
            { name: 'LinkedIn', href: 'https://linkedin.com/in/gouravpaul', external: true },
            { name: 'Twitter', href: 'https://x.com/heygauravOne', external: true },
            { name: 'YouTube', href: 'https://youtube.com/@heygaurav1', external: true },
            { name: 'Email', href: `mailto:${personalInfo.email} `, external: true },
        ]
    };

    return (
        <footer className="relative bg-gradient-to-b from-background to-surface border-t border-border transition-colors duration-500">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">

                {/* Top Section - CTA Card */}
                <div id="contact-card" className="mb-20 scroll-mt-32">
                    <div className="max-w-2xl mx-auto p-12 md:p-16 rounded-3xl bg-surface dark:bg-white/5 backdrop-blur-xl border border-border dark:border-white/10 shadow-2xl text-center">
                        {/* Lightbulb Icon */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <svg
                                    className="w-16 h-16 md:w-20 md:h-20 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                {/* Glow effect */}
                                <div className="absolute inset-0 blur-xl bg-yellow-400/20 rounded-full"></div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-display">
                            Have Something
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Cool in Mind?
                            </span>
                        </h2>

                        <p className="text-secondary text-base md:text-lg mb-8 max-w-xl mx-auto">
                            This can be start of something great! Let's build together.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto bg-background/50 p-6 md:p-8 rounded-2xl border border-border">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary transition-all text-sm"
                                    required
                                />
                                <input
                                    type="text"
                                    name="discord"
                                    value={formData.discord}
                                    onChange={handleChange}
                                    placeholder="Discord Username"
                                    className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary transition-all text-sm"
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email Address"
                                className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary transition-all text-sm"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Description / How can I help?"
                                rows={4}
                                className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none text-primary transition-all text-sm resize-none"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-xl font-bold text-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 ${submissionStatus === 'success'
                                    ? 'bg-green-500 text-white'
                                    : submissionStatus === 'error'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-primary text-background'
                                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Send size={16} />
                                {isSubmitting ? 'Sending...' : submissionStatus === 'success' ? 'Sent!' : submissionStatus === 'error' ? 'Failed' : 'Send'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-t border-border pt-16">

                    {/* About Column */}
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-medium text-primary mb-4 font-display">{personalInfo.name}</h3>
                        <p className="text-secondary text-sm leading-relaxed mb-6">
                            Data Science student passionate about Software Engineering, AI/ML, and building impactful products.
                        </p>
                        <div className="flex gap-4">
                            {personalInfo.socials.slice(0, 4).map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-secondary hover:text-primary hover:bg-neutral-200 dark:hover:bg-white/10 transition-all shadow-sm"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Navigation</h4>
                        <ul className="space-y-3">
                            {footerLinks.navigation.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        target={link.external ? "_blank" : "_self"}
                                        rel={link.external ? "noopener noreferrer" : ""}
                                        className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        {link.name}
                                        {link.external && <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div>
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Connect</h4>
                        <ul className="space-y-3">
                            {footerLinks.connect.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        target={link.external ? "_blank" : "_self"}
                                        rel={link.external ? "noopener noreferrer" : ""}
                                        className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        {link.name}
                                        {link.external && <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-secondary text-sm">
                            © {currentYear} {personalInfo.name}.
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[10px] md:text-xs text-secondary font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            {viewCount ? `${viewCount} +` : '...'} Portfolio Views
                        </div>
                    </div>
                    <p className="text-secondary text-sm flex items-center gap-2">
                        Built with <Heart size={14} className="text-red-500 fill-red-500" /> using React
                    </p>
                </div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </footer>
    );
};

export default Footer;

