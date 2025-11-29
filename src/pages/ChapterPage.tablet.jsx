import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import TOC from '../components/TOC';
import { FaArrowLeft, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

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
            <div className="min-h-screen flex items-center justify-center bg-brand-bg px-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">Chapter not found</h2>
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
            className="min-h-screen bg-[var(--bg-color)] pb-24"
        >
            {/* Tablet Header */}
            <div className="bg-gradient-to-b from-pink-50 to-white border-b border-pink-100 pt-28 pb-12 px-8 mb-8">
                <div className="max-w-3xl mx-auto text-center">
                    <Link to="/chapters" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-primary mb-6 transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 font-medium hover:shadow-md">
                        <FaArrowLeft className="mr-2 text-xs" />
                        Back to Library
                    </Link>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-display leading-tight">
                        <span className="block text-brand-primary text-sm font-bold mb-3 uppercase tracking-widest">Chapter {chapter.id}</span>
                        {chapter.title}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                        {chapter.description}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8">
                <div className="flex flex-col gap-8">
                    {/* Main Content */}
                    <main className="flex-grow mx-auto w-full">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100">
                                {error}
                            </div>
                        ) : (
                            <article className="prose prose-lg prose-pink max-w-none leading-relaxed bg-white p-10 rounded-3xl shadow-sm border border-pink-50">
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </article>
                        )}

                        {/* Navigation Footer */}
                        <div className="mt-10 flex justify-between items-center">
                            {chapter.id > 1 ? (
                                <Link to={`/chapter/${chapter.id - 1}`} className="group flex flex-col items-start p-4 -ml-4 rounded-xl hover:bg-pink-50 transition-colors">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">Previous</span>
                                    <span className="text-slate-900 font-bold group-hover:text-brand-primary transition-colors flex items-center">
                                        <FaChevronLeft className="mr-2 text-xs" />
                                        Chapter {chapter.id - 1}
                                    </span>
                                </Link>
                            ) : <div></div>}

                            {chapter.id < 10 ? (
                                <Link to={`/chapter/${chapter.id + 1}`} className="group flex flex-col items-end p-4 -mr-4 rounded-xl hover:bg-pink-50 transition-colors">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">Next</span>
                                    <span className="text-slate-900 font-bold group-hover:text-brand-primary transition-colors flex items-center">
                                        Chapter {chapter.id + 1}
                                        <FaChevronRight className="ml-2 text-xs" />
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
