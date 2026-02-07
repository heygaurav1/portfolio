import React from 'react';
import { experience } from '../data';
import { Briefcase } from 'lucide-react';

const Experience = () => {
    if (!experience || experience.length === 0) return null;

    return (
        <section id="experience" className="py-20 max-w-6xl mx-auto px-6">
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 font-display tracking-tight">Professional Journey</h2>
                <p className="text-secondary text-lg max-w-2xl">Gaining hands-on experience in analytical marketing and data-driven content strategy.</p>
            </div>

            <div className="space-y-8">
                {experience.map((item, index) => (
                    <div key={index} className="glass-card p-8 rounded-3xl border border-border flex flex-col md:flex-row gap-6 md:items-center relative overflow-hidden group">
                        {/* Background subtle accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>

                        <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-500">
                            <Briefcase size={28} />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary font-display">{item.role}</h3>
                                    <p className="text-lg text-blue-400/90 font-medium tracking-wide">{item.company}</p>
                                </div>
                                <span className="px-4 py-1.5 rounded-full bg-primary/5 text-secondary text-sm font-semibold border border-primary/10 whitespace-nowrap self-start md:self-center">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-secondary/80 text-base leading-relaxed max-w-3xl">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
