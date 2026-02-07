import React from 'react';
import { Terminal, Code2, Brain, Database, Smartphone } from 'lucide-react';
import InteractiveCodeBackground from './InteractiveCodeBackground';

const Skills = () => {
    const mainSkills = [
        { name: "iOS Development", level: 85, color: "bg-blue-500", icon: Smartphone },
        { name: "ReactJS / Frontend", level: 90, color: "bg-cyan-400", icon: Code2 },
        { name: "AI/ML Engineering", level: 75, color: "bg-purple-500", icon: Brain },
        { name: "Data Science", level: 80, color: "bg-green-500", icon: Database }
    ];

    return (
        <section id="skills" className="relative py-24 bg-black overflow-hidden selection:bg-blue-500/30">
            {/* Interactive Background Layer */}
            <InteractiveCodeBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Text Content */}
                <div className="space-y-8">
                    <div className="font-mono text-xs text-blue-400 opacity-80 flex items-center gap-2">
                        <span className="animate-pulse">●</span> <span>System.Ready;</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white font-display tracking-tight leading-[1.05]">
                        Tech That <br />
                        <span className="text-secondary/50 font-serif italic">I Know.</span>
                    </h2>
                    <p className="text-secondary/70 text-lg md:text-xl font-serif leading-relaxed max-w-xl italic">
                        "I specialize in creating successful responsive websites that are fast, user-friendly, and built with industry best practices."
                    </p>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-md">
                        <div className="flex items-center gap-3 text-neutral-400 mb-2 font-mono text-[10px] uppercase tracking-widest">
                            <Terminal size={14} />
                            <span>Current Focus</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2 font-display">Frontend Researcher</h4>
                        <p className="text-neutral-500 text-xs leading-relaxed">
                            Deepening my expertise in enterprise architectures, web scalability, and system design patterns.
                        </p>
                    </div>
                </div>

                {/* Right Side: Skill Bars (Hacker Style) */}
                <div className="grid grid-cols-1 gap-10">
                    {mainSkills.map((skill, i) => (
                        <div key={i} className="group flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                                        <skill.icon size={18} />
                                    </div>
                                    <span className="text-lg font-bold text-white/90 font-display tracking-wide">{skill.name}</span>
                                </div>
                                <span className="font-mono text-xs text-neutral-500">
                                    {/* Mocking the binary look from screenshot */}
                                    {Math.random() > 0.5 ? '0101' : '1010'} // {skill.level}%
                                </span>
                            </div>
                            {/* The Progress Bar */}
                            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div
                                    className={`absolute top-0 left-0 h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: `${skill.level}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-white/40"></div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Coming Soon / Full Stack Card */}
                    <div className="mt-4 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Code2 size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-yellow-500/50 mb-3 font-mono text-[10px] tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                <span>Upcoming Architecture</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-display">Full-Stack Exploration</h3>
                            <p className="text-neutral-500 font-mono text-sm leading-relaxed italic">
                                <span className="text-blue-400">// Coming Soon: </span>
                                Integrating Spring Boot, Docker, and enterprise cloud patterns into my workflow.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
