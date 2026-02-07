import React, { useState } from 'react';
import { projects, personalInfo } from '../data';
import { ArrowUpRight, Github, Lightbulb } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SplitContent = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') {
                    // Unique constraint violation
                    setStatus('success'); // Already subscribed
                } else {
                    throw error;
                }
            } else {
                setStatus('success');
                setEmail('');
            }
        } catch (err) {
            console.error('Subscription error:', err);
            setStatus('error');
        }
    };
    return (
        <section id="projects" className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Projects List (Takes up 2/3 space) */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12 font-display">Recent Projects</h2>
                    <div className="flex flex-col gap-8 md:gap-12">
                        {projects.map((project, index) => (
                            <div key={index} className="group">
                                <div className="flex items-baseline justify-between mb-2">
                                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{new Date().getFullYear()}</span>
                                    {/* <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Design</span> */}
                                </div>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                                    <h3 className="text-xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                </a>
                                <p className="text-neutral-400 leading-relaxed mb-4 max-w-xl text-sm md:text-base">
                                    {project.description}
                                </p>
                                <a href={project.link} className="inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-neutral-700 underline-offset-4 hover:decoration-white transition-all">
                                    View Project <ArrowUpRight size={14} />
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 md:mt-16">
                        <button className="px-8 py-3 rounded-full border border-neutral-800 text-sm font-medium text-white hover:bg-white hover:text-black transition-all">
                            VIEW ALL
                        </button>
                    </div>
                </div>

                {/* Right Column: Contact Card (Takes up 1/3 space) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 p-6 md:p-8 rounded-3xl bg-surface border border-neutral-800 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 text-white shadow-inner">
                            <Lightbulb size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">Have Something Cool in Mind?</h3>
                        <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                            This can be start of something great! Open for SDE Intern roles.
                        </p>
                        <a href={`mailto:${personalInfo.email}`} className="px-8 py-3 rounded-full border border-neutral-700 text-white hover:bg-white hover:text-black transition-all">
                            Let's Talk
                        </a>
                    </div>

                    <div className="mt-8 md:mt-12 p-6 md:p-8">
                        <h4 className="flex items-center gap-2 font-semibold text-white mb-4">
                            Subscribe to my newsletter
                        </h4>
                        <p className="text-neutral-500 text-xs mb-6">
                            Get important news and articles delivered directly to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                                required
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full font-semibold rounded-lg py-3 text-sm transition-all ${status === 'success'
                                    ? 'bg-green-500 text-white'
                                    : status === 'error'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white text-black hover:bg-neutral-200'
                                    }`}
                            >
                                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : status === 'error' ? 'Error. Try again' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SplitContent;
