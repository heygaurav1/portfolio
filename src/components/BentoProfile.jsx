import React from 'react';
import { personalInfo, projects } from '../data';
import {
    Github,
    Linkedin,
    Mail,
    FileText,
    ArrowUpRight,
    Smartphone,
    Cpu,
    Database,
    Code2,
    Layers
} from 'lucide-react';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const BentoProfile = ({ onOpenResume }) => {
    const githubLink = personalInfo.socials.find(s => s.name === "GitHub")?.url;
    const linkedinLink = personalInfo.socials.find(s => s.name === "LinkedIn")?.url;
    const emailLink = personalInfo.socials.find(s => s.name === "Email")?.url;

    return (
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-[180px]">

                {/* Intro Card */}
                <div className="md:col-span-2 lg:col-span-4 row-span-2 glass-card p-8 rounded-[2.5rem] flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                        <span className="text-secondary text-sm font-medium mb-4 block">Data Scientist & Student</span>
                        <h1 className="text-5xl font-bold text-primary mb-6 font-display leading-tight">
                            {personalInfo.name}
                        </h1>
                        <p className="text-secondary text-sm leading-relaxed max-w-[280px] font-serif italic text-pretty">
                            A Data Science & AI/ML student at Techno India University. I build premium iOS experiences and research intelligent systems.
                        </p>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700"></div>
                </div>

                {/* Social Grid */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-4 lg:gap-6 row-span-2">
                    <a href={githubLink} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center justify-center rounded-[2rem] hover:bg-white/10 transition-all group">
                        <Github size={32} className="text-secondary group-hover:text-primary transition-colors" />
                    </a>
                    <a href={emailLink} className="glass-card flex items-center justify-center rounded-[2rem] hover:bg-white/10 transition-all group">
                        <Mail size={32} className="text-secondary group-hover:text-primary transition-colors" />
                    </a>
                    <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center justify-center rounded-[2rem] hover:bg-white/10 transition-all group">
                        <Linkedin size={32} className="text-secondary group-hover:text-primary transition-colors" />
                    </a>
                    <button onClick={onOpenResume} className="glass-card flex items-center justify-center rounded-[2rem] hover:bg-white/10 transition-all group cursor-pointer">
                        <FileText size={32} className="text-secondary group-hover:text-primary transition-colors" />
                    </button>
                </div>

                {/* Big Title Card */}
                <div className="md:col-span-2 lg:col-span-5 glass-card p-8 rounded-[2.5rem] flex items-center relative overflow-hidden bg-gradient-to-br from-[#121212] to-black">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.1]">
                        Building Skills <br />
                        <span className="text-orange-500">For Future.</span>
                    </h2>
                    <div className="absolute bottom-0 right-0 opacity-10 -mr-8 -mb-8">
                        <Layers size={200} />
                    </div>
                </div>

                {/* Skills Card */}
                <div className="lg:col-span-3 glass-card p-6 rounded-[2.5rem] flex flex-col justify-between group">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400"><Cpu size={20} /></div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange-400"><Code2 size={20} /></div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-green-400"><Database size={20} /></div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400"><Smartphone size={20} /></div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-500"><Github size={20} /></div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-red-500"><Layers size={20} /></div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-xs font-bold text-secondary uppercase tracking-widest">Most Use Skills</div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                </div>

                {/* Projects Showcase */}
                <div className="md:col-span-2 lg:col-span-6 glass-card p-6 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
                    <div className="relative z-10 flex gap-4 h-full items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                        {/* Mock Preview Items */}
                        <div className="w-40 h-24 bg-neutral-800 rounded-xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                            <div className="text-[10px] text-neutral-500">PROJECT PREVIEW</div>
                        </div>
                        <div className="w-40 h-24 bg-neutral-800 rounded-xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden -mt-8">
                            <div className="text-[10px] text-neutral-500">PROJECT PREVIEW</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 relative z-10">
                        <div>
                            <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Showcase</div>
                            <h4 className="text-xl font-bold text-primary">Featured Projects</h4>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Spotify Now Playing Widget */}
                <SpotifyNowPlaying />

            </div>
        </section>
    );
};

export default BentoProfile;
