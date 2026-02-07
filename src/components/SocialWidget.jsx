import React from 'react';
import { personalInfo } from '../data';

const SocialWidget = () => {
    return (
        <div className="hidden lg:flex fixed top-32 right-12 z-40 flex-col gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 w-48">
            {personalInfo.socials.map((social, index) => {
                const Icon = social.icon;
                return (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
                    >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{social.name}</span>
                    </a>
                );
            })}
        </div>
    );
};

export default SocialWidget;
