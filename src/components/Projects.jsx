import React from 'react';
import { projects } from '../data';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
    return (
        <section id="projects" className="py-32 max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                <div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold text-primary tracking-tight">Featured Projects</h2>
                </div>
            </div>

            <div className="flex flex-col gap-12">
                {projects.map((project, index) => (
                    <div key={index} className="group relative flex flex-col md:flex-row items-center bg-[#F3F3F3] dark:bg-[#121212] rounded-[2.5rem] overflow-hidden transition-transform duration-500 hover:scale-[1.01] hover:shadow-xl dark:border dark:border-white/10">

                        {/* Content (Left) */}
                        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-start text-left">
                            <div className="mb-6 p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm">
                                {/* Icon Placeholder or Logo */}
                                <span className="text-2xl font-bold font-display text-black dark:text-white">{project.title.charAt(0)}</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 font-display leading-tight">
                                {project.title}
                            </h3>

                            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/btn px-8 py-3.5 rounded-full bg-[#1c1c1c] text-white dark:bg-white dark:text-black font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer">
                                View project <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </a>
                        </div>

                        {/* Image / Mockup Area (Right) */}
                        <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-full bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                            {/* Mockup Container */}
                            <div className="absolute top-12 left-12 right-0 bottom-0 bg-white dark:bg-[#050505] rounded-tl-2xl shadow-2xl border-l-[12px] border-t-[12px] border-black dark:border-neutral-700 overflow-hidden transition-transform duration-700 group-hover:scale-105 group-hover:-translate-x-2 group-hover:-translate-y-2">
                                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Project Preview" />
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
