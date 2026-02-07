import React from 'react';
import { personalInfo } from '../data';
import { ArrowDown, Github, FileText } from 'lucide-react';

const Hero = ({ onOpenResume }) => {
    const [displayName, setDisplayName] = React.useState('');
    const fullName = personalInfo.name;

    React.useEffect(() => {
        if (displayName.length < fullName.length) {
            const timer = setTimeout(() => {
                setDisplayName(fullName.substring(0, displayName.length + 1));
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [displayName, fullName]);

    const githubLink = personalInfo.socials.find(s => s.name === "GitHub")?.url || "https://github.com/heygaurav1";
    const pfpUrl = "https://github.com/heygaurav1.png";

    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center pt-28">

            {/* Removed Profile Picture as requested */}

            {/* Big Name Typography with Typewriter Effect - MEDIUM STYLE */}
            <h1 className="text-[10vw] leading-none font-display font-medium text-primary tracking-tight mb-6 select-none flex items-center justify-center flex-wrap">
                <span>{displayName}</span>
                <span className="cursor-blink h-[0.8em] ml-2 bg-primary w-1"></span>
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-2xl font-medium tracking-wide mb-12 animate-fade-in-up">
                {personalInfo.title} <br />
                <span className="opacity-70 text-base">Decoding complex data to build intelligent AI solutions.</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-full font-bold hover:scale-105 transition-all shadow-xl dark:shadow-white/5 active:scale-95"
                >
                    <Github size={20} />
                    View GitHub
                </a>
                <button
                    onClick={onOpenResume}
                    className="flex items-center gap-2 px-8 py-4 bg-surface border border-border text-primary rounded-full font-bold hover:scale-105 transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                    <FileText size={20} />
                    View Resume
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-secondary">
                <ArrowDown size={24} />
            </div>

        </section>
    );
};

export default Hero;
