import React from 'react';
import { blogPosts } from '../blogData';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const BlogSection = ({ onViewAll }) => {
    return (
        <section id="blog" className="py-20 max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-display tracking-tight">Blog</h2>
                    <p className="text-secondary/80 max-w-xl">
                        Sharing my thoughts on detailed coding tutorials, design patterns, and my journey in tech.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(0, 3).map((post) => (
                    <a
                        key={post.id}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col h-full bg-white/5 backdrop-blur-xl border border-border dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-500 shadow-lg hover:bg-white/10"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-black bg-white/90 backdrop-blur-md rounded-full">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                                <span>{post.date}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                            </div>

                            <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto">
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
