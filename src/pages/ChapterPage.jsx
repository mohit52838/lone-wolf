import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import TOC from '../components/TOC';

const ChapterPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chapter = chapters.find(c => c.id === parseInt(id));

    useEffect(() => {
        const loadContent = async () => {
            if (!chapter) {
                setError('Chapter not found');
                setLoading(false);
                return;
            }

            try {
                const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' });
                const path = `../content/${chapter.file}`;

                if (modules[path]) {
                    const text = await modules[path]();
                    setContent(marked(text));
                } else {
                    const response = await fetch(`/src/content/${chapter.file}`);
                    if (!response.ok) throw new Error('Failed to load chapter content');
                    const text = await response.text();
                    setContent(marked(text));
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [id, chapter]);

    if (!chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-bg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Chapter not found</h2>
                    <Link to="/chapters" className="text-brand-primary hover:underline mt-4 block font-medium">
                        Back to Chapters
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-brand-bg pb-24"
        >
            {/* Header */}
            <div className="bg-gradient-to-b from-pink-50 to-white border-b border-pink-100 py-20 px-6 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <Link to="/chapters" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-primary mb-8 transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 font-medium hover:shadow-md">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Library
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-display leading-tight">
                        <span className="block text-brand-primary text-sm font-bold mb-4 uppercase tracking-widest">Chapter {chapter.id}</span>
                        {chapter.title}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        {chapter.description}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar (TOC) */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <TOC content={content} />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow max-w-3xl mx-auto lg:mx-0">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100">
                                {error}
                            </div>
                        ) : (
                            <article className="prose lg:prose-lg prose-pink max-w-none leading-relaxed bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-pink-50">
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </article>
                        )}

                        {/* Navigation Footer */}
                        <div className="mt-12 flex justify-between items-center">
                            {chapter.id > 1 ? (
                                <Link to={`/chapter/${chapter.id - 1}`} className="group flex flex-col items-start p-4 -ml-4 rounded-xl hover:bg-pink-50 transition-colors">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">Previous</span>
                                    <span className="text-slate-900 font-bold group-hover:text-brand-primary transition-colors flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Chapter {chapter.id - 1}
                                    </span>
                                </Link>
                            ) : <div></div>}

                            {chapter.id < 10 ? (
                                <Link to={`/chapter/${chapter.id + 1}`} className="group flex flex-col items-end p-4 -mr-4 rounded-xl hover:bg-pink-50 transition-colors">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">Next</span>
                                    <span className="text-slate-900 font-bold group-hover:text-brand-primary transition-colors flex items-center">
                                        Chapter {chapter.id + 1}
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </Link>
                            ) : <div></div>}
                        </div>
                    </main>
                </div>
            </div>
        </motion.div>
    );
};

export default ChapterPage;
